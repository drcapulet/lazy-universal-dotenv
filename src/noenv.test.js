import { getEnvironment } from "."

const snapshotOpts = {}

/* eslint-disable import/no-commonjs */
// We can't use ESM when relying on the fact the the env from the top is correctly respected.
const api = require(".")

test("Defaults to development for NODE_ENV", () => {
  const { raw, stringified, webpack } = api.getEnvironment({ nodeEnv: null })
  expect(raw).toMatchSnapshot(snapshotOpts)
  expect(stringified).toMatchSnapshot(snapshotOpts)
  expect(webpack).toBeDefined()
})
