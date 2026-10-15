# Documentation

The [package README](../README.md) contains the complete command, option, configuration, and JSON
reference. These guides explain how to interpret results and make migration decisions.

| Guide                                       | Read it when                                                                           |
| ------------------------------------------- | -------------------------------------------------------------------------------------- |
| [Migration workflow](migration-workflow.md) | Planning gradual adoption, annotating candidates, or reviewing existing opt-outs.      |
| [Runtime-risk detection](runtime-risks.md)  | Configuring store patterns, following helper calls, or investigating missing findings. |
| [How it works](how-it-works.md)             | Understanding compiler probes, event reduction, memo counters, and report limitations. |
| [Version migration](../MIGRATION.md)        | Upgrading from published experimental builds to the prepared `0.0.1` release.          |

## Known upstream issues

These reports include minimal reproductions and the exact toolchain versions tested. They describe
upstream behavior, not an exhaustive list of compiler risks.

| Report                                                                                        | Verified version                    |
| --------------------------------------------------------------------------------------------- | ----------------------------------- |
| [Outlined closure with an unbound parameter](upstream-react-compiler-outlined-closure.md)     | `babel-plugin-react-compiler@1.0.0` |
| [Webpack loader parser-plugin composition](upstream-react-compiler-webpack-parser-plugins.md) | `react-compiler-webpack@1.0.0`      |
