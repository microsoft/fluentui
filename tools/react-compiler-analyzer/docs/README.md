# Documentation

The [package README](../README.md) contains the complete command, option, configuration, and JSON
reference. These guides explain how to interpret results and make migration decisions.

| Guide                                       | Read it when                                                                             |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Migration workflow](migration-workflow.md) | Planning gradual adoption, annotating candidates, or reviewing existing opt-outs.        |
| [Runtime-risk detection](runtime-risks.md)  | Configuring store patterns, ESM wrapper resolution, and investigating missing findings.  |
| [How it works](how-it-works.md)             | Understanding Oxc probes, mapped acceptance, memo-slot evidence, and report limitations. |
| [Version migration](../MIGRATION.md)        | Upgrading to the Oxc-backed release and schema v4.                                       |

## Known upstream issues

These reports include minimal reproductions and the versions initially used to identify them.
Where the live harness has rechecked a report against Babel, native SWC, and Oxc, the report
records those bounded results separately; they do not establish general backend parity.

| Report                                                                                        | Initially verified version          |
| --------------------------------------------------------------------------------------------- | ----------------------------------- |
| [Outlined closure with an unbound parameter](upstream-react-compiler-outlined-closure.md)     | `babel-plugin-react-compiler@1.0.0` |
| [Webpack loader parser-plugin composition](upstream-react-compiler-webpack-parser-plugins.md) | `react-compiler-webpack@1.0.0`      |
