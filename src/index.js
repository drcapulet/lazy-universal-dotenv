import fs from "fs"
import path from "path"
import appRoot from "app-root-dir"
import dotenv from "dotenv"
import expand from "dotenv-expand"

const dotEnvBase = path.join(appRoot.get(), ".env")

export function getEnvironment({ nodeEnv, buildTarget } = {}) {
  let raw = {}
  const stringified = {}
  const webpack = { "process.env": stringified }

  // Cache Node environment at load time. We have to do it to make
  // sure that the serialization, which might happen later, is in sync
  // with the parsing of the conditional NODE_ENV files now.
  const NODE_ENV = typeof nodeEnv === "undefined" ? process.env.NODE_ENV : nodeEnv

  // Either "client" or "server"
  const BUILD_TARGET = typeof nodeEnv === "undefined" ? process.env.BUILD_TARGET : buildTarget

  // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  const dotenvFiles = [
    BUILD_TARGET && NODE_ENV && `${dotEnvBase}.${BUILD_TARGET}.${NODE_ENV}.local`,
    BUILD_TARGET && NODE_ENV && `${dotEnvBase}.${BUILD_TARGET}.${NODE_ENV}`,
    BUILD_TARGET && NODE_ENV !== "test" && `${dotEnvBase}.${BUILD_TARGET}.local`,
    BUILD_TARGET && `${dotEnvBase}.${BUILD_TARGET}`,
    NODE_ENV && `${dotEnvBase}.${NODE_ENV}.local`,
    NODE_ENV && `${dotEnvBase}.${NODE_ENV}`,
    NODE_ENV !== "test" && `${dotEnvBase}.local`,
    dotEnvBase
  ].filter(Boolean)

  // Load environment variables from .env* files. Suppress warnings using silent
  // if this file is missing. dotenv will never modify any environment variables
  // that have already been set. Variable expansion is supported in .env files.
  // https://github.com/motdotla/dotenv
  // https://github.com/motdotla/dotenv-expand
  dotenvFiles.forEach((dotenvFile) => {
    if (fs.existsSync(dotenvFile)) {
      const config = dotenv.config({
        path: dotenvFile
      })

      raw = Object.assign({}, raw, expand(config).parsed)
    }
  })

  Object.keys(raw).forEach((key) => {
    stringified[key] = JSON.stringify(raw[key])
  })

  return { raw, stringified, webpack }
}
