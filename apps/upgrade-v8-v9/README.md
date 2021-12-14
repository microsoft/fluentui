# Fluent UI React v8 to v9 Upgrade Guide

## How to use this guide

This document will help guide you through building a plan to upgrade from `@fluentui/react` version 8 to `@fluentui/react-components` version 9.
We recommend you read through it once before starting to plan your upgrade, then reference the detail sections as you plan.

Each upgrade will go through before, during, and after phases.

- Before: v8 components only
- During: a mix of v8 and v9 components
- After: v9 components only

As you upgrade each component, leverage the accompanying web application.
It includes both v8 examples and matching v9 usage examples.
By building v8-only, mixed, or v9-only files of the application you can compare the application between phases.
The application was designed to let you run code-mods against it to learn about the kinds of upgrade changes.

You may notice the examples are pulled from storybook, but this app does not use storybook. Reasons:

- This isn't meant to replace the v8 or v9 storybooks, so we don't need any of the storybook features.
- The application is built with only fluent and react dependencies so you can inspect the resulting bundle size. Storybook was too big a dependency to add.
- We wanted to leverage the create-react-app fluent template as the starting point.Storybook is designed to be used during development and isn't the default production compile path of the product.
- We only want the minimal set of usage examples specific to upgrade scenarios. Storybook is built to provide multiple variations of component usage.

## Motivation

Fluent UI React v9 provides a significantly improved set of components, composition and deployment features, and a modern design language for styling and theming.

Some reasons to upgrade to v9:

- New and improved visual styling, rendering performance, and accessibility
- Easier to use and more consistent component props
- Build-time CSS-in-JS
- Component part customization using slots
- Design token language with an improved theme provider
- Component composition and re-use leveraging React hooks
- Reduced bundle size with tree shaking

The designer and developer documentation covers the improvements in detail.

## Upgrade Planning Considerations

// TODO: This section needs more information.

There may be cases where it is preferable to make updates to v8 component usage before upgrading to v9 components.
This can allow for code-mods to auto-upgrade in more places, avoid conflicts with custom styling, and handle breaking props changes early.

You will also likely want to decide if your application should look like v8 or v9 during the upgrade.

## Challenges

Note: This document is still in progress and we're working on solutions to help upgraders overcome these challenges.

### 1. Lack of parity

At the time of this writing, v9 does not have all the components available in v8. This will extend the duration when your application has both v8 and v9 components.

### 2. Retired components

Some v8 components are not in v9. For example, Stack was retired as it offered little value over using CSS flex-box directly. This will require replacing retired components with makeStyles and JSX or custom components.

### 3. Heavy v8 usage

You may have tens, hundreds, or even thousands of instances of a v8 component in your code base. Manual search and replace would be impractical. Code-mods are needed to upgrade automatically.

### 4. Props vs. children breaking changes

Some v8 components have props accepting data (e.g. ContextualMenu items). A `map` function is used to render the children. The v9 component will often take JSX children directly (e.g. `<MenuList> <MenuItem/> <MenuItem/> </MenuList>`). This can make a code-mod difficult or impossible and require manual upgrade.

// TODO: What about an adapter component that rendered the new children from the items data?

### 5. Nested v8 usage

Some v8 components render other v8 components as children. For example, SearchBox and Pickers leverage the TextField

### 5. Customized v8 styling

You may have customized the style of v8 components using the styles prop or an external CSS-in-JSS framework such as emotion or styled-components. Manual upgrade work will need to use the v9 FluentProvider and makeStyles to get consistent styling and theming.

If you heavily customized the style of part of a v8 component, you may need to leverage the v9 slots feature to replace that part with another component.

### 6. Theme differences

The v8 and v9 components have different styles and themes. While you application is depending on v8 and v9 side-by-side, you may want a single, consistent theme across all components. This will require a mechanism to re-theme v8 to look like v9 or v9 to look like v8.

### 7. Bundle size increase (during upgrade)

If your application ships during the upgrade, it will have side-by-side dependencies on both libraries. Minimizing bundle size will require review of which components are included in the bundle, verifying tree shaking, and possibly upgrading some components in tandem.

# Component Upgrade

This lists the mapping of v8 components to their v9 component replacement or equivalent.

Some components have been removed. For example, Stack will need to be replaced with JSX and flex-box CSS styles.

Blank cells mean that there is not a v9 component (yet).
A dash (-) indicates a continuation to allow for one-to-many and many-to-one mappings.

| v8                     | v9             |
| ---------------------- | -------------- |
| ActionButton           | Button         |
| ActivityItem           |                |
| BasicList              |                |
| Breadcrumb             |                |
| CommandBarButton       |                |
| CommandButton          | MenuButton     |
| CompoundButton         | CompoundButton |
| Calendar               |                |
| Callout                |                |
| Checkbox               |                |
| ChoiceGroup            |                |
| Coachmark              |                |
| ColorPicker            |                |
| ComboBox               |                |
| ContextualMenu         | Menu           |
| -                      | MenuList       |
| -                      | MenuItem       |
| -                      | MenuPopover    |
| -                      | MenuSeparator  |
| DefaultButton          | Button         |
| DefaultButton (anchor) | Button         |
| DefaultButton (menu)   | MenuButton     |
| DatePicker             |                |
| DetailsList            |                |
| Dialog                 |                |
| DocumentCard           | Card           |
| Dropdown               |                |
| Facepile               |                |
| GroupedList            |                |
| Icon                   |                |
| IconButton             | Button         |
| Image                  | Image          |
| Label                  | Label          |
| Layer                  | Portal         |
| Link                   | Link           |
| MessageBar             |                |
| Modal                  |                |
| Nav                    |                |
| OverflowSet            |                |
| Overlay                | Portal         |
| Panel                  |                |
| PrimaryButton          | Button         |
| PeoplePicker           |                |
| Persona                | Avatar         |
| Pickers                |                |
| Pivot                  |                |
| ProgressIndicator      |                |
| Rating                 |                |
| ResizeGroup            |                |
| ScrollablePane         |                |
| SearchBox              |                |
| Separator              | Divider        |
| Shimmer                |                |
| Slider                 |                |
| SplitButton            | SplitButton    |
| SpinButton             |                |
| Spinner                |                |
| Stack                  | (removed)      |
| SwatchColorPicker      |                |
| TagPicker              |                |
| TeachingBubble         |                |
| Text                   |                |
| TextField              |                |
| ThemeProvider          | FluentProvider |
| ToggleButton           | ToggleButton   |

// TODO Interfaces like KeyTip?

| New in v9     |
| ------------- |
| Accordian     |
| Badge         |
| CounterBadge  |
| PresenceBadge |

# Buttons Upgrade

Upgrading DefaultButton, ActionButton, CompoundButton, IconButton, PrimaryButton,

## Button Props

In v8, all the variants of buttons use IButtonProps.

In v9, Button defines its own props and variants defined their own props.
v9 Button variants extend from ButtonProps through type intersection, Pick/Omit, and Required/Partial.

| v8 IButtonProps          | v9 ButtonProps (replacements)         |
| ------------------------ | ------------------------------------- |
| allowDisabledFocus       | disabledFocusable                     |
| ariaLabel                | HTML aria-label                       |
| ariaDescription          | HTML aria-description                 |
| ariaHidden               | HTML aria-hidden                      |
| checked                  | (use ToggleButton checked)            |
| className                | className                             |
| componentRef             | ref                                   |
| data                     | (removed)                             |
| defaultRender            | children                              |
| getClassNames            | (removed)                             |
| getSplitButtonClassNames | (removed)                             |
| href                     | (use Link)                            |
| iconProps                | icon (slot)                           |
| disabled                 | disabled                              |
| keyTipProps              | (**missing feature**)                 |
| menuAs                   | (use Menu and HTML as)                |
| menuIconProps            | (use MenuButton menuIcon)             |
| menuProps                | (use Menu and MenuButton)             |
| menuTriggerKeyCode       | (**missing feature**)                 |
| onMenuClick              | HTML onClick                          |
| onRenderAriaDescription  | HTML aria-description                 |
| onRenderChildren         | children                              |
| onRenderDescription      | (use CompoundButton secondaryContent) |
| onRenderIcon             | icon (slot)                           |
| onRenderMenuIcon         | (use MenuButton icon)                 |
| onRenderText             | children                              |
| persistMenu              | (use Menu)                            |
| primary                  | appearance=primary                    |
| primaryActionButtonProps | (removed)                             |
| primaryDisabled          | disabled                              |
| secondaryText            | (use CompoundButton secondaryContent) |
| split                    | (use SplitButton)                     |
| splitButtonAriaLabel     | HTML aria-label                       |
| splitButtonMenuProps     | (use Menu and SplitButton)            |
| styles                   | (use makeStyles and className)        |
| text                     | children                              |
| theme                    | (use FluentProvider)                  |
| toggle                   | (use ToggleButton)                    |
| uniqueId                 | HTML key                              |

### v9 Button Props

| ButtonProps        |
| ------------------ |
| appearance         |
| block              |
| disabledFocusabled |
| disabled           |
| icon (slot)        |
| iconPosition       |
| shape              |
| size               |

| CompoundButtonProps     |
| ----------------------- |
| (ButtonProps)           |
| secondaryContent (slot) |

| MenuButtonProps |
| --------------- |
| (ButtonProps)   |
| menuIcon (slot) |

| SplitButtonProps           |
| -------------------------- |
| (ButtonProps)              |
| menuButton (slot)          |
| primaryActionButton (slot) |

| ToggleButtonProps |
| ----------------- |
| (ButtonProps)     |
| checked           |
| defaultChecked    |
