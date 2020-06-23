# ts-morphin-migration

ts-morphin-migration is a package created and managed with the `create-just` utility.

## Next Steps

Now that you have created this repository, go ahead and run the following to get started:

```sh
yarn
yarn start-test
```

## Executing a codemod (Prototype)

Add your codemods to the `./src/index.ts`

Run

```sh
yarn build
```

To build the migration.js file

In the command line, `cd` to the project that you want to change and run `npx <path to ts-morphin-migration>\bin\migration.js <source folder to run migrations on>`

## Todos

- Improve command line calling of the `migration.js` file.
- Target the tsconfig.json file rather than having users enter their own path
- Write a `flag` utility that will enable devs to note when a part of a file needs to be changed, but cannot be done via codemod.
- Implement a command that will execute all listed codemods on a single file.
  - Will need to think of a way to specify the order. Maybe something like tasks in Just.

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
