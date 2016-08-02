#!/usr/bin/env node

'use strict'

// Needed so we can require src/module-cache.coffee during generateModuleCache
require('coffee-script/register')

const argv = require('yargs').argv
const cleanOutputDirectory = require('./lib/clean-output-directory')
const codeSign = require('./lib/code-sign')
const copyAssets = require('./lib/copy-assets')
const dumpSymbols = require('./lib/dump-symbols')
const generateMetadata = require('./lib/generate-metadata')
const generateModuleCache = require('./lib/generate-module-cache')
const packageApplication = require('./lib/package-application')
const prebuildLessCache = require('./lib/prebuild-less-cache')
const transpileBabelPaths = require('./lib/transpile-babel-paths')
const transpileCoffeeScriptPaths = require('./lib/transpile-coffee-script-paths')
const transpileCsonPaths = require('./lib/transpile-cson-paths')
const transpilePegJsPaths = require('./lib/transpile-peg-js-paths')

cleanOutputDirectory()
copyAssets()
transpileBabelPaths()
transpileCoffeeScriptPaths()
transpileCsonPaths()
transpilePegJsPaths()
generateModuleCache()
prebuildLessCache()
generateMetadata()
dumpSymbols()
  .then(packageApplication)
  .then(packagedAppPath => {
    if (argv.codeSign) {
      codeSign(packagedAppPath)
    } else {
      console.log('Skipping code-signing. Specify --code-sign option to perform code-signing...')
    }
  })
