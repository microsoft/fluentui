# NX tooling dev/style guide

## Generators

- generators live in `tools/generators` folder

### Scaffolding

```sh
<generator-name>/
|- files/
    |- some-file.ts.__tmpl__
    |- config.json.__tmpl__
|- lib/
    |- utils.ts
    |- utils.spec.ts
    |- add-foo.ts
    |- add-foo.spec.ts
|- index.ts
|- index.spec.ts
|- schema.ts
|- schema.json
|- README.md
```

**`files/` (optional)**

- static or dynamic templates used to generated files should live here.
- every file ends with `__tmpl__` suffix.
  - eg `my-file.ts__tmpl__`
  - `__tmpl__` will be removed during generation

**`lib/` (optional)**

- if your generator becomes too big/complicated this is the place where you should split your logic into smaller modules.
- every module should have unit test if it makes sense

**`index.ts`**

- entry point to the generator

**`index.spec.ts`**

- integration tests for the generator as a whole

**`schema.ts`**

- TypeScript interface that matches schema.json
- you can use the following command to automate the conversion from json:
  - `npx json-schema-to-typescript -i tools/generators/<generator-name>/schema.json -o tools/generators/<generator-name>/schema.ts`

**`schema.json`**

- provides a description of the generator, available options, validation information, and default values. This is processed by nx cli when invoking generator to provide argument validations/processing/prompts.

**`README.md`**

- generator documentation - about + API
  - NOTE: in future this will be automatically generated

### Bootstrap new generator

- via CLI:

```sh
yarn nx workspace-generator workspace-generator
```

- via Nx Console:

![Generate new workspace generator via NX Console](https://user-images.githubusercontent.com/1223799/148544909-034ebe44-eef1-4686-960d-cb3547da55b7.png)

## Migrations

- migrations live in `tools/generators` folder
  - ideally this should live under `tools/migrations` but because constraint of how workspace generators invocation works in nx, we are restricted to to place them alongside standard generators
- everything from `Generators` guide applies
  - migration generator is just a standard generator with different purpose
- generator name starts with `migrate-*` (for example - `migrate-my-package`)

## Executors

- executors live in `tools/executors` folder

### Scaffolding

TBA

### Bootstrap new executor

TBA
