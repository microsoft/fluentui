# RFC: Converged component implementation pattern

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

_List contributors to the proposal here_

## Summary

<!-- Explain the proposed change -->

Tries to commit the common component pattern to writing in the repo for future reference and track improvements.

Code samples should applied to utility scripts to generate packages which will help to educate/enforce this pattern... until we want to change it :-)

## Background

<!-- If there is relevant background include it here -->

Many new engineers can find it hard to adapt to a new codebase, especially when the coding patterns and practices are fairly new and in a constant state of flux.

## Problem statement

<!--
Why are we making this change? What problem are we solving? What do we expect to gain from this?

This section is important as the motivation or problem statement is indepenent from the proposed change. Even if this RFC is not accepted this Motivation can be used for alternative solutions.

In the end, please make sure to present a neutral Problem statement, rather than one that motivates a particular solution
-->

Many new developers might have questions on the patterns that we follow to write a React component. This RFC attempts to commit and possibly improve our code patterns in writing so that there might be a reference for new (and old) members of the team.

## Detailed Design or Proposal

<!-- This is the bulk of the RFC. Explain the proposal or design in enough detail for the inteded audience to understand. -->

### Hook based architecture

Generally a component will have the following different files. Let us consider a `Sample` component, it will contain following parts:

- `Sample.tsx`
- `useSample.ts`
- `useSampleStyles.ts`
- `renderSample.tsx`
- `Sample.types.ts`

#### Sample.tsx

The 'final' product, simply forwards a ref and uses all the previous building blocks to expose the final component

```typescript
export const Sample = React.forwardRef<HTMLElement, SampleProps>((props, ref) => {
  const state = useSample(props, ref);
  useSampleStyles(state);

  return renderSample(state);
});
```

#### useSample.ts

Accepts the component props and handles the internal state that the component might need.

`State` here can be pretty broad, you could also consume context or create side effects. This hook should be what the component relies on to function/render. All state operations will mutate `draftState` object.

```typescript
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';

/**
 * Defines the different slots that can be rendered in this component
 *
 * This means that an icon can be rendered 'somewhere'
 */
export const sampleShorthandProps = ['icon'];

// Creates a helper function to merge props while respecting slot props
const mergeProps = makeMergeProps<SampleState>({ deepMerge: sampleShorthandProps });

/**
 * @parameter props -> these are normal React props for JSX components
 * @parameter ref -> In case someone wants a ref to the root DOM element
 * @parameter defaultProps -> safe default props, we set defaults internally but if consumer wants component variants with different defaults, they can set them
 */
export const useSample = (props: SampleProps, ref: React.Ref<HTMLElement>, defaultProps?: SampleProps): SampleState => {
  const resolvedRef = useMergedRefs(ref, React.useRef());

  // merges the props we declare internally and what is passed in
  // by a consumer
  const state = mergeProps(
    {
      // This is essentially shorthand for the `root` slot
      ref: resolvedRef,
      as: 'div',
      icon: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, sampleShorthandProps),
  );

  if (checkedValues || onCheckedValuesChange) {
    state.hasCheckMark = true;
  }

  // Anything else the component needs to manage its own state and render
  [someState, setSomeState] = React.useState();
  const { contextValue } = React.useContext();
  React.useEffect(...);

  // enlarge the 'uber' state
  state.someState = someState;
  state.contextValue = contextValue;

  return state;
};
```

#### useSampleStyles.ts

Hook that accepts state and applies classnames to props and any shorthand slot props to style the component and its slots.

```typescript
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { SampleState } from './Sample.types';

/**
 * Styles for the root slot
 */
export const useRootStyles = makeStyles<SampleState>([
  [
    null,
    theme => ({
      backgroundColor: theme['select']['from']['theme']['docs'],
      paddingRight: '12px',
    }),
  ],
]);

/**
 * Styles for the icon slot, uses state selectors from SampleState
 */
export const useIconStyles = makeStyles<SampleState>([
  [
    // Conditionally apply styles
    someState => someState == 1,
    () => ({
      width: '20px',
      height: '20px',
      marginRight: '9px',
    }),
  ],
]);

/**
 * Applies style classnames to slots
 */
export const useSampleStyles = (state: SampleState) => {
  const rootClassName = useRootStyles(state);
  const iconClassName = useIconStyles(state);

  // mergeClasses is a util that deduplicates classnames
  state.className = mergeClasses(rootClassName, state.className);

  if (state.icon) {
    state.icon.className = mergeClasses(iconClassName, state.icon.className);
  }
};
```

#### renderSample.tsx

Renders the correct JSX output of the component and its slots given the correct state.

This should be a pure function whose sole responsibility is to render JSX from the provided state. No state mutation or processing
should happen in this function, but rather done in the `useSample` hook

```tsx
import { getSlots } from '@fluentui/react-utilities';
import { sampleShorthandProps } from './useSample';

// state should come from `useSample` hook
export const renderSample = (state: SampleState) => {
  const { slots, slotProps } = getSlots(state, sampleShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slot.icon {...slotProps.icon} />
    </slots.root>
  );
};
```

The `state` stores all information on the slots/tags/JSX that should be rendered after processing by the relevant hook. The `getSlots` utility extracts known slot information such as tag names and props.

See below for how `state` might contain useful props for rendering.

#### Sample.types.ts

The below will probably be present in every component, other utility types are fair game if they are necessary.

```typescript
import * as React from 'react';
import { ComponentProps, ShorthandProps, ObjectShorthandProps } from '@fluentui/react-utilities';

// For a component all HTML attributes should be allowed to maximize consistencty with DOM
export interface SampleProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /** Icon slot as a shorthand */
  icon?: ShorthandProps;
}

// Component state extends props and also adds other internal state used in the lifecycle of the component
// For example for a popup component tracking an `open` state as boolean
export interface SampleState extends SampleProps {
  ref: React.MutableRefObject<HTMLElement>;

  // once a slot is process in state it can only be an object
  icon: ObjectShorthandProps;

  open: boolean;

  otherState: object;

  otherState: number;
}
```

NOTE: Currently `ComponentProp` inherits from a `GenericDictionary` that is essentially `Record<string, any>` which is essentially `any` :-(
[see this comment thread](https://github.com/microsoft/fluentui/pull/16706#discussion_r568468291)

#### Final API surface

Of the above, we expect at least the following to be exported as the three pillars of a component:

- `<Sample />` - component
- `renderSample` - render function
- `useSample` - component state hook

### Pros and Cons

#### Pros

Since there is a separation of state, render, styling into different hooks/utility functions, it can be very easy for consumers to create their own custom component variants without needing to approach the library team and accommodate their custom requirements.

It can be very easy to unit test each separate concern without too much wireframing/mocking.

#### Cons

Can be verbose, and might be too much so for simple components without lots of complex interaction.

The use of `useSampleState` to merge props and state to become one 'uber' state seems to be a break of encapsulation and can cause confusion as to what is props and what is internal state.

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
