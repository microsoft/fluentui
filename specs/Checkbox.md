# Checkbox component specification

The `Checkbox` component allows a user to choose between two mutually exclusive options.

## Related variant considerations

- Toggle: should be a separate component because it has different anatomy & warrants unique themability.

- Indeterminate/Tri State: should support groups with hierarchical checkboxes where the parent checkbox can be in a mixed state if its children checkboxes aren't all checked (and if they are all checked, then the parent is checked; same if they are all unchecked, then the parent is unchecked).

## Reference implementations

https://codesandbox.io/s/checkboxes-ggpx1

Note about the Stardust example: there's some weirdness with how the theme providers are interacting with each other, the Stardust checkbox's styling is messing up as a result.

Fabric Checkbox [docs](https://developer.microsoft.com/en-us/fabric#/controls/web/Checkbox)

Stardust Checkbox [docs](https://microsoft.github.io/fluent-ui-react/components/checkbox/definition)

Open UI Checkbox [docs](https://open-ui.org/components/checkbox)

Material UI Checkbox [docs](https://material-ui.com/components/checkboxes/)

BaseUI Checkbox [docs](https://baseweb.design/components/Checkbox/)

Chakra Checkbox [docs](https://chakra-ui.com/Checkbox)

Carbon Checkbox [docs](https://www.carbondesignsystem.com/components/checkbox/code)

AntD Checkbox [docs](https://ant.design/components/checkbox/)

FastDNA Checkbox [docs](https://explore.fast.design/components/Checkbox)

## Props

> TODO: Consult the prop wizard to derive consistently defined props.

| Name | Type | Default value |
| ---- | ---- | ------------- |

### Fabric Checkbox props

https://developer.microsoft.com/en-us/fabric#/controls/web/checkbox

| Name                 | Type                                                         | Notes           |
| -------------------- | ------------------------------------------------------------ | --------------- |
| ariaDescribedBy      | string                                                       |                 |
| ariaLabel            | string                                                       |                 |
| ariaLabelledBy       | string                                                       |                 |
| ariaPositionInset    | number                                                       |                 |
| ariaSetSize          | number                                                       |                 |
| boxSide              | 'start' or 'end'                                             | default 'start' |
| checked              | boolean                                                      |                 |
| checkmarkIconProps   | IIconProps                                                   |                 |
| className            | string                                                       |                 |
| componentRef         | IRefObject<ICheckbox>                                        |                 |
| defaultChecked       | boolean                                                      |                 |
| defaultIndeterminate | boolean                                                      |                 |
| disabled             | boolean                                                      |                 |
| indeterminate        | boolean                                                      |                 |
| inputProps           | React.ButtonHTMLAttributes<HTMLElement or HTMLButtonElement> |                 |
| keytipProps          | IKeytipProps                                                 |                 |
| label                | string                                                       |                 |
| onChange             | (ev, checked) => void                                        |                 |
| onRenderLabel        | IRenderFunction<ICheckboxProps>                              |                 |
| styles               | IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles> |                 |
| theme                | ITheme                                                       |                 |

### Stardust Checkbox props

| Name           | Type                      | Notes                 |
| -------------- | ------------------------- | --------------------- |
| accessibility  | Accessibility             |                       |
| animation      | AnimationProp             |                       |
| as             | React.ElementType         | default type is "div" |
| checked        | boolean                   | default false         |
| className      | string                    |                       |
| defaultChecked | boolean                   | default false         |
| design         | ComponentDesign           |                       |
| disabled       | boolean                   | default false         |
| icon           | ShorthandValue<IconProps> | {}                    |
| label          | ShorthandValue<IconProps> |                       |
| labelPosition  | enum (Values: start, end) | "end"                 |
| onChange       | ComponentEventHandler     |                       |
| onClick        | ComponentEventHandler     |                       |
| styles         | ComponentSlotStyle        |                       |
| toggle         | boolean                   | default false         |
| variables      | any                       |                       |

### Differences of Fabric/Stardust to resolve

| Name                 | Type                                                         | Notes                                                             |
| -------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| accessibility        | Accessibility                                                |                                                                   |
| animation            | AnimationProp                                                |                                                                   |
| as                   | React.ElementType                                            | default type is "div"                                             |
| ariaDescribedBy      | string                                                       |                                                                   |
| ariaLabel            | string                                                       |                                                                   |
| ariaLabelledBy       | string                                                       |                                                                   |
| ariaPositionInSet    | number                                                       | if checkbox is in a set, should be up to the user to provide a11y |
| ariaSetSize          | number                                                       |                                                                   |
| boxSide              | 'start' or 'end'                                             | default 'start'                                                   |
| checkmarkIconProps   | IIconProps                                                   |                                                                   |
| componentRef         | IRefObject<ICheckbox>                                        |                                                                   |
| defaultIndeterminate | boolean                                                      |                                                                   |
| indeterminate        | boolean                                                      |                                                                   |
| inputProps           | React.ButtonHTMLAttributes<HTMLElement or HTMLButtonElement> |                                                                   |
| keytipProps          | IKeytipProps                                                 |                                                                   |
| labelPosition        | enum (Values: start, end)                                    | "end"                                                             |
| onRenderLabel        | IRenderFunction<ICheckboxProps>                              |                                                                   |
| onClick              | ComponentEventHandler                                        |                                                                   |
| theme                | ITheme                                                       |                                                                   |
| toggle               | boolean                                                      | default false                                                     |
| variables            | any                                                          |                                                                   |

### Recommended props

| Name            | Type                                |
| --------------- | ----------------------------------- |
| ariaDescribedBy | string                              |
| ariaLabel       | string                              |
| ariaLabelledBy  | string                              |
| as              | keyof JSX.IntrinsicElements         |
| checked         | boolean \| 'mixed'                  |
| className       | string                              |
| defaultChecked  | boolean                             |
| disabled        | boolean                             |
| label           | string                              |
| name            | string                              |
| onChange        | (ev: Event, value: boolean) => void |
| labelPosition   | start or end                        |

Note: rtl, styles, and theme come from compose or the ThemeProvider. And name has been added to support checkbox in form scenarios.

Removing the following two props because the ARIA spec dictates role='checkbox' doesn't need aria-posinset and aria-setsize. These are only valid for role='option' which is only in the case the checkbox is a part of a listbox, which is not something we need to account for in the base component API. If the user does need to provide these two props, slotProps could be used to apply additional props to any slot.

| Name              | Concern                                                           |
| ----------------- | ----------------------------------------------------------------- |
| ariaPositionInset | if checkbox is in a set, should be up to the user to provide a11y |
| ariaSetSize       | same as above                                                     |

### Conversion process from Fabric 7 to Fluent UI Checkbox

#### Fluent Checkbox recommended props interface

| Name                 | To transition or not? | Property transitioned? | Breaking change? | Codemod/Shim created? |
| -------------------- | --------------------- | :--------------------: | :--------------: | :-------------------: |
| `ariaDescribedBy`    | User provided         |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `ariaLabel`          | User provided         |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `ariaLabelledBy`     | User provided         |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `ariaPositionInSet`  | Won't be transitioned |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `ariaSetSize`        | Won't be transitioned |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `boxSide`            | No; labelPosition     |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `checked`            | Yes - native          |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `checkmarkIconProps` | No                    |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `className`          | Yes - native          |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `defaultChecked`     | Yes - native          |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `disabled`           | Yes - native          |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `keytipProps`        | Yes - redesign        |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `label`              | Yes - native          |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `onChange`           | Yes - native          |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `onRenderLabel`      | No; shorthand         |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `styles`             | TBD                   |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `theme`              | TBD                   |        &#x274C;        |     &#x274C;     |       &#x274C;        |

Props being removed:

ariaPositionInSet and ariaSetSize - when writing parent component, user should set these on the checkbox.

## Slots

| Name  | Considerations                                        |
| ----- | ----------------------------------------------------- |
| root  | label                                                 |
| input | actual checkbox element - what gets checked/unchecked |
| icon  | visual checkmark, sideways if indeterminate           |
| box   | wraps input & icon - what actual gets the styling     |

TODO: indeterminate state icon - need consensus on what this should look like

## DOM structure

General considerations:

Only use as toggle between two mutually exclusive options (binary) or in a group with shared context to offer multiple options.

Uncontrolled vs. controlled: implemented in the prototype already through useControlledState React hook.
Indeterminate state: When children checkboxes aren't checked, don't check parent checkbox.

Could consider supporting an invalid state/error state but this might just be supported via styling that's passed in by the user and done through compose.

### Recommended DOM

```html
<label class="checkbox-root">
  <div class="box">
    <input class="checkbox" role="checkbox" aria-checked"false" aria-label="Fluent checkbox">
    <i class="icon"></i>
  </div>
</label>
```

### Fabric Checkbox example DOM

```html
<div class="ms-Checkbox-checkbox">
  <input
    type="checkbox"
    class="input-226"
    id="checkbox-268"
    aria-label="Unchecked checkbox (uncontrolled)"
    aria-checked="false"
  />
  <label class="ms-Checkbox-label label-227" for="checkbox-268">
    <div class="ms-Checkbox-checkbox checkbox-228">
      <i data-icon-name="CheckMark" aria-hidden="true" class="ms-Checkbox-checkmark checkmark-231"> </i>
    </div>
    <span aria-hidden="true" class="ms-Checkbox-text text-230">Unchecked checkbox (uncontrolled)</span>
  </label>
</div>
```

### Stardust Checkbox example DOM

```html
<div
  class="ui-checkbox dd ol om gz de nb on cd oo op cb oq ha hb hc hd he hf hg hh hi hj hk hl hm hn ho hp or os ot ou hu hv hw hx ov ow ox oy ic id ie if ig ih ii ij ik il im oz pa pb pc ir is it iu pd pe pf pg lu ph pi pj pk"
  aria-checked="false"
  role="checkbox"
  tabindex="0"
>
  <span
    class="ui-icon ck cb ca jm pl pm pn po pp pq pr ba bb bc bd do dp jy jz ps pt pu pv pw px gu jo gw py pz qa qb ui-checkbox__indicator"
    role="img"
    aria-hidden="true"
  >
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" class="cz ql qm da cw">
      <g>
        <path
          class="ui-icon__outline cy"
          d="M14.3 21.3c-.1 0-.3 0-.4-.1l-4.8-4.8c-.2-.2-.2-.5 0-.7s.5-.2.7 0l4.4 4.4 7.9-7.9c.2-.2.5-.2.7 0s.2.5 0 .7l-8.3 8.3s-.1.1-.2.1z"
        ></path>
        <path
          class="ui-icon__filled"
          d="M23.5 11.875a.968.968 0 0 1-.289.711l-8.25 8.25c-.192.193-.43.289-.711.289s-.519-.096-.711-.289l-4.75-4.75a.965.965 0 0 1-.289-.711c0-.125.027-.25.082-.375s.129-.234.223-.328a.953.953 0 0 1 .695-.297c.135 0 .266.025.391.074.125.05.231.121.32.215l4.039 4.047 7.539-7.547a.886.886 0 0 1 .32-.215c.125-.049.255-.074.391-.074a1.004 1.004 0 0 1 .922.625.97.97 0 0 1 .078.375z"
        ></path>
      </g>
    </svg>
  </span>
  <span class="ui-text cz qk ui-checkbox__label" dir="auto">Make my profile visible</span>
</div>
```

### MUI Checkbox example DOM

```html
<label class="MuiFormControlLabel-root">
  <span
    class="MuiButtonBase-root MuiIconButton-root jss264 MuiCheckbox-root MuiCheckbox-colorSecondary jss265 Mui-checked MuiIconButton-colorSecondary"
    aria-disabled="false"
  >
    <span class="MuiIconButton-label">
      <input type="checkbox" class="jss267" value="checkedA" data-indeterminate="false" checked="" />
      <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
        <path
          d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        ></path>
      </svg>
    </span>
    <span class="MuiTouchRipple-root"></span>
  </span>
  <span class="MuiTypography-root MuiFormControlLabel-label MuiTypography-body1">Secondary</span>
</label>
```

### Behaviors

Aria spec: https://www.w3.org/TR/wai-aria-practices-1.1/#checkbox
https://www.w3.org/TR/wai-aria-practices/#checkbox

Fluent UI HIG: https://microsoft.sharepoint-df.com/:w:/t/OPGUXLeads/EbBiGJ-gLPFGszdhSxb8X5IBFik0ax7wZLJc8FlDXOwDYA?e=Cy4Er3

### Disabled state

Use `aria-disabled`. Screenreaders should let users know of the existence of the checkbox but it should be read-only. Ignore all events & no change to `checked` value allowed.

### Checked state

`aria-checked` indicates whether element is checked (`true`) or unchecked (`false`) but can also be `mixed` which represents a tri-state (indeterminate) input in a situation with a group of other elements that have a mixture of checked and unchecked values.

### Indeterminate state

Mixed state checkbox represents a checkbox that can support a partially checked state. If none of the checkboxes in a set are checked, the mixed state checkbox isn't checked (and if all are checked then so is the mixed state) but if the set contains a mix of checked and unchecked boxes, then the tri-state is appropriate so `aria-checked` will be set to `mixed`. Here's an example: https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-2/checkbox-2.html

### Focus indicators

Focus indicators should not show in mouse or touch interaction; they should only appear when keyboard tabbing/directional keystrokes are pressed, and should disappear when mouse/touch interactions occur.

### Keyboarding

| Key   | Description                                            |
| ----- | ------------------------------------------------------ |
| Tab   | Moves keyboard focus to the checkbox.                  |
| Space | Toggles checkbox between checked and unchecked states. |

### Mouse input

- `mouseenter` should change the styling of checkbox to hovered state (preview what it looks like to be toggled but not full styling - checkmark, but not background color for example as in current Fabric 7 checkbox).
- `mouseleave` should change the styling of checkbox back to non-hovered state (so remove the preview of checked state)
- `mousedown` toggle state
- `mouseup` apply styling of new state

### Touch

Same behavior as above except no preview of toggled state through hover.

### Screenreader accessibility:

#### `Fluent UI & Fluent UI Northstar comparison`:

From accessibility point of view the main difference is in type of element used for Checkbox itself:

- Fluent UI has `<input>` element with type="checkbox"
- Fluent UI Northstar has `<div>` element with role="checkbox"

  [Verification with screen reader](https://jurokapsiar.github.io/open-a11y/components/checkbox.research) doesn't show any differences between these two approaches, everything was working as expected.

#### `Accessibility variants`:

- two-state checkbox
- tri-state checkbox
- disabled

#### `root`:

- should render the native element using the `as` prop, defaulting to `div`
- should mix in native props expected for the element type defined in `as`.

Input slot:

- receives `aria-checked` representing checkbox state
- receives `aria-disabled="true"` representing disabled checkbox

A visible label referenced by the value of `aria-labelledby` (id of element containing the label) set on the element with role `checkbox`.
If there's additional static text representing that is descriptive, `aria-describedby` should be set to id of element containing the description.
`aria-label` set on the element with role `checkbox`.

### Accessibility concerns for the user

`aria-label`, `aria-labelledby`: Describe what is the purpose of the checkbox, latter points to id of element with former.

### Themability and customization

Both Fluent and Teams themes and other custom themes will be made with compose and the design tokens specified below. Screenshots of themed variants will be posted here soon after that work is done like the example code below.

The `Checkbox` uses `react-texture` to provide a recomposable implementation that has no runtime performance penalties. The `BaseCheckbox` implementation can be used to provide new `slots` and default `props`:

```tsx
const FooCheckbox = BaseCheckbox.compose({
  tokens: {},
  styles: {},
  slots: {}
});

render() {
  <FooCheckbox defaultChecked={true} onChange={console.log("checkbox clicked!")}>
    This renders as a checkbox
  </FooCheckbox >
}
```

### Composition

TBD

### Component design tokens

> Tokens represent the general look and feel of the various visual slots. Tokens feed into the styling at the right times in the right slot.
>
> Regarding naming conventions, use a camelCased name following this format:
> `{slot}{property}{state (or none for default)}`. For example: `labelSizeHovered`.
>
> Common property names: `size`, `background`, `color`, `borderRadius`
>
> Common states: `hovered`, `pressed`, `focused`, `checked`, `checkedHovered`, `disabled`

| Name               | Considerations |
| ------------------ | -------------- |
| boxBorderColor     |                |
| boxBorderRadius    |                |
| boxBorderWidth     |                |
| boxColor           |                |
| boxColorDisabled   |                |
| boxColorFocused    |                |
| boxColorHovered    |                |
| boxColorPressed    |                |
| boxSize            |                |
| labelColor         |                |
| labelColorDisabled |                |
| labelColorFocused  |                |
| labelColorHovered  |                |
| labelColorPressed  |                |
| labelSize          |                |
| iconColor          |                |
| iconColorDisabled  |                |
| iconColorFocused   |                |
| iconColorHovered   |                |
| iconColorPressed   |                |
| iconSize           |                |

NOTE! Stardust does not follow this convention. Their Checkbox currently uses these tokens:

```
background: string
disabledBackground: string
disabledBackgroundChecked: string
toggleBackground: string
toggleBorderColor: string
toggleIndicatorColor: string
toggleIndicatorSize: string
checkedBackground: string
checkedBorderColor: string
checkedBackgroundHover: string
checkedIndicatorColor: string
checkboxCheckedColor: string
checkboxToggleCheckedBackground: string
disabledToggleBackground: string
gap: string
borderColor: string
borderColorHover: string
checkboxColor: string
checkboxToggleCheckedBorderColor: string
checkedTextColor: string
disabledColor: string
disabledBorderColor: string
disabledToggleBorderColor: string
disabledCheckboxColor: string
disabledToggleIndicatorColor: string
disabledCheckedIndicatorColor: string
textColor: string
textColorHover: string
indicatorColor: string
```

## Considerations for different screen sizes

Won't really look or behave differently in context of different phone/tablet/desktop sizes - as in different sizes would not cause this component to look or behave differently.

## Use cases

The `Checkbox` component may be used within a `Form` component by providing the name prop to indicate the name of the input element to be fed into the form action. Example: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox

## Compatibility with other libraries

> TODO: If this component represents a selected value, how will that be used in an HTML form? Is there a code example to illustrate?

> TODO: Is it possible this component could be rendered in a focus zone? If so, should the focus model change in that case?
