# RFC: Component recipes

---

@sopranopillow

## Summary

Decide how to implement components that could be built with already created components.

## Background

Currently Persona's spec calls for a media slot that allows the use of an Avatar, image, icon, and a PresenceBadge. When implementing Persona we considered what Persona provides, it is a grid that aligns its text and media based on the given label position. This is also known as a media object by other libraries.

There's one key aspect that Persona adds that makes creating the component compelling, unifying the look and feel across apps. To achieve this, we don't need the image and icon media options, we only need the Avatar and PresenceBadge (it also makes more sense that a persona only showcases person-related information). This then is the reason why the already implemented Persona only supports these slots. But there's still the question about how to add the look and feel of Fluent to media objects that have an image or icon.

This is where this RFC will decide how to proceed with this portion of the problem.

## Problem statement

As we start working on new components, there might be some components that are simple and could be built with a simple layout and the already finished components. When creating these components, we currently don't have a guidance on whether to let the user build the component or we provide the component. This RFC offers three options, one that will require the user to build the components using instructions (recipes), another where we will provide the implementation of the component, and a combination of both option 1 and 2 providing a partial implementation and a recipe.

#### What makes a component a candidate for this RFC's solution?

- It should encourage components that provide high value beyond general purpose layout.
- It should promote the use of our composition model and already created components. This will help us achieve a consistent look and feel across apps.
- It should be generic enough to be used in multiple scenarios. This is to avoid creating a component that is only used in one place.
- (if option 1 or 3 is chosen) It should provide more than a blurb of code snippets that the users might just copy and paste.

## Chosen option (Option 1: Recipes)

### What is a recipe?

A recipe is a document that allows you to communicate how to build a component, how to explain a concept, or how to use our library to build an experience.

### What is expected of a recipe?

A recipe should have the following aspects:

- Concise information with a clear goal.
- It should cover more abstract concepts and not just code snippets.
- It should also be able to be used by a developer that is new to Fluent UI.
- When writing a recipe for a component, it should be generic enough to be used in multiple scenarios and not just one.
- It should promote the use of our composition model and already created components.

### How can a recipe help you?

#### Component recipes

When a component is simple enough to be built with already created components, we can provide a recipe that will guide the user on how to build said component. This will help by not creating a component that does not provide high value and keep the library small.

These recipes will also help when we get requests to create a component, but we won't work on it in the near future. By providing a recipe, we can help fill the requests partially and allow the user to build the component themselves. If the recipe gets enough traction, we can revisit prioritizing working on this component.

#### Concept recipes

When a concept in our library is hard to grasp and our documentation doesn't provide enough information, we can provide a recipe that will guide the user on how to use/understand the concept. These recipes should not be of every concept specific to our library, instead they should be used as a way to help users understand concepts that are critical to becoming more familiar with our library.

#### Prototype recipes

When a user wants to build an experience that is not covered by our library and will not be added because it is not atomic enough or because of its complexity, we can provide a recipe to guide the user on how to build these experiences. These should be created by using our library and do not have specific implementation details as they may not apply to all scenarios. A common example of such experience is a message for a chat application.

---

## Detailed Design or Proposal

### Option 1: Recipes section in docsite

In this option we will add a section to our docs detailing how to create a component/layout/composition using already created components in a Fluent way. We could think of it as showing how to Fluentify known patterns or layouts.

It is also important to note that this option doesn't mean we will provide code snippets that you have to copy paste, but rather guide the user on what's the important part of the component and leave the rest to the user.

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
- In the case of a component like persona where its design requires us to change the icon's size, we would provide a "best practices" section that could include a size table for reference.

#### Cons

- Allows for issues where the user-created component doesn't look like the design.
- Could be overwhelming for the user to follow the recipe.

### Option 2: We provide the component

For this option, we would implement the component and provide it like any other component.

#### Pros

- We can ensure the design follows the design spec.
- Makes it easier for the user.

#### Cons

- Another component package for a simple component.
- More code to maintain.
- More design figmas.

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

There will still be parts of the component that the user will have to implement, these hooks will not be a full implementation.

#### Pros

- We can add more design guidance.
- While the user still has to do more work than option 2, it's way easier than option 1.
- Simpler to maintain than option 2.
- Can make option 1 easier to follow.

#### Cons

- More code to maintain.
- Could bring more issues by being hard to follow.

## Discarded Solutions

Option 2 and 3

## Chosen Solution

Option 1 was chosen. We will test how this works and if we see issues with this approach, we will consider option 2. Option 3 was discarded because it's too similar to option 2 and it's not clear if it's better than option 1. A follow-up RFC will be created to discuss what is expected of a recipe and when it's needed.

## Open Issues
