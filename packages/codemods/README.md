# ts-morphin-migration

ts-morphin-migration is a package created and managed with the `create-just` utility.

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

To build the upgrade.js file

Run

```sh
npm pack
```

from the codemods root to create a tar file for testing. Move the created tar file to the package you want to test and run

```sh
npx <tarFileName>
```

## Executing a codemod (Prototype)

Make sure that fluent is installed in your package.
Run

```
npx @fluentui\codemods
```

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
- `getChildIndex` returns the child index respective to the immediate parent. It resets each level. So consider the following:
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
