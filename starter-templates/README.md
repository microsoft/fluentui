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

Run the Vite starter's TypeScript and production build against this checkout's
built Fluent UI packages in an isolated temporary app:

```bash
yarn nx run stater-templates:test-integration
```

Nx builds the required packages first; affected CI also runs this check.
It does not cover Vitest/jsdom or browser behavior.

Validate the runner:

```bash
yarn nx run-many -p scripts-projects-test -t test type-check lint
```

When adding an in-repository starter dependency, update both the
`implicitDependencies` in `project.json` and the package selection in
`scripts/projects-test/src/vite.ts`.

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
