## Next.js@>=13 appDir router

For basic instructions on getting Next.js set up, see [Getting Started](https://nextjs.org/docs/getting-started).

1.  Get a basic next.js setup running, rendering a page from the `app` folder, as guided by the tutorial.
2.  Add the Fluent UI dependencies: `@fluentui/react-components`.
3.  Add the SWC plugin to add the client directive for our library: `fluentui-next-appdir-directive`. See [the repo](https://github.com/sopranopillow/fluentui-nextjs-appdir-plugin) for more information

### Setting up Fluent UI

1.  Create a `providers.tsx` file under your `app` folder with the following content:

2.  Modify the `layout.tsx` file under your `app` folder to add our providers:

3.  Add `fluentui-next-appdir-directive` plugin with the paths for `@griffel` and `@fluentui`:

4.  Finally add your code to the `page.tsx` file in your `app` folder:
