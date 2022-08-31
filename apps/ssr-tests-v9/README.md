# @fluentui/ssr-tests-v9

**Tests for Server-side rendering (SSR) in [Fluent UI React v9](https://react.fluentui.dev)**.

## Usage

### `build`

```shell
# yarn build
```

This step produces assets that will be used during `test` step, this includes:

- CommonJS output user for server rendering
- ES Modules output used for serving in a browser
- `index.html` with generated markup (simulates server's behavior)

Assets are stored in `dist` folder and generated based on existing stories for v9 components.

```mermaid
flowchart TB
    subgraph Build
    b1(Get all existing stories and generate an application)

      subgraph Build an application
        direction BT
        b21(Build CommonJS output)
        b22(Build ESM output)
      end

    b3(Prepare assets)

    b1-->b21
    b1-->b22
    b21-->b3
    b22-->b3
    end
```

### `test`

Uses assets from the `build` step and runs them in a real browser to ensure that there are no errors in console related to SSR.

```shell
# yarn test
```

```mermaid
flowchart TB
    subgraph Test
      t1(Open a browser)
      t2(Open a page and run JS)
      t3(Ensure that console is empty)
      t1-->t2
      t2-->t3
    end
```

#### Debugging

All assets are available in `./dist` folder that is available once `build` have been run. You can open `./dist/index.html` in any browser and debug relevant issues.
