import { getEnvironment } from "."

const snapshotOpts = {}

test("Supports expand of variable from .env", () => {
  const { raw, stringified, webpack } = getEnvironment({ nodeEnv: 'expansion1' })
  expect(raw).toMatchSnapshot(snapshotOpts)
  expect(stringified).toMatchSnapshot(snapshotOpts)
  expect(webpack).toBeDefined()
})

test("Supports expand of variable from environment", () => {
  process.env.APP_DATA = "yellow"
  const { raw, stringified, webpack } = getEnvironment({ nodeEnv: 'expansion2' })
  expect(raw).toMatchSnapshot(snapshotOpts)
  expect(stringified).toMatchSnapshot(snapshotOpts)
  expect(webpack).toBeDefined()
  delete process.env.APP_DATA
})
