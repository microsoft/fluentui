# @fluentui/react-label Spec

## Background

_Description and use cases of this component_

## Prior Art

- [open-ui PR](https://github.com/openui/open-ui/pull/348)
- [Label Convergence Epic issue](https://github.com/microsoft/fluentui/issues/18247)

### Label in Fabric/v8

```tsx
<Label required>I am a required label</Label>
```

Props used in v8 Label:
|Prop|Description|
|---|---|
|as|Element type to render Label as|
|componentRef|Optional callback to access the ILabel interface. Use this instead of ref for accessing the public methods and properties of the component|
|disabled|Renders label as disabled, changing the Label's foreground color|
|required|Renders an asterisk next to the given text|
|styles|Custom styles for the Label|
|theme|Theme provided by HOC|

### Label in Northstar/v0

```tsx
<Label content="You have 23 emails" />
```

Props used in v0 Label:
|Prop|Description|
|---|---|
|accessibility| Prop to override accessibility behavior|
|as|Element type to render Label as|
|circular|Renders Label with round corners|
|className|Additional CSS class name to apply|
|color|Color for the background of the label|
|content|Label content|
|fluid|Make it so Label takes the width of its container|
|icon|Adds an icon to the label|
|iconPosition|Choose where the icon is placed (Start or End)|
|image|Adds an image to the label|
|imagePosition|Choose where the image is placed (Start or End)|
|styles|Additional custom styles for the component|
|variables|Allows override of theme variables|

### Conclusion

Moving forward, Label will be a simple component. The converged Label will be based on v8's Label with some minor changes. Most props from v0 will be left out but because of the use of slots, it won't be too difficult to migrate to the converged Label.

## Sample Code

```tsx
<Label>Label</Label>

<Label disabled>Label</Label>

<Label required>Label</Label>

<Label required requiredText="x">
  Label
</Label>

<Label info={}>
  Label
</Label>
```

## Variants

_Describe visual or functional variants of this control, if applicable. For example, a slider could have a 2D variant._

## API

_List the **Props** and **Slots** proposed for the component. Ideally this would just be a link to the component's `.types.ts` file_

## Structure

- _**Public**_
- _**Internal**_
- _**DOM** - how the component will be rendered as HTML elements_

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_
- _Migration from v0_

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
- _Interaction_
  - _Keyboard_
  - _Cursor_
  - _Touch_
  - _Screen readers_

## Accessibility

Base accessibility information is included in the design document. After the spec is filled and review, outcomes from it need to be communicated to design and incorporated in the design document.

- Decide whether to use **native element** or folow **ARIA** and provide reasons
- Identify the **[ARIA](https://www.w3.org/TR/wai-aria-practices-1.2/) pattern** and, if the component is listed there, follow its specification as possible.
- Identify accessibility **variants**, the `role` ([ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)) of the component, its `slots` and `aria-*` props.
- Describe the **keyboard navigation**: Tab Oder and Arrow Key Navigation. Describe any other keyboard **shortcuts** used
- Specify texts for **state change announcements** - [ARIA live regions
  ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (number of available items in dropdown, error messages, confirmations, ...)
- Identify UI parts that appear on **hover or focus** and specify keyboard and screen reader interaction with them
- List cases when **focus** needs to be **trapped** in sections of the UI (for dialogs and popups or for hierarchical navigation)
- List cases when **focus** needs to be **moved programatically** (if parts of the UI are appearing/disappearing or other cases)
