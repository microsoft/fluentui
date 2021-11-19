# @fluentui/codemods

This is a utility package to assist with the upgrading of libraries and apps that rely on fluentui.

## How it works

If you have a typescript application or library that relies on a non-current version of Fluent UI then you can run `npx @fluentui/codemods` to immediately begin an upgrade of your codebase, saving you the trouble of doing so manually! This works by finding all the tsconfig files and then using those to find the relevant files to upgrade before running the updates on each of them!

## Executing a codemod (Prototype)

If your application relies on any Fluent UI package simply run

```
npx @fluentui/codemods
```

and the upgrade will begin if there are any relevant codemods to apply to your codebase!

## Next Steps

Run

```sh
yarn
yarn start-test
```

To start testing the codemods

## To add a codemod

Add your codemods to the `./src/mods` folder with `.mod.ts|tsx` as the file type.

## Test with the actual package:

Run

```sh
yarn build
```

To build

Run

```sh
npm pack
```

from the codemods package root to create a tar file for testing. Move the created tar file to the package you want to test and run

```sh
npx <tarFileName>
```

## npx Flags & Config

- There are currently 4 npx flags:
  - `-n` Specify name(s) of codemod(s) to run. You can find these names in `codemods/src/codemods/mods`. Make sure that they are `enabled` before running them, or else they won't run!
  - `-r` Specify regex pattern(s) to identify mod(s) to run.
  - `-e` Boolean flag that flips the inclusion of the specify mods. Use this flag with the selective flags `-n` or `-r` to opt to _exclude_ the selected mods rather than include them.
  - `-l` List the names of all enabled codemods. Mods that exist but aren't enabled will not appear, as running them would do nothing.
  - `-c` For developers who don't want to worry about the command line, they can create a `modConfig.json` file in their repo. The template for the file looks like this, where `stringFilters` and `regexFilters` would correspond to inputs following `-n` and `-c`, respectively:
  ```json
  {
    "stringFilters": [],
    "regexFilters": [],
    "includeMods": true
  }
  ```
- If you specify no flags, npx will run all `enabled` codeods.

## Todos

- Write a `flag` utility that will enable devs to note when a part of a file needs to be changed, but cannot be done via codemod.
- Implement a command that will execute all listed codemods on a single file.
  - Will need to think of a way to specify the order. Maybe something like tasks in Just.
  - This could be helpful when you want to run a set of codemods based on a single condition, like the presence of a specific import

## Notes

ts-morph:

- ts-morph does most of the heavy lifting. Don't be afraid to use it directly rather than trying to abstract into a utility.
- One of the most useful types of the syntax tree to get is the `SyntaxKind.block` it is the equivalent of the `{ stuff }` that is located in a function declaration and is where a lot of code lives.
- You can only access JSX props on syntax kinds of `SyntaxKind.JSXOpeningElement` and `SyntaxKind.JSXSelfClosingElement`
- `getChildIndex` returns the child index respective to the immediate parent. It resets at each level. So consider the following:
  ```
       function foo() {
           const childIndex0 = "some other value";
           const childIndex1 = "some value";
           return childIndex2;
       }
  ```
  And then consider
  ```
       function foo() {
           const childIndex0 = "some other value";
           const childIndex1 = "some value";
           const nestedFunctionChildIndex2 = () => {
               const childIndex0; // childindex is now 0
           }
           return childIndex3
       }
  ```
