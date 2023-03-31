import { readFile } from "fs/promises";
import { dirname, sep } from "path";
import readPackageUp from "read-pkg-up";

const DEFAULT_FILENAME = ".build-info.json";

/**
 * Middleware that reads the package.json from the application root then adds name, version and .build-info.json content to express app
 * @param filename {string} can override default filename
 * @returns {(function(*, *, *): void)|*} middleware that adds version info to app object
 */
export function addBuildInfo({ filename = DEFAULT_FILENAME } = {}) {
  let name, version, info;
  readPackageUp().then(
    ({ packageJson: { version: pkgVersion, name: pkgName }, path }) => {
      name = pkgName;
      version = pkgVersion;
      readFile(`${dirname(path)}${sep}${filename}`, "utf8")
        .then((json) => {
          info = JSON.parse(json);
        })
        .catch((e) => {
          info = {
            error: `can't read build-info file: ${dirname(
              path
            )}${sep}${filename}`,
          };
        });
    }
  );

  return ({ app }, res, next) => {
    app.get("build-info") ||
      app.set("build-info", {
        name,
        version,
        ...info,
      });
    next();
  };
}

/**
 * Middleware helper that outputs build-info
 * @param req
 * @param res
 */
export function showBuildInfo(req, res) {
  res.json(req.app.get("build-info"));
}
