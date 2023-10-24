
// @eslint-disable
import antfu from '@antfu/eslint-config'

export default antfu(
  {"typescript":true},
  ...[{"rules":{"ts/consistent-type-definitions":["error","type"]}}],
)
  