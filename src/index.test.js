import { getEnvironment } from "."

const snapshotOpts = {}

test("Doesn't support manually defined envs", () => {
  process.env.APP_DATA = "yellow"
  const { raw, stringified, webpack } = getEnvironment()
  expect(raw).toMatchSnapshot(snapshotOpts)
  expect(stringified).toMatchSnapshot(snapshotOpts)
  expect(webpack).toBeDefined()
  delete process.env.APP_DATA
})
