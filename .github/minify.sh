#!/usr/bin/env bash

cat .github/base.min.js > app.min.js && \
 cat warframe.js | sed '/use strict/d' | sed '/const fetch/d' | sed '/module.exports/d' > warframe.min.js && \
  npm_config_yes=true npx -p uglify-js uglifyjs warframe.min.js >> app.min.js && \
  rm warframe.min.js
