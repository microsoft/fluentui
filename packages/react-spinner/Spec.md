# @fluentui/react-spinner Spec

## Background

A Spinner is an outline of a circle which animates around itself indicating to the user that things are processing. Spinner is typically an indeterminate ProgressIndicator that is used when it is unknown how long a task will take to complete. They can be various sizes, located inline with content or centered. They generally appear while an action is being processed or committed. They are subtle and generally do not take up much space, but are transitions from the completed task.

## Prior Art

### Open UI

| Library                 | Component Name     | Spec Link                                                                                 | Notes                                                                                                                                                                                                                                                                                             |
| ----------------------- | ------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chakra UI               | `CircularProgress` | [CircularProgress](https://chakra-ui.com/docs/feedback/circular-progress)                 | `CircularProgress` has determinate and indeterminate forms, with props that give user the ability to change size, value, line thickness, and a min and max value, and add a label                                                                                                                 |
| Material UI             | `CircularProgress` | [CircularProgress](https://mui.com/components/progress/#progress)                         | `CircularProgress` has determinate and indeterminate, allows users to change color, add value, and add a label                                                                                                                                                                                    |
| Carbon                  | `InlineLoading`    | [InlineLoading](https://www.carbondesignsystem.com/components/inline-loading/usage)       | `InlineLoading` only has an indeterminate form, with four states: `inactive`, `active`, `finished`, `error`                                                                                                                                                                                       |
| FluentUI Northstar      | `Loader`           | [Loader](https://fluentsite.z22.web.core.windows.net/0.57.0/components/loader/definition) | `Loader` has a `delay` prop that specifies how long to wait before the `Loader` is visible on the page. You can also render a custom svg as the image, and use the `as` prop to choose whether to render the loader as a string or a component. Other props include `inline`, `label`, and `size` |
| Latitude Design System  | `Loader`           | [Loader](https://www.flexport.com/design/components/loaders#Loader)                       | This is a simple loader that allows users to modify size and whether the loader is inline                                                                                                                                                                                                         |
| Orbit                   | `Loading`          | [Loading](https://orbit.kiwi/components/progress-indicators/loading/)                     | Simple loader with animation and text                                                                                                                                                                                                                                                             |
| Elastic UI              | `LoadingSpinner`   | [LoadingSpinner](https://elastic.github.io/eui/#/display/loading#spinner)                 | Simple spinner                                                                                                                                                                                                                                                                                    |
| Adobe Spectrum          | `ProgressCircle`   | [ProgressCircle](https://spectrum.adobe.com/page/progress-circle/)                        | It has a default and an over background state. It also has a min and max value setting, as well as a size, determinate, and indeterminate                                                                                                                                                         |
| Ant Design              | `Spin`             | [Spin](https://ant.design/components/spin/)                                               | Can change size, add a delay, and render a custom spinner                                                                                                                                                                                                                                         |
| Atlassian Design System | `Spinner`          | [Spinner](https://atlassian.design/components/spinner/examples)                           | Has a default Spinner, with ability to change size(there are preset size options, with the ability to render the spinner with a custom size). Can also delay the Spinner, and use present animations such as `FadeIn`                                                                             |
| Base Web                | `Spinner`          | [Spinner](https://baseweb.design/components/spinner#api)                                  | Started out with a simple Spinner with a size, color, and title prop, but adds an override prop that lets you customize the look and feel of the Spinner                                                                                                                                          |
| Blueprint               | `Spinner`          | [Spinner](https://blueprintjs.com/docs/#core/components/spinner)                          | Has a value prop to allow for determinate or indeterminate Spinners, and a size prop with preset sizes provided as an ENUM                                                                                                                                                                        |
| Evergreen Design System | `Spinner`          | [Spinner](https://evergreen.segment.com/components/spinner)                               | Default Spinner that allows you to change size and add a delay, as well as render it centered in a div                                                                                                                                                                                            |
| Fabric                  | `Spinner`          | [Spinner](https://developer.microsoft.com/en-us/fluentui#/controls/web/spinner)           | This Spinner has specific aria attributes as props as well as label and size props to modify the default Spinner                                                                                                                                                                                  |
| GitLab Design System    | `Spinner`          | [Spinner](https://design.gitlab.com/components/spinner)                                   | Can change size, color, and set inline. Comes with a default 100ms delay                                                                                                                                                                                                                          |
| Paste                   | `Spinner`          | [Spinner](https://paste.twilio.design/components/spinner/#paste-docs-content-area)        | Contains many elements present in other design systems' Spinners: delay, size, color, and as props. Notably, no determinate or indeterminate forms                                                                                                                                                |
| Primer                  | `Spinner`          | [Spinner](https://primer.style/react/Spinner)                                             | Default Spinner with a size prop                                                                                                                                                                                                                                                                  |
| Garden                  | `Spinner`          | [Spinner](https://garden.zendesk.com/components/spinner)                                  | Default Spinner with color and size prop                                                                                                                                                                                                                                                          |
| Polaris                 | `Spinner`          | [Spinner](https://polaris.shopify.com/components/feedback-indicators/spinner)             | Default Spinner with a size prop, with preset small and large values                                                                                                                                                                                                                              |
| Lightning Design System | `Spinner`          | [Spinner](https://react.lightningdesignsystem.com/components/spinners/)                   | A more robust indeterminate Spinner with props that allow the Spinner to be rendered in a container, add styling to said container, inline the Spinner, and change the size                                                                                                                       |

### Comparison of v8 and v0

The existing components are:

- v8
  - `Spinner`
- v0
  - `Loader`
- Both `Spinner` and `Loader` have very similar props
- `Loader` has `delay`, while `Spinner` has aria props exposed for accessibility.

## Sample Code

Basic examples:

```jsx=
import { Spinner } from "@fluentui/react-spinner";

function App() {
    return (
        <Spinner size="medium" label="Loading" />
    )
}

```

## Variants

- Indeterminate Spinner
  - The default Spinner that spins around indefinitely

### Shape

The Spinner is represented as a circle with an arc of a darker shade rotating the circumfrence

## API

From [Spinner.types.tsx](https://github.com/microsoft/fluentui/blob/master/packages/react-spinner/src/components/Spinner/Spinner.types.ts)

### Slots

- `root` - The root element of the Spinner. The html element is a `span`
- `loader` - The svg element that gets animated into a Spinner. The html element is `svg`
- `label` - The text shown with the Spinner. This uses the `Text` control

### Props

```jsx
export type SpinnerProps = ComponentProps &
  React.HTMLAttributes<HTMLElement> & {
    /* The appearance of the Spinner*/
    appearance?: 'primary' | 'inverted',
    /* The labelPosition prop allows user to set the location of the label*/
    labelPosition?: 'above' | 'below' | 'before' | 'after',
    /* The size prop sets the size of the Spinner
     * @defaultValue "medium"*/
    size?: 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge',
    // inactive ? : boolean
    status?: 'active' | 'inactive',
  };
```

## Structure

```html
<span class="fui-Spinner">
  <!-- Label for Spinner -->
  <span className="fui-Spinner__label">Loading...</span>
  <span className="fui-Spinner__spinner">
    <!-- Svg that receives the animation. Classnames are used for animation -->
    <svg role="progressbar" className="fui-Spinner__Progressbar">
      <circle className="fui-Spinner__Track" />
      <circle className="fui-Spinner__Tail" />
    </svg>
  </span>
</span>
```

## Migration

See [MIGRATION.md]().

## Behaviors

### States

- **Display** - The Spinner will use the following priority:

  - Adding the `inverted` will alter the way that the Spinner is displayed.

### Interaction

The Spinner is non-interactive.

- **Keyboard** - Not keyboard focusable.
- **Mouse**

  - Click: No action

- **Touch** - Nothing

## Accessibility
