# RFC: Replace `makeStyles()` implementation / API updates

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

@layershifter

## Summary

This RFC proposes to replace existing `makeStyles()` implementation with a new one, i.e. proposes API changes.

## Background

In [microsoft/fluentui#16082](https://github.com/microsoft/fluentui/pull/16082) we have implemented a version of `makeStyles()` that uses atomic classes. Recent work on `makeOverrides()` shows significant performance improvements [microsoft/fluentui#16923](https://github.com/microsoft/fluentui/pull/16923) (around 15%) by changes in the implementation design.

To avoid confusion, the names `makeOverrides()` and `makeStyles` are both used in this RFC. This RFC also proposes the replacement of `makeStyles` with the `makeOverrides` implementation.

## Problem statement

`makeStyles()` implementation has two problems that will cause issues at scale: matchers and missing slots. The snippet below highlights these issues:

```tsx
import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';

const useRootStyles = makeStyles<TSelectors>([
  [null, { color: 'red' }],
  [s => s.primary /* <- a matcher function, will be executed on each render */, { color: 'blue' }],
]);

const useIconStyles = makeStyles<TSelectors>([
  /* styles for each slot are defined separately */
  [null, { background: 'black' }],
  [s => s.primary, { background: 'white' }],
]);

function Component() {
  const rootClasses = useRootStyles();

  // React hooks cannot be called conditionally, https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
  // styles *must* be rendered even if they are not used in markup
  const iconClasses = useIconStyles();

  return (
    <div className={mergeClasses(rootClasses, props.className)}>
      {props.icon && <div className={mergeClasses(iconClasses, props.icon.className)} />}
    </div>
  );
}
```

To compute classnames we need to understand what styles should be applied and thus execute matchers on each render as memoization of user's input is more expensive.

This moves us to a next issue: there is no way to define styles for multiple slots/components with a single call of the `makeStyles()`. Each slot will require a separate call of `makeStyles()`. Since these calls are represented by React hooks we can't bail out even if these slots are not rendered.

_Side note:_

> Initially we have been focused on implementation of atomic CSS and merging style definitions. As a source for inspirations we have used [Facebook stylex talk](https://www.youtube.com/watch?v=9JZHodNR184):
>
> - there was nothing like [`mergeClasses()`](https://github.com/microsoft/fluentui/pull/16411) function to merge atomic classes
> - there was no contextual RTL support (parts of app can be rendered with different text directions)

## Detailed Design or Proposal

To solve these issues we made a step back to the original API of `makeStyles()` (current iteration is a second version) and as we introduced `mergeClasses()` to merge atomic classnames we explored different solutions.

Proposed API solves the problem in a "vandal" way 🪓 Matchers are moved to user's scope thus we can have all definitions in a single `makeStyles()` call => we have a single React hook. See a modified snippet below:

```tsx
import { mergeClasses, makeOverrides } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  /* 👍 no matchers, no need to execute on each render */
  root: { color: 'red' },
  rootPrimary: { color: 'blue' },

  /* 👍 styles for each slot are defined together (not a requirement) */
  icon: { background: 'black' },
  iconPrimary: { background: 'white' },
});

function Component() {
  /* 👍 a single call of React hook */
  const classes = useStyles();

  return (
    <div
      className={mergeClasses(
        classes.root /* The concept of matching is replaced with selective classname concat */,
        props.primary && classes.rootPrimary,
        props.className,
      )}
    >
      {props.icon && (
        <div className={mergeClasses(classes.icon, props.primary && classes.iconPrimary, props.icon.className)} />
      )}
    </div>
  );
}
```

### Pros and Cons

These changes result in performance improvements in `makeOveriddes`:

- matcher functions are no longer executed on each render in styling functions
- styles are executed and merged only when slots are present
- less React hooks to call for slots

Surprisingly, this also moves us closer to [CSS Modules](https://github.com/css-modules/css-modules). The same snippet with CSS Modules, for example:

```tsx
import cx from 'classnames';
import * as classes from './Component.css'; // the same styles can be written in CSS

function Component() {
  return (
    <div className={cx(classes.root, props.primary && classes.rootPrimary, props.className)}>
      {props.icon && <div className={cx(classes.icon, props.primary && classes.iconPrimary, props.icon.className)} />}
    </div>
  );
}
```

In [microsoft/fluentui#16923](https://github.com/microsoft/fluentui/pull/16923) `Avatar`, from `@fluentui/react-avatar` (check `packages/react-avatar/src/components/Avatar/useAvatarStyles.ts`), was used to validate performance improvements and explore potential issues. It is uncertain if/how these issues are critical, but there are two things that should be mentioned:

```tsx
const useStyles = makeOverrides({
  /* ... Complex apps/components can contain many definitions ... */

  rootShape20: { width: '20px', height: '20px' },
  rootShape24: { width: '24px', height: '24px' },
  rootShape28: { width: '28px', height: '28px' },
});

export const useAvatarStyles = (state: AvatarState): AvatarState => {
  const classes = useStyles();

  state.className = mergeClasses(
    classes.root,

    // 👎 Matchers have been moved to mergeClasses() calls, it looks a bit verbose
    //    (in previous implementation matchers have been close to styles)
    // 👎 It might be tricky find proper names to express definition names
    //    (we can end with "rootPrimaryCircularGhostEtc.")

    state.size === 20 && classes.rootShape20,
    state.size === 24 && classes.rootShape24,
    /* ... many selectors ... */
    state.size === 128 && classes.rootShape128,
  );

  return state;
};
```

## Discarded Solutions

NA

## Open Issues

NA
