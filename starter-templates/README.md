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

The check copies the actual Vite starter to an OS temporary directory, packs its
declared in-repository dependency closure, and adds local tarball resolutions
without adding dependencies to the starter manifest. A source-import check rejects
undeclared dependencies even if they could be hoisted from a transitive package.
React icons and other external dependencies remain registry dependencies.
It uses the repository-pinned
Yarn with an isolated cache and node_modules, verifies installed package outputs
and tarball resolution, then runs the starter's `build` script (`tsc -b && vite build`)
and checks its production assets. Temporary files are removed on success and failure.
Results are not cached because external dependency ranges are resolved on each run.

Runner regression tests and type checking:

```bash
yarn nx run stater-templates:test
yarn nx run stater-templates:type-check
```

This is a TypeScript and production-bundler check, not Vitest/jsdom or browser
coverage. When adding another in-repository starter dependency, keep the Nx
`implicitDependencies` in sync so its build and affected selection are included.

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
