Work-in-progress utilities for comparing component props.

### component-props.ts

Generates a file `components.json` containing props for all converged components. (Includes any packages at version 9, not just those exported from react-components.)

From repo root:

```
yarn tsnode ./scripts/component-props/component-props.ts
```

This uses `scripts/gulp/plugins/util/docgen.ts`, which is our fork of `react-docgen-typescript` (and this branch has some additional modifications).

### list-component-types.ts

Prints a list of all converged component typing files to the console. (Includes any packages at version 9, not just those exported from react-components.)

From repo root:

```
yarn tsnode ./scripts/component-props/list-component-types.ts
```

### wip/propgen.ts

Definitely not useful yet. It's a copy of `docgen.ts` and the goal was to take a list of component types files and pull out all the interfaces/types.
