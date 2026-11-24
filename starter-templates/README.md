# FluentUI v9 Starter Templates

Collection of starter templates for FluentUI v9 with popular frameworks and build tools.

## Available Templates

- [React Components + Vite](src/react-components-vite/README.md) - Modern starter template using Vite and FluentUI React Components

## Project Structure

```
starter-templates/
├── project.json
├── package.json
├── README.md
└── src/
    └── react-components-vite/
        ├── README.md
        └── ...
```

## Contributing

### Integration coverage

Run the Vite starter against this checkout's built package outputs:

```bash
yarn nx run stater-templates:test-integration
```

The Nx project is currently named `stater-templates`. Its explicit dependencies
build `react-components` and its dependency graph before testing. The existing
affected CI `test-integration` invocation selects this check when the starter,
the shared project-test helpers, or those Fluent packages change.

The runner in `scripts/projects-test/src/vite.ts` copies the actual starter to an
OS temporary directory. Shared repository helpers discover the `react-components`
runtime dependencies and resolve them to local tarballs without adding starter
dependencies; icons and other external packages remain registry dependencies.
It checks declared imports, installed package outputs and tarball isolation, then
runs the unchanged `build` script (`tsc -b && vite build`) and verifies production assets.
The repository-pinned Yarn uses an isolated cache and node_modules. Temporary files
are removed on success and failure. Results are uncached because external dependency
ranges are resolved on each run.

Runner regression tests, type checking and lint use the existing shared tooling:

```bash
yarn nx run-many -p scripts-projects-test -t test type-check lint
```

This is a TypeScript and production-bundler check, not Vitest/jsdom or browser
coverage. When adding another in-repository starter dependency, keep the Nx
`implicitDependencies` and the runner's package selection in sync so its outputs
are built and installed locally rather than fetched from the registry.

We welcome contributions! You can help by:

- Improving existing templates
- Adding new starter templates following the guidelines below

### Adding New Templates

1. Create a new directory under `src/`
2. Follow the naming convention: `react-components-{framework}`
3. Include a comprehensive README.md with:
   - Setup instructions
   - Usage examples
   - Configuration details
   - Development guidelines
4. Test the template thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
