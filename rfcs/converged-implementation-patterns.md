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

Tries to commit the common component pattern to writing in the repo for future reference and track improvements

Code samples included could possibly be applied to utility scripts to generate packages

## Background

<!-- If there is relevant background include it here -->

Many new engineers can find it hard to adapt to a new codebase, especially when the coding patterns and practices are fairly new and in a constant state of flux

## Problem statement

<!--
Why are we making this change? What problem are we solving? What do we expect to gain from this?

This section is important as the motivation or problem statement is indepenent from the proposed change. Even if this RFC is not accepted this Motivation can be used for alternative solutions.

In the end, please make sure to present a neutral Problem statement, rather than one that motivates a particular solution
-->

Many new developers might have questions on the patterns that we follow to write a React component. This RFC attempts to commit and possibbly improve our code patterns in writing so that there might be a reference for new (and old) members of the team.

## Detailed Design or Proposal

<!-- This is the bulk of the RFC. Explain the proposal or design in enough detail for the inteded audience to understand. -->

### Hook based architecture.

Generally a component will have the following different files. Let us consider a `Sample` component

- Sample.tsx
- useSample.ts
- useSampleClasses/useSampleStyles.ts
- renderSample.tsx
- Sample.types.ts

#### renderSample.tsx

renders the correct JSX output of the component and its slots given the correct state.

```typescript=
export const renderSample = (state: SampleState) => {
  const { slots, slotProps } = getSlots(state);

  return (
    <slots.root {...slotProps.root}>
      <slot.otherSlot {...slotProps.otherSlot} />
    </slots.root>
  );
};
```

#### useSample.ts

Accepts the component props and handles and internal state that the component might need.

`State` here can be pretty broad, you could also consume context or create effects. This hook should be what the component relies on to function/render

```typescript=
/**
 * Defines the different slots that can be rendered in this component
 *
 * This means that an icon can be rendered 'somewhere'
 */
export const sampleShorthandProps = ['icon'];

// Creates a helper function to merge props while respecting slot props
const mergeProps = makeMergeProps({ deepMerge: sampleShorthandProps });

/**
 * @parameter props -> these are normal React props for JSX components
 * @parameter ref -> In case someone wants a ref to the root DOM element
 * @parameter defaultProps -> safe default props
 */
export const useSample = (props: SampleProps, ref: React.Ref<HTMLElement>, defaultProps?: SampleProps) => {
  const resolvedRef = ref || React.useRef();
  const { checkedValues, onCheckedValuesChange } = useMenuListContext();

  // merges the props we declare internally and what is passed in
  // by a consumer
  const mergedProps = mergeProps(
    {
      ref: resolvedRef,
      as: 'div',
      icon: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, sampleShorthandProps),
  );

  if (checkedValues || onCheckedValuesChange) {
    mergedProps.hasCheckMark = true;
  }

  // Anything else the component needs to manage its own state and render
  [someState, setSomeState] = React.useState();
  const { contextValue } = React.useContext();
  React.useEffect(...);

  // make an 'uber' state
  const state = { someState, contextValue, ...mergedProps}

  return state;
};
```

#### useSampleClasses/useSampleStyles.ts

Hook that accepts state and applies classnames to props and any shorthand slot props to style the component and its slots

#### Sample.tsx

The 'final' product, simply forwards a ref and uses all the previous building blocks to expose the final component

```typescript=
export const Sample = React.forwardRef<HTMLElement, SampleProps>((props, ref) => {
  const state = useSample(props, ref);
  useSampleStyles(state);

  return renderSample(state);
});
```

#### Sample.types.ts

Utility types stored here

### Pros and Cons

#### Pros

Since there is a separation of state, render, styling into different hooks/utility functions, it can be very easy for consumers to create their own custom component variants without needing to approach the library team and accommodate their custom requirements

It can be very easy to unit test each separate concern without too much wireframing/mocking

#### Cons

Can be verbose, and might be too much so for simple components without lots of complex interaction

The use of `useComponentState` to merge props and state to become one 'uber' state seems to be a break of encapsulation and can cause confusion as to what is props and what is internal state.

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
