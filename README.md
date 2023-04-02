## Build Info Middleware

Express middleware helper to output .build-info.json contents via a request handler

This is useful in CI environments if you're building every commit to see what build has been deployed to an environment

## Install:

```shell
$ npm i @pixeldrew/build-info
```

## Usage:

Use [@pixeldrew/output-build-info](https://www.npmjs.com/package/@pixeldrew/output-build-info) to create .build-info.json in root of package

```shell
$ npm i -D @pixeldrew/output-build-info
$ npx @pixeldrew/output-build-info
Wrote build-info to /app/.build-info.json
```

```javascript
import express from "express";
import { addBuildInfo, showBuildInfo } from "@pixeldrew/build-info";

// or const { addBuildInfo, showBuildInfo} = require('@pixeldrew/build-info/middleware.cjs');

const app = new express();

app.use(addBuildInfo());
app.get("/.build-info", showBuildInfo);

app.get("/build", (req, res) => {
  const buildInfo = req.app.get("build-info");

  res.send(`${buildInfo.version} ${buildInfo.name} ${buildInfo.sha}`);
});

app.listen(3000, () => {
  console.log(`I'm http on port 3000`);
});
```
