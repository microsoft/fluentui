# RFC: Component recipes

---

@sopranopillow

## Summary

Decide how to implement simple components that could be built with already created components.

## Background

Currently Persona's spec calls for a media slot that allows the use of an Avatar, image, icon, and a PresenceBadge. When implementing Persona we considered what Persona provides, it is a grid that aligns its text and media based on the given label position. This is also known as a media object by other libraries.

There's one key aspect that Persona adds that makes creating the component compelling, unifying the look and feel across apps. To achieve this, we don't need the image and icon media options, we only need the Avatar and PresenceBadge (it also makes more sense that a persona only showcases person-related information). This then is the reason why the already implemented Persona only supports these slots. But there's still the question about how to add the look and feel of Fluent to media objects that have an image or icon.

This is where this RFC will decide how to proceed with this portion of the problem.

## Problem statement

As we start working on new components, there might be some components that are simple and could be built with a simple layout and the already finished components. When creating these components, we currently don't have a guidance on whether to let the user build the component or us provide the component. This RFC offers three options, one that will require the user to build the components using instructions (recipes), another where we will provide the implementation of the component, and a combination of both option 1 and 2 providing a partial implementation and a recipe.

#### What makes a component a candidate for this RFC's solution?

- Its implementation is simple.
- The desired design is achievable adjusting the props of the inner components.
- It doesn't have complex accessibility requirements.
- It doesn't have strict design requirements.

## Detailed Design or Proposal

### Option 1: Recipes section in docsite

In this option we will add a section to our docs detailing how to create the component with our already created components.

A great example of a recipe is the [Media Objects recipe](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook/Media_objects) by MDN.

#### Folder structure inside docs

```
\- Concepts
  |- Introduction
  |- Developer
  |- Migration
  |- Recipes
    |- Recipe #1
    |- Recipe #2
\- Theme
  |- Color
  |- Motion and Size
  |- Typography
\- Components
  |- ...
\- Preview Components
  |- ...
```

#### Pros

- No need for a new package in our repo.
- In the case of a component like persona where its design requires us to change the icon's size, we would provide best practices section that could include a size table for reference.

#### Cons

- Allows for issues where
- Could be overwhelming for the user to follow the recipe.

### Option 2: We provide the component

For this option, we would implement the component and provide it like any other component.

#### Pros

- We can ensure the design follows the design spec.
- We control the accessibility behavior.
- Makes it easier for the user.

#### Cons

- Another component package for a simple component.
- More code to maintain.

### Option 3: Option 1 + Option 2 `@fluentui/react-recipe-hooks`

We provide style hooks such as `useMediaObjectStyles()` or `useMediaObjectClassNames()`. The hook's options would contain what would be the props in a regular component and it would return its classnames so the user can apply them respectively. These hooks could be housed in a package such as `@fluentui/react-recipe-hooks`. A simple example could be:

```jsx
import { Text } from '@fluentui/react-text';
import { Image } from '@fluentui/react-image';
import { useMediaObjectClassNames } from '@fluentui/react-recipe-hooks';

const MyMediaObject = () => {
  const mediaObjectClassNames = useMediaObjectClassNames({ labelPosition: 'below' });

  return (
    <div className={mediaObjectClassNames.mediaObject}>
      <Image
        className={mediaObjectClassNames.media}
        block
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png"
      />
      <Text className={mediaObjectClassNames.text}>Lorem Ipsum</Text>
      <Text className={mediaObjectClassNames.text}>Dolorem</Text>
    </div>
  );
};
```

#### Pros

- We can add more design guidance
- While the user still has to do more work than option 2, it's way easier than option 1.
- Simpler to maintain than option 2.
- Can make option1 easier to follow.

#### Cons

- More code to maintain.
- Could bring more issues by being hard to follow.

## Discarded Solutions

## Open Issues
