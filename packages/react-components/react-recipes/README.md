# @fluentui/react-recipes

**React Recipes for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

## **How to create a recipe?**

To first create the folder with the recipe, run the following command:

```sh
yarn create-recipe
```

This command will walk you through the process of creating a recipe.

---

## **What is a recipe?**

A recipe is a document that allows you to communicate how to build a component, how to explain a concept, or how to use our library to build an experience. A recipe should have the following aspects:

- Concise information with a clear goal.
- It should cover abstract concepts and not just code snippets.
- It should also be able to be used by a developer that is new to Fluent UI.
- It should promote the use of our composition model and already created components.

## **Types of recipes**

### **Component Recipes**

When a component is simple enough to be built with already created components, we can provide a recipe that will guide the user on how to build said component. This will help by not creating a component that does not provide high value and keep the library small.

These recipes will also help when we get requests to create a component, but we won't work on it in the near future. By poroviding a recipe, we can help partially fill the requests and allow the user to build the component themselves. If the recipe gets enough traction, we can revisit prioritizing working on this component.

> - Component recipes should be generic enough to be used in multiple scenarios and not just one.

### **Concept Recipes**

When a concept in our library is hard to grasp and our documentation doesn't povide enough information, we can provide a recipe that will guide the user on how to use/understand the concept. These recipes should not be of every concept specific to our library, instead they should be used as a way to help users understand concepts that are critical to becoming more familiar with our library.

### **Prototype Recipes**

When a user wants to build an experience that is not covered by our library and will not be added because it is not atomic enough or because of its complexity, we can provide a recipe to guide the user on how to build these experiences. These should be created by using our library and not have specific implementation details as they may not apply to all scenarios. A common exmpample of such experience is a message for a chat application.
