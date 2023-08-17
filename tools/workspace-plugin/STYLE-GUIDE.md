# NX tooling dev/style guide

## Generators

Generators should live in the `tools/generators` folder. [Learn more about Nx generators](https://nx.dev/generators/workspace-generators).

### Scaffolding

```sh
<generator-name>/
|- files/
    |- some-file.ts__tmpl__
    |- config.json__tmpl__
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

Place for static or dynamic templates used to generate files.

⚠️ Make sure every file ends with `__tmpl__` suffix. This suffix should be part of the extension, not a separate extension.

- ✅ `my-file.ts__tmpl__`
- ❌ `my-file.ts.__tmpl__` (notice the extra `.`)

The `__tmpl__` suffix will be removed as part of the generation.

**`lib/` (optional)**

Consider splitting your logic into smaller modules if your generator becomes too big/complicated. This is the place where you should split your logic into smaller modules.

If it makes sense, try to provide a unit test for every module.

**`index.ts`**

Entry point to the generator.

**`index.spec.ts`**

Integration tests for the generator as a whole.

**`schema.ts`**

TypeScript interface that matches `schema.json`. You can generate this from the json file by running:

- `npx json-schema-to-typescript -i tools/generators/<generator-name>/schema.json -o tools/generators/<generator-name>/schema.ts --additionalProperties false`

**`schema.json`**

Provides a description of the generator, available options, validation information, and default values. This is processed by nx cli when invoking generator to provide argument validations/processing/prompts.

**`README.md`**

Generator documentation - about + API

Run following to update TOC:

```sh
npx markdown-toc --bullets "-"  -i tools/generators/<generator-name>/README.md
```

ℹ️ _NOTE: In future, this will be automatically generated._

### Bootstrap new generator

#### CLI:

```sh
yarn nx g @fluentui/workspace-plugin:workspace-generator
```

#### Nx Console:

![Generate new workspace generator via NX Console](https://user-images.githubusercontent.com/1223799/148544909-034ebe44-eef1-4686-960d-cb3547da55b7.png)

## Migrations

Migrations live in the `tools/generators` folder. They should ideally live in `tools/migrations` but due to how workspace generator invocations works in nx, we are restricted to place them alongside standard generators.

Migrations follow same rules as [Generators](#Generators) as they behave the same but serve a different purpose.

⚠️ Migrations generator's name should start with `migrate-*`.

- ✅ `migrate-my-package`
- ❌ `migration-mu-package`

## Executors

Executors should live in the `tools/executors` folder. [Learn more about Nx executors](https://nx.dev/executors/using-builders).

### Scaffolding

TBA

### Bootstrap new executor

TBA
