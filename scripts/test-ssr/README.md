## Test SSR utility

## Usage

```shell
test-ssr "./stories/**/*.stories.tsx"

# Exclude specific patterns
test-ssr "./stories/**/*.stories.tsx" --exclude "**/react-portal/**" --exclude "**/Virtualization.stories.tsx"

# Multiple exclude patterns can be specified
test-ssr "./stories/**/*.stories.tsx" --exclude "**/react-portal/**" "**/react-positioning/stories/src/UseSafeZoneArea/**"
```

### Options

- `stories` (required): A glob pattern that contains story files to test
- `--exclude`: Glob patterns to exclude from testing. Can be specified multiple times or as an array. Stories matching these patterns will be skipped during SSR testing.

The utility produces assets for testing, this includes:

- CommonJS output user for server rendering
- ES Modules output used for serving in a browser
- `index.html` with generated markup (simulates server's behavior)

Assets are stored in `node_modules/.cache/ssr-tests` folder and generated based on stories passed. Assets are served in a real browser to ensure that there are no errors in console related to SSR.

```mermaid
flowchart TB
    b1(Take stories and generate an application)

    subgraph Build an application
        b21(Build CommonJS output)
        b22(Build ESM output)
    end

    subgraph Test an application

      t1(Open a browser)
      t2(Open a page and run JS)
      t3(Ensure that console is empty)
      t1-->t2
      t2-->t3
    end

    b1-->b21
    b1-->b22
    b21-->t1
    b22-->t1
```

#### Debugging

All assets are available in `node_modules/.cache/ssr-tests` folder. You can open `./node_modules/.cache/ssr-tests/index.html` in any browser and debug relevant issues.
