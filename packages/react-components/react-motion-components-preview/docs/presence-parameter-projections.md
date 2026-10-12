# Presence parameter records and In/Out projections

**Date:** July 14, 2026  
**Status:** Architecture note for preview experiments; not a stable API commitment

## Summary

Stable [`createPresenceComponent`](../../react-motion/library/src/factories/createPresenceComponent.ts) already generates `.In` and `.Out`, and those generated members have shipped. Preserve that contract. A component created from a `PresenceMotionFn<MotionParams>` has one `MotionParams` record shared by the presence component and both directed members. Each form evaluates the complete presence function; the factory then projects either `enter` or `exit` for `.In` or `.Out`.

New presence definitions should therefore model one complete graph-level transition:

- `from` — state before entry;
- `rest` — visible resting state;
- `to` — state after exit.

Presence projects `from → rest` and `rest → to`; `.In` projects `from → rest`; `.Out` projects `rest → to`. `to` should normally default to `from`, giving a symmetric transition without preventing an asymmetric destination. Parameters irrelevant to a selected projection are intentionally ignored.

Do not replace the generated members with `Object.assign(Component, { In, Out })`, and do not change stable factory behavior to accommodate a preview naming experiment. Doing either would duplicate projection policy and risk losing behavior already centralized in the stable factories.

## Verified factory contract

[`createPresenceComponent`](../../react-motion/library/src/factories/createPresenceComponent.ts) owns more than static member creation:

- It stores the normalized complete presence function under `PRESENCE_MOTION_DEFINITION`.
- It passes `{ element, ...params }` to the complete function, then chooses `enter` or `exit` according to `visible`.
- It creates `.In` and `.Out` with stable `createMotionComponent()`. For a functional definition, each generated member forwards the same runtime parameter record to the complete function and selects `.enter` or `.exit` from its result.
- It owns appearance, mounting and unmounting, direction-aware lifecycle callbacks, reduced-motion/skip behavior, imperative handles, cleanup, and experimental interruption by reversal.

The [factory tests](../../react-motion/library/src/factories/createPresenceComponent.test.tsx) verify presence direction, initial appearance, mounting, callbacks, functional definitions, and selection of functional or object definitions by `.In` and `.Out`. The generated one-way components inherit the motion lifecycle and replay behavior from [`createMotionComponent`](../../react-motion/library/src/factories/createMotionComponent.ts).

Variants also depend on the stored complete definition. [`createPresenceComponentVariant`](../../react-motion/library/src/factories/createPresenceComponentVariant.ts) reads `PRESENCE_MOTION_DEFINITION`, overlays variant defaults with runtime parameters, and calls `createPresenceComponent()` again. Its [tests](../../react-motion/library/src/factories/createPresenceComponentVariant.test.tsx) verify that runtime parameters override variant defaults. Hand-written replacement members would create a second, potentially divergent definition path and would not automatically preserve these semantics.

## One record, three views

`MotionParams` is the record accepted by all three component forms. It describes the whole transition graph rather than only the edge currently being rendered.

| Field category                                 | Presence                               | `.In`                 | `.Out`                                      | Notes                                                      |
| ---------------------------------------------- | -------------------------------------- | --------------------- | ------------------------------------------- | ---------------------------------------------------------- |
| `from*`                                        | Entry origin; default exit destination | Entry origin          | Ignored except when needed to default `to*` | Graph-level input, not an “In-only prop”                   |
| `rest*`                                        | Entry destination and exit origin      | Entry destination     | Exit origin                                 | Shared seam between both edges                             |
| `to*`                                          | Exit destination                       | Intentionally ignored | Exit destination                            | Defaults to matching `from*`                               |
| `duration`, `easing`, `delay`                  | Entry timing and exit fallback inputs  | Entry timing          | Exit timing fallbacks                       | The complete function resolves fallbacks before projection |
| `exitDuration`, `exitEasing`, `exitDelay`      | Exit timing                            | Intentionally ignored | Exit timing                                 | Explicit exit values take precedence                       |
| Cross-cutting options such as `animateOpacity` | Both edges                             | Entry construction    | Exit construction                           | Apply wherever the complete definition uses them           |

“Ignored” does not mean invalid. It means that the complete record can be reused unchanged while a projection consumes only the fields needed for its edge. Public type documentation should state applicability explicitly, as the prototype parameter docs do in [`fade2-types.ts`](../library/src/components/Fade2/fade2-types.ts) and [`slide2-types.ts`](../library/src/components/Slide2/slide2-types.ts).

This is intentionally not three independently narrowed prop types. The shipped factory exposes one `MotionParams` generic, evaluates one complete function, and returns three component views of it. Changing that would be a factory API redesign rather than a preview-component cleanup.

## Timing resolution

Resolve timing inside the complete presence function before returning `{ enter, exit }`:

- `exitDuration = duration`;
- `exitDelay = delay`;
- `exitEasing` follows the component's documented policy: it may fall back to `easing` for a symmetric curve, or use a distinct default such as an accelerate curve;
- explicit `exitDuration`, `exitEasing`, and `exitDelay` always win.

This resolution applies even when `.Out` is used: `.Out` still evaluates the complete presence function, so generic timing fields remain meaningful as exit fallbacks. Conversely, `.In` may receive exit timing fields, but its projected enter atoms intentionally do not use them.

The prototypes demonstrate both easing policies. [`Fade2`](../library/src/components/Fade2/Fade2.ts) defaults `exitEasing` to `easing`; [`Slide2`](../library/src/components/Slide2/Slide2.ts) defaults it to the accelerate token while `easing` defaults to a decelerate token. Both default exit duration and delay from their entry counterparts. This distinction must remain documented rather than hidden behind a claim that all timing is symmetric.

## Current Slide compatibility and prototype naming

Existing [`Slide`](../library/src/components/Slide/Slide.ts) uses `outX`/`outY` for the exited state and `inX`/`inY` for the entered state. Its [types](../library/src/components/Slide/slide-types.ts) and [tests](../library/src/components/Slide/Slide.test.ts) establish the current compatibility surface: entry runs `out → in`, and exit runs `in → out`.

The experimental [`Slide2`](../library/src/components/Slide2/Slide2.ts) uses graph-oriented `fromX`/`fromY`, `restX`/`restY`, and `toX`/`toY`. Its [tests](../library/src/components/Slide2/Slide2.test.ts) verify all three projections and the symmetric `to = from` default. [`Fade2`](../library/src/components/Fade2/Fade2.ts) applies the same shape to opacity, with corresponding [tests](../library/src/components/Fade2/Fade2.test.ts).

`Fade2` and `Slide2` are prototypes in the preview package. They are evidence for naming and projection behavior, not committed stable API. A migration from `out`/`in` to `from`/`rest`/`to` must be treated as a compatibility decision; it should not be smuggled into the stable factory.

## Why projection is preferable to polymorphism

### Reject automatic mode switching based on missing `visible`

A component must not infer “one-way motion” merely because `visible` is absent. `visible` is optional today, and absence already participates in presence initialization and exit-state behavior. Overloading omission would make a typo, prop spread, context-provided visibility, or intentional default silently select a different lifecycle model. It would also make callback signatures, mounting, appearance, and interruption depend on runtime prop presence rather than on the explicit component chosen by the author.

`Component`, `Component.In`, and `Component.Out` are explicit and statically discoverable. Keep them.

### Reject a hybrid one-way/presence component

A hybrid would have to conditionally own two incompatible contracts: visibility-driven mounting and reversible presence on one branch, versus play-on-mount/replay one-way motion on another. It would blur which callbacks include a direction, whether `appear` and `unmountOnExit` apply, and which interruption policy is active. The stable factory composition already provides both uses without combining their lifecycle state machines.

## TanStack row/accessor analogy—and its limits

A useful mental model is a TanStack-style table row record with column accessors. The full row is supplied once; different accessors expose useful projections without requiring separate row shapes. Likewise, one presence parameter record describes the graph, while Presence, `.In`, and `.Out` expose different paths through it. This supports reusable records, variant overlays, and explicit field-applicability documentation.

The analogy stops at data shape. `.In` and `.Out` are not lazy field accessors: the stable factory evaluates the complete `PresenceMotionFn` and then selects a returned edge. Fields are not automatically pruned, and side effects inside a motion definition would still run—another reason definitions should remain declarative. A table accessor also does not own React mounting, animation handles, cancellation, reversal, reduced motion, or lifecycle callbacks; those remain factory/runtime responsibilities.

## Recommended implementation pattern

For each new preview presence component:

1. Define one graph-level parameter record with `from*`, `rest*`, and `to*` names; include shared presence timing fields.
2. Document each field's applicability to Presence, `.In`, and `.Out`.
3. In one complete `PresenceMotionFn`, resolve defaults once, including `to* = from*` and exit timing fallbacks.
4. Construct `enter` strictly as `from → rest` and `exit` strictly as `rest → to` using neutral directed atoms.
5. Export only `createPresenceComponent(completePresenceFn)`. Use `createPresenceComponentVariant()` for variants.
6. Accept that generated projections evaluate the complete function and intentionally ignore irrelevant resolved fields.
7. Do not attach custom `.In`/`.Out`, copy the metadata symbol, or modify either stable factory.

This recommendation complements the separation of presence from arbitrary sequencing described in [`sequence-strategies-analysis.md`](./sequence-strategies-analysis.md): projection selects an edge of a visibility graph; it is not a general sequence mechanism.

## Testing checklist

- [ ] The complete definition maps explicit `from* → rest*` enter endpoints and `rest* → to*` exit endpoints.
- [ ] Omitting `to*` produces a symmetric exit destination equal to `from*`.
- [ ] `.In` selects `from* → rest*` from the generated factory member.
- [ ] `.Out` selects `rest* → to*` from the generated factory member.
- [ ] `.In` tolerates exit-only fields without changing its atoms; `.Out` tolerates entry-origin fields except where they supply `to*` defaults.
- [ ] Entry timing defaults are verified.
- [ ] Exit duration and delay fall back to entry values, and explicit exit values override them.
- [ ] Exit easing follows the component's documented policy and explicit `exitEasing` overrides it.
- [ ] Cross-cutting options, such as opacity composition, affect the intended edges.
- [ ] The component retains `PRESENCE_MOTION_DEFINITION`; variants still overlay defaults and accept runtime overrides.
- [ ] Stable factory tests continue to cover appearance, visibility changes, callbacks, mounting/unmounting, cancellation, reduced/skip motion, and interruption behavior.
- [ ] Prototype exports and documentation do not describe `Fade2` or `Slide2` as stable API.
