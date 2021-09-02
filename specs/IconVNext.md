# Icon Spec (Resizeable)

## Background

Currently, the `@fluentui/reac-icons` package ships out different sized icons as different components. Ex: `<Person24Regular />` and `Person32Regular />` are two different icons. The reason for each icon to be shipped at different sizes is in order to make sure the icon can be pixel perfect at the sizes they are rendered in.

However, this is bad for developer ergonomics, as there is no way to resize the icons to suit the user's need.

The proposal is to add default icons based on the size 20 svg icons that are able to be dynamically sized by the user using css. This way, users who want to be able to resize will be able to, and users who want to use the sized icons will also be able to use them.

## Sample Code

```jsx
//Usage example
<PersonIcon />
```

DOM tree:

```html
<svg viewBox="0 0 20 20" width="1em" height="1em" aria-hidden="true">
  <path>...</path>
</svg>
```

```jsx
import * as React from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /** The ... */
  title?: string;
  // FUTURE: {props.title && <title>{props.title}</title>} as a child component to the svg
}

const useIconStyles = makeStyles({
  root: {
    fill: 'currentColor',
  },
});

export const useIconState = (props: IconProps) => {
  const { title } = props;
  const state = {
    xmlns: 'http://www.w3.org/2000/svg',
    ...props,
    title: undefined,
  };

  const styles = useIconStyles();

  state.className = mergeClasses(styles.root, state.className);

  if (title) {
    state['aria-label'] = title;
  }

  if (!state['aria-label'] && !state['aria-labelledby']) {
    state['aria-hidden'] = true;
  }

  return state;
};


//This is the new component that will be added to the library
export const PersonIconRegular: React.FC<IconProps> = props => (
  <svg viewBox="0 0 20 20" width="1em" height="1em" {...useIconState(props)}>
    <path>...</path>
  </svg>
);


//This is the new component that will be added to the library
export const PersonIconFilled: React.FC<IconProps> = props => (
  <svg viewBox="0 0 20 20" width="1em" height="1em" {...useIconState(props)}>
    <path>...</path>
  </svg>
);

//This is the already sized svgs
export const Person24Icon: React.FC<IconProps> = props => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...useIconState(props)}>
    <path>...</path>
  </svg>
);

//Hover functionality with bundleIcon utility
import { PersonIconRegular, PersonIconFilled, bundleIcon } from "@fluentui/react-icons"

const BundledPersonIcon = bundleIcon(PersonIconRegular, PersonIconFilled);



const useMergedIconStyles = makeStyles({
  regular: => ({
        display: 'inline',
        position: 'absolute',
        opacity: 1,
        '&:active': { opacity: 0 },
        '&:hover': { opacity: 0 },
        '&:focus': { opacity: 0 }
    }),
    fill: => ({
        position: 'absolute',
        opacity: 0,
        '&:active': { opacity: 1 },
        '&:hover': { opacity: 1 },
        '&:focus': { opacity: 1 }
    }),
})

export const useMergedIconState = (props: IconProps) => {
  const { title } = props;
  const state = {
    xmlns: 'http://www.w3.org/2000/svg',
    ...props,
    title: undefined,
  };

  if (title) {
    state['aria-label'] = title;
  }

  if (!state['aria-label'] && !state['aria-labelledby']) {
    state['aria-hidden'] = true;
  }

  return state;
};

/*
* bundleIcon should take in the two icons you would like bundled, typically a regular and filled state, and returns a
* bundled icon component with both svgs rendered and default styling to toggle between the two on different select
* states.
*/
export const bundleIcon: React.FC<IconProps> = (Icon1: JSX.Element, Icon2: JSX.Element, props) => {
  const styles = useMergedIconStyles();
  //
  const isReg = icon1.displayName ? icon1.displayName.endsWith("Regular") ? true : false : false;
  return (
    isReg ?
    <>
      <Icon1 className={mergeClasses(styles.regular, props.className)} {...useMergedIconState(props)}>
      <Icon2 className={mergeClasses(styles.fill, props.className)} {...useMergedIconState(props)}>
    <>
    :
    <>
      <Icon2 className={mergeClasses(styles.regular, props.className)} {...useMergedIconState(props)}>
      <Icon1 className={mergeClasses(styles.regular, props.className)} {...useMergedIconState(props)}>
    <>
  )
}

```

## Behaviors

- _Component States_
  - Regular State
  - Filled State
- _Interaction_
  - _Cursor_
  - _Touch_
    - An Icon that is made a link can be interacted with using touch
  - _Screen readers_
    - With a proper aria-label screen readers should be able to pick up the component in the DOM

## Accessibility

- Identify accessibility **variants**, the `role` ([ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)) of the component, its `slots` and `aria-*` props.
  - Icons need one of the following props:
    - aria-label
    - aria-labelledby
    - title
  - role needs to be set to img
  - If one of the aforementioned props are not set, aria-hidden needs to be set to true

## Discarded Possible Solutions

### Link to an external svg file using the `use` tag

This implementation leverages the [<use>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use) element, which
takes nodes from within the SVG document and duplicates them somewhere else. Using the `use` tag, you could have a set
of path variables using the [<symbol>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol) tag
defined in an external file, and then just reference the `id` of the externally defined path variable. This means there
would be one SvgIcon component that will take the name of the icon passed in, reference the external file, and render the
correct svg.

Example:

```jsx
  <svg>
    <symbol id="myPath" viewBox="0 0 20 20">
      <path>...</path>
      <title>PersonIconRegular</title>
    </symbol>
    <symbol id="myPath-1" viewBox="0 0 20 20">
      <path>...</path>
      <title>PersonIconFilled</title>
    </symbol>
    ...
  </svg>

  const SvgIcon: ReactFC<IconProps> = ({iconName, ...props})  => (
    <svg {...props}>
      <use href={iconName}>
    </svg>
  )
```

```jsx
//Sample useage
const PersonIcon = <SvgIcon iconName="myPath" />;
```

#### Pros

- In cases where several icons are rendered at once on a page, this approach would greatly reduce the render time, as
  it is not rendering a whole component everytime, but retrieving it from somewhere else
- You can add `<title>` and `<desc>` tags in the symbol, meaning accesibility is baked in
- The viewBox can be defined on the symbol, so you don't need to use it in the markup

#### Cons

- Styling will be difficult as the SVG attributes would live in the Shadow DOM, which is not directly accessible by
  CSS selectors
- Requires an extra step of making an svg with all the icons' path variable contained inside
