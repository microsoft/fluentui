# RFC: Reduce number of shared color alias tokens

---

@miroslavstastny, @daisygeng

## Summary

Every token in `react-theme` results in a CSS variable being injected into DOM by `Provider`. CSS variables affect browser performance. If we can remove some shared color alias tokens, it would improve performance without limiting partners.

## Background

In 2021, we measured the performance impact of the theme, see the [related RFC](theme-shape.md).

At that time we only used a FlameGrill synthetic test to measure the impact:

1. at that time, `react-theme` consisted of 1200 CSS variables, aliases referencing global,
2. we tried to, instead of referencing the globals, inline the values to alias tokens,
3. reduce the tokens by removing global color tokens from the theme,
4. tried to remove even more tokens.

As measured in Chrome profiler, there has been a significant difference in reflow times (see the RFC for details).

Flamegrill showed us following numbers in the synthetic test:

| Theme structure               |  ms |
| ----------------------------- | --: |
| 1200 tokens, alias references | 490 |
| 1200 tokens, inline values    | 410 |
| 550 tokens                    | 250 |
| 160 tokens                    | 150 |

The test showed that there was a clear performance hit depending on the number of the CSS variables. As a result:

1. we got rid of alias references and inlined the values,
2. removed global color tokens from the theme,
3. flattened the theme object.

This reduced the tokens from 1200 to 550 and improved the perf from 490ms (1st row in the table) to 250ms (3rd row).

Since then, we have added couple of tokens as requested by design, as of today the theme object contains ~650 tokens.

### Real Application Performance

To avoid any performance regressions there are performance gates running as part of partner application CI.

The test case which is interesting for us is WLT hot - that opens a new application window (pre-heat), closes the window and opens it again measuring the performance. The current time for this test is around 700ms.

Just adding v9 `Provider` with a theme, the test time rises by **20ms** (with the original approach having 1200 tokens and alias references it was 80ms) which does not pass the gate. For that reason we have been stuck on this for 3 months already not being able to enable the v9 `Provider` in the application, blocking feature teams in starting migration to v9.

As an experiment we tried to reduce the tokens to 200, the test time degradation was 7ms.

| Theme structure               | WLT degradation [ms] |
| ----------------------------- | -------------------: |
| 1200 tokens, alias references |                   80 |
| 600 tokens                    |                   20 |
| 200 tokens                    |                    7 |

**The numbers confirm the performance decreases linearly depending on the number of CSS variables (and therefore theme tokens).**

### New Shared Color Alias tokens request

_The numbers might be inaccurate as the feature is not fully spec-ed yet!_

In order to support new scenarios (colorful calendar view), there is a new request to add 3 new shared color alias tokens. Adding them would result in adding 3 alias tokens for each of 49 shared colors = adding 147 new shared color alias tokens which would affect application performance.

## Detailed Design or Proposal

The theme currently contains 49 global shared colors.

Current alias structure forces each ramp to be uniform (the same set of alias tokens for each shared color), resulting in 49 alias tokens each time we need a new line item (new alias token). Today we have 9 alias slots = total alias count is 441 (49x9).

Components have varying degrees of color needs.

Instead of 1 uniform Shared alias table (today's experience), separate out into 3 tables:

1. Semantic States
   - There are 5 unique global colors needed to support this set (Danger, Success, Severe, Warning, Out of office)
   - Assume 9 alias tokens (Could potentially remove 2 from this table as they were avatar specific)
   - 45 alias tokens in total (5 x 9)
2. Persona
   - There are 30 unique global colors needed to support this set
   - Only needs 3 alias tokens
   - 90 tokens in total (30 x 3)
3. Category (calendar categories) (not fully defined yet)
   - 10 unique global colors to support this set
   - Assuming 9 alias slots (subject to increase)
   - 90 tokens in total (10 x 9)

Dividing up by 3 tables would reduce token count from 441 to ~225 (Table 1+Table 2+Table 3) while adding support for Calendar scenario.

### Pros and Cons

- 👍 Reducing shared color alias tokens from 441 to ~225 instead of increasing them to ~600 (to add tokens needed for Calendar)
- 👍 More clarity around which specific color to use for semantic states instead of relying on design guidance
- 👍 Allows a bit more wiggle room for the semantic alias table to grow w/o adding too much bloat
- 👎 **Breaking change after the final RC**
- 👎 Three separate color sets instead of a single one

## Discarded Solutions

### Create `theme_v2` to maintain backwards compatibility

Instead of breaking the current theme we can just deprecate it and add `_v2` version.

That might cause partner confusion - releasing the first final version with deprecated things which, when used, would result in degraded performance. The breaking change should not affect partners much - the colors which we are removing are not supposed to be used anywhere. If those are, there will be a build time (TS) error to catch the problem quickly.

## Other possible optimizations

There is still a longer term plan to explore partial themes, theme splitting and lazy loading. Those do not conflict with reducing the number of tokens now. This section describes different optimizations we are considering.

### Use partial theme in the application

The current theme (`master`, Apr 27, 2022) contains 623 tokens. Out of that 600 tokens, only ~200 tokens are used by the library.

Instead of using the full theme, application can only inject the tokens in use.

This can be done manually, or automatically during build time.

#### 👍 Pros

- Significantly reduces the number of tokens -> improves WLT.

#### 👎 Cons

- Manual way is hard to maintain and error prone. _This problem can be minimized by splitting tokens to groups and allowing just per-group opt-in (instead of per-token)._
- Automated way is complex (how about processed styles in dependencies - "manifests"?).
- Hard for parts (shared components) which are not part of the application bundle (OTA).

### Theme splitting, lazy loading

Similar to previous approach, but find a way to "lazy inject" (perhaps not lazy load, all the tokens are part of the initial bundle?) more tokens when needed.

#### 👍 Pros

- Significantly reduces the number of tokens -> improves WLT.
- Any token can be used.

#### 👎 Cons

- Complex, a lot of unknowns.
- Adding variables would cause reflows -> perf hit later.

### `ColorSetProvider`

1. Take the color palettes (16 color ramps) from global and define each in an exported module and const objects.
2. Remove color palettes (9 color ramps) from theme
3. Add a ColorSetProvider component that can define a set of CSS vars with a pattern.
   This component would take a palette array of colors and a name.
   It would set cssVars for use in colorful scenarios:

- color`name`Background1
- color`name`Background2
- color`name`Background3
- color`name`BorderActive
- color`name`Border1
- color`name`Border2
- color`name`Foreground1
- color`name`Foreground2
- color`name`Foreground3

4. Update Avatar and other components that want to support color components to replace the colorful boolean property with a colorSetName. This would cause them to reference the colors set by a ColorSetProvider upstream.

#### 👍 Pros

- Color palettes in own modules should tree shake out if not used.
- Default case does not add any of the color set CSS vars, keeping the theme CSS vars minimal.
- ColorSetProvider can map to position in the palette based on theme if necessary -or- we can leave updating the color palette array at the top level when the theme changes.
- With reduces impact on the system, could extend the color sets to include hover, active, and selected states. Could also go to 1 background, border, and foreground color. Note: Should rename border to stroke!

#### 👎 Cons

- There is some fragility for consumers that have extensions that reference color sets and have to rely on their host to have provided them.
- Unsure of the setting of color sets at scopes lower in the hierarchy. Option: Could integrate colorSets as a property into FluentProvider to encourage setting at higher levels.
