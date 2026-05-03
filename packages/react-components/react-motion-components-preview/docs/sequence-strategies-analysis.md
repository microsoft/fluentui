# Motion Sequence Strategies Analysis

**Date:** January 1, 2026
**Branch:** `feat/sequence`
**Status:** WIP - Code Review

## Overview

This document analyzes three distinct strategies being explored for defining motion sequences using React tags. The goal is to enable developers to compose sequential animations declaratively.

---

## Strategy 1: Declarative `<Sequence>` Component (Direct JSX Children)

### Implementation

The `Sequence` component accepts motion components as direct children, each with its own content.

**Location:** [Sequence.tsx](../library/src/choreography/Sequence/Sequence.tsx)

### Usage Example

From [SequenceDefault.stories.tsx](../stories/src/choreography/Sequence/SequenceDefault.stories.tsx):

```tsx
<Sequence iterations="infinite">
  <Blur.In duration={duration}>
    <div style={{ backgroundColor: 'red', width: '100px', height: '100px' }} />
  </Blur.In>
  <Blur.Out duration={duration}>
    <div style={{ backgroundColor: 'red', width: '100px', height: '100px' }} />
  </Blur.Out>
  <Blur.In duration={duration}>
    <div style={{ backgroundColor: 'blue', width: '100px', height: '100px' }} />
  </Blur.In>
  <Blur.Out duration={duration}>
    <div style={{ backgroundColor: 'blue', width: '100px', height: '100px' }} />
  </Blur.Out>
</Sequence>
```

### How It Works

1. `Sequence` receives motion components as children
2. Uses `getSequenceChildMapping()` to map and order children by index
3. Renders only the current child based on `currentIndex` state
4. Passes `onMotionFinish` callback to coordinate transitions
5. Advances to next child when current motion completes

### Pros

✅ **Most declarative and readable** - Pure JSX composition
✅ **Familiar React pattern** - Nested children feel natural
✅ **Each step explicit** - Motion and content defined together
✅ **Flexible content per step** - Different content for each motion phase

### Cons

❌ **Content duplication** - Same content must be repeated across steps
❌ **No content reuse** - Can't easily share content between In/Hold/Out
❌ **Verbose for simple patterns** - Enter→Hold→Exit requires 3+ children
❌ **Less efficient** - Each motion gets its own child instance

### Best Use Cases

- One-off sequences where each step has genuinely different content
- Slideshow-style animations with distinct slides
- Complex sequences where each phase needs unique elements

---

## Strategy 2: Factory `createSequenceComponent()` with Motions Array

### Implementation

Factory function that creates a sequence component from an array of motion elements. The returned component accepts a single child that flows through all motions.

**Location:** [Sequence.tsx:35-58](../library/src/choreography/Sequence/Sequence.tsx#L35-L58)

### Usage Example

From [CarouselStep4.stories.tsx](../stories/src/CarouselInSteps/CarouselStep4.stories.tsx):

```tsx
const TitleSequence = createSequenceComponent({
  motions: [
    <Slide.In fromY="-100px" duration={400} easing={motionTokens.curveDecelerateMin} />,
    <Hold duration={1200} />,
    <Slide.Out fromY="100px" duration={400} easing={motionTokens.curveAccelerateMin} />,
  ],
});

// Usage: single child flows through all motions
<TitleSequence>{titleA}</TitleSequence>;
```

### How It Works

1. Factory accepts array of motion elements (without children)
2. Returns a component that clones each motion element with the provided child
3. Wraps everything in a `<Sequence>` component
4. Child content is injected into each motion step automatically

### Pros

✅ **Child content passed once** - DRY principle for shared content
✅ **Clean separation** - Motion definition separate from content
✅ **Reusable motion patterns** - Define once, use many times
✅ **Good for common patterns** - Enter→Hold→Exit is concise
✅ **Type-safe motion definitions** - Motion props are checked at creation

### Cons

❌ **Less discoverable API** - Factory pattern less obvious than JSX
❌ **Unusual JSX pattern** - Motion elements without children feels odd
❌ **Loose type safety** - `MotionEntry` uses `any` types
❌ **Two-step definition** - Create factory, then use component
❌ **Limited flexibility** - Hard to have different content per step

### Best Use Cases

- Reusable animation patterns (enter→hold→exit)
- Same content needs different motion phases
- Library of standard transition patterns
- Title cards, badges, notifications with predictable motion

---

## Strategy 3: `<Presence>` Pattern with Enter/Exit Elements

### Implementation

Component that accepts `enter` and `exit` motion elements as props, switching based on `visible` state.

**Location:** [CarouselStep4.stories.tsx:227-235](../stories/src/CarouselInSteps/CarouselStep4.stories.tsx#L227-L235)

### Usage Example

```tsx
<Presence
  visible={itemVisible}
  enter={<Slide.In fromY="-100px" duration={400} easing={motionTokens.curveDecelerateMin} />}
  exit={<Slide.Out fromY="100px" duration={400} easing={motionTokens.curveAccelerateMin} />}
>
  {titleA}
</Presence>
```

### How It Works

1. Takes `visible` boolean prop
2. Clones `enter` element with children when `visible=true`
3. Clones `exit` element with children when `visible=false`
4. Simple ternary selection between two states

### Pros

✅ **Explicit enter/exit semantics** - Clear intention
✅ **State-driven** - React to visibility changes
✅ **Simple binary transitions** - Good for show/hide
✅ **Familiar pattern** - Like other presence libraries

### Cons

❌ **Not a true "sequence"** - Only handles binary state, not multi-step
❌ **API confusion** - Overlaps with existing `createPresenceComponent`
❌ **Limited scope** - Can't handle hold phases or 3+ step sequences
❌ **State management burden** - Requires external state for visibility
❌ **No automatic progression** - Doesn't advance through steps automatically

### Best Use Cases

- Show/hide toggles with motion
- Modal enter/exit transitions
- Conditional rendering with animation
- State-driven visibility changes

**Note:** This pattern is fundamentally different from the sequence concept and may not belong in this analysis. It's more of a presence/transition pattern.

---

## Issues & Bugs Identified

### 1. Type Safety: Loose `MotionEntry` Type

**Location:** [Sequence.tsx:35](../library/src/choreography/Sequence/Sequence.tsx#L35)

```tsx
type MotionEntry = React.ComponentType<any> | React.ReactElement | null | undefined;
```

**Problem:** The `any` type bypasses type checking. Motion components should be constrained to types that accept `onMotionFinish` and `children` props.

**Recommendation:**

```tsx
type MotionComponentProps = {
  children?: React.ReactNode;
  onMotionFinish?: () => void;
};

type MotionEntry =
  | React.ComponentType<MotionComponentProps>
  | React.ReactElement<MotionComponentProps>
  | null
  | undefined;
```

---

### 2. Iterations Type Mismatch

**Location:** [SequenceDefault.stories.tsx:61](../stories/src/choreography/Sequence/SequenceDefault.stories.tsx#L61)

```tsx
<Sequence iterations="infinite">  // ❌ String literal
```

**Type Definition:** [sequence-types.ts:15](../library/src/choreography/Sequence/sequence-types.ts#L15)

```tsx
iterations?: EffectTiming['iterations'];  // number | undefined
```

**Problem:** `EffectTiming['iterations']` is `number | undefined`, but code uses string `"infinite"`.

**Options:**

1. Use `Infinity` (the number) instead of `"infinite"`
2. Expand type to: `iterations?: EffectTiming['iterations'] | 'infinite'`
3. Handle string conversion in component

**Recommendation:** Use `Infinity` for consistency with Web Animations API:

```tsx
<Sequence iterations={Infinity}>
```

---

### 3. Hold Callback Stability

**Location:** [Sequence.tsx:73-84](../library/src/choreography/Sequence/Sequence.tsx#L73-L84)

```tsx
React.useEffect(() => {
  setTimeout(() => {
    handleMotionFinish();
  }, duration);

  return () => {
    clearTimeout();
  };
}, [duration, handleMotionFinish, setTimeout, clearTimeout]);
```

**Problem:** `duration` in deps array causes timer restart on duration changes. This may be intentional but could cause unexpected behavior if duration changes mid-hold.

**Recommendation:** Document this behavior or remove `duration` from deps if it should only initialize once per mount.

---

### 4. React Key Warning Risk

**Location:** [Sequence.tsx:47](../library/src/choreography/Sequence/Sequence.tsx#L47)

```tsx
const key = TheMotion.key ?? index;
return React.cloneElement(TheMotion, { key }, children);
```

**Problem:** When `TheMotion.key` is null, falling back to `index` can cause React reconciliation issues when sequences loop (iterations > 1). Index-based keys are problematic when list order changes or items are added/removed between iterations.

**Recommendation:** Generate stable keys:

```tsx
const key = TheMotion.key ?? `motion-${index}`;
```

---

### 5. Scene Alias is Confusing

**Location:** [Sequence.tsx:87](../library/src/choreography/Sequence/Sequence.tsx#L87)

```tsx
export const Scene = Hold;
```

**Problem:** Naming suggests a container for multiple parallel elements, but `Hold` is just a timing primitive. The alias creates API confusion.

**Options:**

1. Remove alias entirely
2. Rename to `Pause` or `Wait` if you want an alias
3. Create actual `Scene` component that supports parallel children during a hold

**Recommendation:** If keeping the alias, document clearly:

```tsx
/**
 * Alias for Hold. Pauses sequence progression for specified duration.
 * Use when thinking of a "scene" as a timed pause between motions.
 */
export const Scene = Hold;
```

Or better, create a real Scene component:

```tsx
export const Scene: React.FC<SceneProps> = ({ duration, children, onMotionFinish }) => {
  // Render children in parallel for the duration
  return (
    <Hold duration={duration} onMotionFinish={onMotionFinish}>
      {children}
    </Hold>
  );
};
```

---

### 6. Children Optional but Not Handled

**Location:** [createMotionComponent.ts change](../../../react-motion/library/src/factories/createMotionComponent.ts)

```tsx
- children: JSXElement;
+ children?: JSXElement;
```

**Problem:** Making children optional is good for `<Hold>`, but motion components that render children should handle undefined case.

**Recommendation:** Add runtime checks where children are expected:

```tsx
if (!children) return null;
```

---

## Alternative Strategy Proposals

### Strategy A: Timeline-Based Declarative API

Inspired by GSAP Timeline and Framer Motion:

```tsx
<Timeline duration={3000}>
  <At time={0}>
    <Slide.In duration={400}>{title}</Slide.In>
  </At>
  <At time={400} duration={1200}>
    {title}
  </At>
  <At time={1600}>
    <Slide.Out duration={400}>{title}</Slide.Out>
  </At>
</Timeline>
```

**Pros:**

- Explicit timing control
- Supports overlapping animations
- Familiar from animation libraries
- Clear relationship between timing and content

**Cons:**

- More complex implementation
- Requires timeline state management
- Mental overhead of calculating times

---

### Strategy B: Motion Composition with Shared Target

Separate content from motion sequence:

```tsx
<MotionTarget>
  {ref => (
    <>
      <div ref={ref}>{content}</div>
      <MotionSequence target={ref}>
        <Slide.In duration={400} />
        <Hold duration={1200} />
        <Slide.Out duration={400} />
      </MotionSequence>
    </>
  )}
</MotionTarget>
```

**Pros:**

- Clear separation of content and motion
- Content rendered once
- Motion as side effect
- Efficient re-renders

**Cons:**

- More complex API
- Ref management required
- Less declarative

---

### Strategy C: Functional Composition Pattern

Leverage existing factory pattern more functionally:

```tsx
const TitleMotion = composeSequence(
  Slide.In.with({ fromY: '-100px', duration: 400 }),
  Hold.with({ duration: 1200 }),
  Slide.Out.with({ fromY: '100px', duration: 400 }),
);

<TitleMotion>{titleA}</TitleMotion>;
```

**Pros:**

- Functional and composable
- Aligns with `createMotionComponent` pattern
- Good TypeScript support potential
- Reusable motion definitions

**Cons:**

- Requires adding `.with()` method to motion components
- More API surface to learn
- Less discoverable than JSX

---

### Strategy D: Motion Atoms with `createSequenceComponent`

An alternate or overloaded version of `createSequenceComponent` that accepts motion atoms instead of React elements.

**Current atom architecture:**

Motion atoms are low-level animation definitions that return `AtomMotion` objects:

```typescript
type AtomMotion = {
  keyframes: Keyframe[];
  duration: number;
  easing?: string;
  delay?: number;
  // ... other KeyframeEffectOptions
};

// Example atom
const slideAtom = ({ direction, duration, fromY, toY, easing }: SlideAtomParams): AtomMotion => ({
  keyframes: [{ translate: `0px ${fromY}` }, { translate: `0px ${toY}` }],
  duration,
  easing,
});
```

**Proposed API:**

```tsx
// Option 1: Array of atoms
const TitleSequence = createSequenceComponent({
  atoms: [
    slideAtom({ direction: 'enter', fromY: '-100px', duration: 400, easing: motionTokens.curveDecelerateMin }),
    { duration: 1200 }, // Hold can be just a duration object
    slideAtom({ direction: 'exit', fromY: '100px', duration: 400, easing: motionTokens.curveAccelerateMin }),
  ],
});

// Option 2: Factory function that returns atoms
const TitleSequence = createSequenceComponent({
  atoms: element => [
    slideAtom({ direction: 'enter', fromY: '-100px', duration: 400, easing: motionTokens.curveDecelerateMin }),
    { duration: 1200 },
    slideAtom({ direction: 'exit', fromY: '100px', duration: 400, easing: motionTokens.curveAccelerateMin }),
  ],
});

// Option 3: Named sequence builders
const TitleSequence = createSequenceComponent.fromAtoms([
  slideAtom({ direction: 'enter', fromY: '-100px', duration: 400, easing: motionTokens.curveDecelerateMin }),
  { duration: 1200 },
  slideAtom({ direction: 'exit', fromY: '100px', duration: 400, easing: motionTokens.curveAccelerateMin }),
]);

// Usage remains the same
<TitleSequence>{titleA}</TitleSequence>;
```

**Implementation strategy:**

```tsx
interface SequenceAtomEntry {
  atom?: AtomMotion;
  duration?: number; // For hold/pause steps
}

export const createSequenceComponent = ({
  motions,
  atoms,
}: {
  motions?: MotionEntry[];
  atoms?: (AtomMotion | { duration: number })[];
}): React.FC<React.PropsWithChildren<{}>> => {
  if (atoms) {
    // Convert atoms to motion components
    const motionComponents = atoms.map((atomOrDuration, index) => {
      if ('duration' in atomOrDuration && !('keyframes' in atomOrDuration)) {
        // It's a hold duration
        return <Hold key={index} duration={atomOrDuration.duration} />;
      }

      // It's an AtomMotion - convert to motion component
      const atom = atomOrDuration as AtomMotion;
      const MotionComp = createMotionComponent(() => atom);
      return <MotionComp key={index} />;
    });

    return ({ children }) => (
      <Sequence>
        {motionComponents.map((motion, index) => React.cloneElement(motion, { key: index }, children))}
      </Sequence>
    );
  }

  // Fall back to existing motions implementation
  // ... existing code
};
```

**Pros:**

✅ **Lower-level control** - Direct access to animation primitives
✅ **No JSX in factory** - More natural for programmatic generation
✅ **Composable atoms** - Can build complex motions from simple atoms
✅ **Better for dynamic sequences** - Easier to compute/generate atom arrays
✅ **Consistent with motion architecture** - Atoms are the foundation of the motion system
✅ **Type-safe atom parameters** - Atom functions have well-defined types
✅ **Serializable definitions** - Atoms are plain objects, easier to store/transmit
✅ **Performance potential** - Could optimize by pre-computing animations

**Cons:**

❌ **Less discoverable** - Developers must know about atoms layer
❌ **More verbose** - Atom function calls vs JSX components
❌ **Lost component benefits** - No prop spreading, defaults, or component lifecycle
❌ **Hold as special case** - Need convention for pauses (plain duration object?)
❌ **Two parallel APIs** - Creates choice paralysis between atoms and motions
❌ **Conversion overhead** - Must convert atoms to components internally
❌ **Lost motion component features** - Props like `visible`, `unmount` behavior, etc.

**Hybrid approach:**

Support both APIs via overload or separate methods:

```tsx
// Type overloads
function createSequenceComponent(config: { motions: MotionEntry[] }): React.FC<...>;
function createSequenceComponent(config: { atoms: AtomSequenceEntry[] }): React.FC<...>;

// Or separate factories
createSequenceComponent.fromMotions([...])
createSequenceComponent.fromAtoms([...])

// Or separate function names
createSequenceFromMotions([...])
createSequenceFromAtoms([...])
```

**Best Use Cases for Atoms Approach:**

- Programmatically generated sequences (data-driven animations)
- Sequences computed from user input or state
- Performance-critical sequences (pre-compute atoms)
- Sequences that need serialization (save/load animation definitions)
- Lower-level animation control (fine-tuning keyframes)
- Integration with external animation data formats

**Comparison with JSX motions:**

| Aspect               | JSX Motions | Motion Atoms |
| -------------------- | ----------- | ------------ |
| **Readability**      | ⭐⭐⭐⭐⭐  | ⭐⭐⭐       |
| **Type Safety**      | ⭐⭐⭐⭐    | ⭐⭐⭐⭐⭐   |
| **Discoverability**  | ⭐⭐⭐⭐⭐  | ⭐⭐         |
| **Programmatic Use** | ⭐⭐        | ⭐⭐⭐⭐⭐   |
| **Performance**      | ⭐⭐⭐      | ⭐⭐⭐⭐⭐   |
| **Flexibility**      | ⭐⭐⭐⭐    | ⭐⭐⭐⭐⭐   |
| **Learning Curve**   | ⭐⭐⭐⭐⭐  | ⭐⭐⭐       |
| **Consistency**      | ⭐⭐⭐⭐⭐  | ⭐⭐⭐⭐⭐   |

**Recommendation:**

1. **Add atoms support as an advanced API** - Keep JSX motions as primary, add atoms for power users
2. **Use separate method** - `createSequenceComponent.fromAtoms()` to avoid confusion
3. **Document clearly** - Explain when to use atoms vs motions
4. **Provide conversion utilities** - Helper to convert atoms to motion components
5. **Consider unified type** - Internal representation could use atoms regardless of input

**Example unified implementation:**

```tsx
type SequenceStep =
  | { type: 'motion'; element: React.ReactElement }
  | { type: 'atom'; atom: AtomMotion }
  | { type: 'hold'; duration: number };

const createSequenceComponent = {
  // Primary API with JSX
  fromMotions: (motions: React.ReactElement[]) => {
    const steps: SequenceStep[] = motions.map(el => ({ type: 'motion', element: el }));
    return createSequenceRunner(steps);
  },

  // Advanced API with atoms
  fromAtoms: (atoms: (AtomMotion | { duration: number })[]) => {
    const steps: SequenceStep[] = atoms.map(entry =>
      'keyframes' in entry ? { type: 'atom', atom: entry } : { type: 'hold', duration: entry.duration },
    );
    return createSequenceRunner(steps);
  },
};
```

This approach provides flexibility while maintaining clear API boundaries between the declarative JSX approach and the programmatic atoms approach.

---

### Strategy E: Hooks-Based Sequence Control

Use hooks to control sequence programmatically:

```tsx
const { currentStep, advanceStep } = useSequence({
  steps: ['enter', 'hold', 'exit'],
  iterations: Infinity,
});

return (
  <>
    {currentStep === 'enter' && <Slide.In onMotionFinish={advanceStep}>{content}</Slide.In>}
    {currentStep === 'hold' && (
      <Hold duration={1200} onMotionFinish={advanceStep}>
        {content}
      </Hold>
    )}
    {currentStep === 'exit' && <Slide.Out onMotionFinish={advanceStep}>{content}</Slide.Out>}
  </>
);
```

**Pros:**

- Maximum control and flexibility
- Easy to add conditional logic
- Simple implementation
- Familiar hooks pattern

**Cons:**

- Verbose
- Requires manual step management
- Conditional rendering complexity

---

## Recommendations

### Primary Recommendations

1. **Consolidate on Strategy 2** (`createSequenceComponent`) as the **primary API** for reusable sequences

   - Best ergonomics for common "enter → hold → exit" patterns
   - Promotes reusability
   - Clean separation of concerns

2. **Keep Strategy 1** (`<Sequence>` with inline children) as **secondary API** for:

   - One-off sequences
   - Different content per step
   - Complex custom sequences

3. **Drop Strategy 3** (`Presence` with enter/exit props)
   - Overlaps with existing presence APIs
   - Not actually a sequence mechanism
   - Creates confusion

### Technical Fixes Required

1. **Fix `iterations` type** to accept `number | Infinity` (remove string `"infinite"`)
2. **Strengthen `MotionEntry` types** to enforce motion component contract
3. **Generate stable keys** in `createSequenceComponent` (not index-based)
4. **Document or fix Hold duration reactivity** behavior
5. **Clarify or remove `Scene` alias**

### API Enhancements to Consider

1. **Add `commonProps` support** to pass shared props to all sequence steps:

   ```tsx
   <Sequence commonProps={{ easing: motionTokens.curveEaseMax }}>{children}</Sequence>
   ```

2. **Add sequence control imperative API**:

   ```tsx
   const sequenceRef = useRef<SequenceImperativeRef>();
   <Sequence ref={sequenceRef}>...</Sequence>;

   // Later: sequenceRef.current.next(), .pause(), .reset()
   ```

3. **Support callback on iteration complete**:

   ```tsx
   <Sequence iterations={3} onIterationComplete={(n) => console.log(`Iteration ${n} done`)}>
   ```

4. **Add delay between iterations**:

   ```tsx
   <Sequence iterations={Infinity} iterationDelay={500}>
   ```

5. **Add atoms-based API** (Strategy D):
   ```tsx
   const TitleSequence = createSequenceComponent.fromAtoms([
     slideAtom({ direction: 'enter', fromY: '-100px', duration: 400 }),
     { duration: 1200 },
     slideAtom({ direction: 'exit', fromY: '100px', duration: 400 }),
   ]);
   ```

### Documentation Needs

- Clear guide on when to use each strategy
- Examples of common patterns (enter-hold-exit, crossfade, etc.)
- Performance considerations
- Migration guide from direct motion components

---

## Comparison Matrix

| Feature              | Strategy 1: Inline JSX | Strategy 2: Factory | Strategy 3: Presence |
| -------------------- | ---------------------- | ------------------- | -------------------- |
| **Discoverability**  | ⭐⭐⭐⭐⭐             | ⭐⭐⭐              | ⭐⭐⭐⭐             |
| **Content Reuse**    | ⭐                     | ⭐⭐⭐⭐⭐          | ⭐⭐⭐⭐             |
| **Type Safety**      | ⭐⭐⭐⭐               | ⭐⭐                | ⭐⭐⭐               |
| **Flexibility**      | ⭐⭐⭐⭐⭐             | ⭐⭐                | ⭐                   |
| **Reusability**      | ⭐⭐                   | ⭐⭐⭐⭐⭐          | ⭐⭐⭐               |
| **Verbosity**        | ⭐⭐                   | ⭐⭐⭐⭐            | ⭐⭐⭐⭐             |
| **Sequence Support** | ⭐⭐⭐⭐⭐             | ⭐⭐⭐⭐⭐          | ⭐⭐                 |
| **Performance**      | ⭐⭐⭐                 | ⭐⭐⭐⭐            | ⭐⭐⭐⭐             |

---

## Next Steps

1. [ ] Choose primary strategy and commit to it
2. [ ] Fix identified type safety issues
3. [ ] Resolve `iterations` type mismatch
4. [ ] Add comprehensive tests for sequence behavior
5. [ ] Document common patterns with examples
6. [ ] Consider adding imperative controls
7. [ ] Performance audit with complex sequences
8. [ ] Add Storybook controls for live experimentation
9. [ ] Evaluate atoms-based API (Strategy D) for advanced use cases
10. [ ] Prototype `createSequenceComponent.fromAtoms()` implementation

---

## Conclusion

The current exploration has produced multiple viable strategies:

- **Strategy 1 (Inline JSX)** handles the 20% of complex custom sequences with different content per step
- **Strategy 2 (Factory with JSX motions)** is best for the 80% use case of reusable motion patterns
- **Strategy 3 (Presence)** serves a different purpose (binary visibility) and may conflict with existing APIs
- **Strategy D (Atoms-based factory)** offers advanced programmatic control for power users and data-driven sequences

The presence pattern (Strategy 3) should be reconsidered as it serves a different purpose and may conflict with existing APIs.

**Recommended approach:**

1. **Primary API**: Strategy 2 (Factory with JSX) - `createSequenceComponent({ motions: [...] })`
2. **Secondary API**: Strategy 1 (Inline JSX) - `<Sequence>` for one-offs
3. **Advanced API**: Strategy D (Atoms) - `createSequenceComponent.fromAtoms([...])` for programmatic use

Focus implementation efforts on solidifying Strategy 2 with better types, comprehensive tests, and clear documentation. Keep Strategy 1 for power users who need maximum flexibility. Consider adding Strategy D as an escape hatch for advanced scenarios requiring programmatic generation or serialization of animation sequences.

The current exploration has produced two viable strategies:

- **Strategy 2 (Factory)** is best for the 80% use case of reusable motion patterns
- **Strategy 1 (Inline JSX)** handles the 20% of complex custom sequences

The presence pattern (Strategy 3) should be reconsidered as it serves a different purpose and may conflict with existing APIs.

Focus implementation efforts on solidifying Strategy 2 with better types, comprehensive tests, and clear documentation. Keep Strategy 1 for power users who need maximum flexibility.
