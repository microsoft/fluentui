### Reason for `rxjs` dependency

This package does not explicitly require `rxjs`, but it must be listed under `devDependencies` due to an indirect dependency on `any-observable`:

    @uifabric/hooks
    `-- lint-staged@7.3.0
      `-- listr@0.14.3
        `-- @samverschueren/stream-to-observable@0.3.0
          `-- any-observable@0.3.0

`any-observable` attempts to require various observable libraries, but does not actually declare a dependency on any of them. `@samverschueren/stream-to-observable` declares a dependency on `rxjs`, which `any-observable` could find in a flat `node_modules` layout. However, that doesn't work in pnpm's nested layout. The workaround is to declare `rxjs` as a direct dependency of this package.
