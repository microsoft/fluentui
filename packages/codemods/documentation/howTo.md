# How to Write and Run a CodeMod

Want to learn how to write and run codemods? You're in the right place!

If you want to learn more about the mods themselves, [check out the official README here](../README.md)

## CodeMod Writing Overview

There are two principal ways of writing your own codemods:

- **Config-based codemod**: Probably the easier way to create a codemod, the config-based codemod just reads in the contents of the json file `upgrades.json`, and returns a ready-to-run codemod to the user. To learn more about the valid mod configurations, [check out the custom types file](../src/codemods/types.ts)
- **Custom codemod**: For developers who want more flexibility with their codemods, they have the option to create their own mods by wrapping codemod _utilities_ together in a function and passing said function into the `createCodeMod()` function, which will return a ready-to-run codemod.

Here are the current features our codemods support:

- **Prop renaming**: Given a component name, a prop to rename and a replacement name, replace the prop name in all components over a codebase!
- **Renaming/Repathing imports**: Given a search string / regex, an old name/path, and a new name/path, modify all matching import statements to reflect your desired changes!

## Writing Your First CodeMod

Let's say you were responsible for renaming the `toggled` prop in Fluent's `Dropdown` component to `checked`. There are **two** easy ways to do it!

Feel free to try this out on your local branch of fluent! I've set up the files for you :).

### JSON

- To create a codemod using the config file, all you'd need to do is go into the `upgrades.json` file and replace what's there with the following template as defined in `src/codemods/types.ts`:

```jsonld=
{
  "name": // Classify this collection of codemods
  "upgrades": [
    {
      "name": // What upgrade are you running?
      "type": // Currently renameProp | repathImport
      "version": // Mod version, as a string
      "options": {
        "from": {
          "importName": // Name of component housing prop
          "toRename": // Prop name to change
        },
        "to": {
          "replacementName": // New prop name
        }
      }
    }
  ]
}
```

- Once you fill out this file, you can then go to [src/codemods/tests/configMod](../src/codemods/tests/configMod/configMod.test.ts) and test your codemod! Invoke the function `createCodeModFromJson()`, which will turn whatever exists in `upgrades.json` into a list of codemods. Check out ##Testing Your Codemods## for more info on how to run!

### Custom CodeMods

- For developers who want a little more flexibility in their mod writing, you can create a codemod manually using codemod _utilities_. Details on these utilities can be found in `src/codemods/utilities`. To rename a prop, we'll need to use two utility functions:
  - `findJsxTag(file: SourceFile, tag: string)`
    - This utility returns an array of JSX elements containing the given tag (in our case, the 'tag' will be the name of the component we're looking for).
    - To create the codemod, you won't need to know much about AST's and how we parse them, but if you want to read up on it, check out [ts-morph!](https://ts-morph.com/)
  - `renameProp( instances: (JsxOpeningElement | JsxSelfClosingElement)[], toRename: string, replacementName: string, replacementValue?: string, transform?: PropTransform)` \* This function accepts the return value of `findJSXTag`, as well as names for the deprecated prop and its replacement name. The function also takes in an optional replacement value, if you plan on updating the value of this prop whenever you want to rename it. For developers wanting even more granularity with value changes, there's an optional transform function you can pass in -- read[renamePropTransforms](./renamePropTransforms) for more.
- To create the codemod, wrap these two function calls in a void function that takes in a single parameter of type `SourceFile`. This example suffices:

```typescript=
const func = function(file: SourceFile) {
  // your codemod utilities here!
};
```

- You can then go to [src/codemods/tests/configMod](../src/codemods/tests/configMod/configMod.test.ts) and run and test your codemod! Invoke the function `createCodeMod(options: ModOptions, mod: (file: SourceFile) => void)`, which accepts a struct containing a name and a version string, as well as the wrapper function that you just created. The return type is a single codemod!

### Testing Your CodeMods

###### If you're still writing your first codemod, stay in `configMod.test.ts`.

- Before you run your codemod, you'll need to specify files to run on! The following code will do:

```typescript=
project = new Project();
project.addSourceFileAtPaths(`${process.cwd()}addSomePathHere!`);
/* If you want to add many paths, you can do that too. */
project.addSourceFilesAtPaths(`${process.cwd()}someRegexPath`);
```

- Once you have your codemod(s), to run them, you can use the function `runMods()`, which accepts an array of codemods, an array of source files, and a callback function that reports on the success of the mod. Here's what an invocation might look like:

```typescript=
runMods(codemodArray, project.getSourceFiles(), result => {
  result.result.resolve(
    v => {
      console.log(`Upgraded file ${result.file.getBaseName()} with mod ${result.mod.name}`, v.logs);
    },
    e => {
      console.warn(`Mod ${result.mod.name} did not run on file ${result.file.getBaseName()} for: `, e.reason);
    },
  );
});
```

- You just ran your first config-based codemod! Woo hoo! Now, let's write a test to verify that it worked. The repo currently uses jest tests, so if you're unfamiliar, the easiest way to use it is the following:

```typescript=
// inside the 'it' body of a test
expect(somePredicate).toBeTruthy(); // Test fails if SOMEPREDICATE is false
expect(somePredicate).toBeFalsy(); // Test fails if SOMEPREDICATE is true.
```

- Unfortunately, to write tests for your codemods, you'll need to know a little bit of `ts-morph` to be able to navigate the AST and examine the renamed props. Here's some code to get you started that uses existing utilities to return an array of JSX elements that contain the components in question:

```typescript=
const file = const file = project.getSourceFileOrThrow(DropdownPropsFile);
const tags = findJsxTag(file, 'Dropdown');
```

- You can then iterate through the tags array and test each JSX tag for the existence of 'togggled'. To get the text of a JSX tag, you can use the `getText()` function. Be wary that ts-morph functions can potentially return undefined!
  - If you cannot find any instances of 'toggled' in the codebase, congrats! It looks like your codemod worked! Feel free to add more detailed tests to verify that the changes you made are present.
- ##WARNING##: if your tests are failing because your imports cannot be found, this is because you need to repath the imports using relative paths instead of paths from the `src` file.

### Running your CodeMods

- Now you're ready to run your code mods for real! To avoid duplicate documentation, check out [the official README](../README.md) for details on how to run your codemods on a repo.
