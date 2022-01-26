# Using and Writing Transforms to Change Prop Values

For developers who want more freedom when changing the value of props, transforms come to the rescue!

Check out [../src/codemods/utilities/transforms.ts](../src/codemods/utilities/transforms.ts) to see local documentation and more transform examples!

## Using Transforms

- There are a few pre-written transforms to change the value of primitive types. The types covered are
  - **boolean**
  - **string**
  - **number**
  - **enum**
- The way you use one of these transforms is very simple! The pre-written transforms take in 2 optional arguments: a replacement value as a string, and a map of strings. Use the first parameter if you simply want to change the value of a prop (this functionality also exists in the `renameProp()` utility). Use the second parameter if you know your domain of prop values and want old values to be mapped to new ones.
  - Transform functions return a closure that can be passed into renameProp(). Here's what that might look like if you're fliping a boolean value:

```ts
const file = project.getSourceFileOrThrow(DropdownPropsFile);
const tags = findJsxTag(file, 'Dropdown');
const dropdownMap: ValueMap<string> = { false: 'true', true: 'false' };
const transform = boolTransform(dropdownMap);
renameProp(tags, 'isDisabled', 'disabled', undefined, transform);
```

## Writing Transforms

###### Note: this will require some detailed knowledge of [ts-morph](https://ts-morph.com)

- A transform function returns a function of type `PropTransform`, which is a closure that actually modifies the codebase. This is what a`PropTransform` function takes in:

```ts
export type PropTransform = (
  node: JsxExpression | JsxOpeningElement | JsxSelfClosingElement,
  toRename: string,
  replacementName: string,
) => Result<string, NoOp>;
```

And here's what the body of a transform might look like:

```ts
export function boolTransform(newValue?: boolean, map?: ValueMap<string>): PropTransform {
  return (
    element: JsxExpression | JsxOpeningElement | JsxSelfClosingElement,
    toRename: string,
    replacementName: string,
  ) => {
    if (elementNotInSpread(element)) {
      const toChange = getValueToChange(element as JsxExpression);
      if (toChange) {
        const oldText = toChange.getText();
        toChange.replaceWithText(map ? map[oldText] : newValue !== undefined ? newValue.toString() : toRename);
        return Ok('Prop value transformed successfully');
      }
      return Err({ reason: 'Could not access prop value to transform.' });
    } else {
      return renamePropInSpread(
        element as JsxOpeningElement | JsxSelfClosingElement,
        toRename,
        replacementName,
        map,
        newValue?.toString(),
      );
    }
  };
}
```

###### There's a lot to take in here -- don't worry! A lot of it is error logging or invocation of existing functions. **Unless you're trying to something really creative, you shouldn't need to write your own transform function.** We've provided transforms for the basic primitives.

- As you can see, the transform itself simply returns a function -- this inner function's body is where the actual code modification happens.
  - The closure is necessary because the transform doesn't yet have access to the JSX elements to change, but it will inside `renameProp()`.
- The transform is broken up into two parts -- if the prop-to-rename exists in text, replace its value with whatever the mapped value is. If the prop is not found, attempt to find and replace it via the helper function `renamePropInSpread()`. Because `PropTransform` returns the type `Result<string, NoOp>`, the return statements are necessary for logging purposes.
  - In a successful case, you should return `Ok('success message')`, and in an unsuccessful case you should return `Err('failure message')`. `renamePropInspread()` returns a result.
