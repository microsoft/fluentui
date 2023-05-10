# RFC: Semantic shared color tokens

@miroslavstastny

## Summary

All color palette tokens in the theme use color names (`red`, `green`...). This RFC discusses options how we could name some of them using semantic names (`danger`, `success`...).

## Background

After changes described in [RFC: Reduce number of shared color alias tokens](https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/theme-shared-colors.md) and another ad-hoc changes to shared color tokens, Fluent UI theme currently contains 2 types of shared color tokens:

- [28 **persona** shared colors](https://github.com/microsoft/fluentui/blob/76e6598eae0c9247fb7f8834c1e24d8e864bf5df/packages/tokens/src/types.ts#L390-L420), where each contains [3 color "slots"](https://github.com/microsoft/fluentui/blob/76e6598eae0c9247fb7f8834c1e24d8e864bf5df/packages/tokens/src/types.ts#L239-L242) (tokens) = 84 `colorPalette*` tokens.
- [7 **status** shared colors](https://github.com/microsoft/fluentui/blob/76e6598eae0c9247fb7f8834c1e24d8e864bf5df/packages/tokens/src/types.ts#L379-L388), where each contains [9 color slots](https://github.com/microsoft/fluentui/blob/76e6598eae0c9247fb7f8834c1e24d8e864bf5df/packages/tokens/src/types.ts#L159-L169) (plus 3 of them contain 10th slot) = 66 `colorPalette*` tokens.

Status colors have two different purposes - they are either to show a status or presence:

| Status color | Status  | Presence  | Persona |
| ------------ | ------- | --------- | ------- |
| `red`        | danger  | busy      | persona |
| `green`      | success |           |         |
| `darkOrange` | severe  |           |         |
| `yellow`     | warning |           |         |
| `berry`      |         | OOF       |         |
| `lightGreen` |         | available |         |
| `marigold`   |         | away      | persona |

As you can see in the table above, there is an overlap between the status and persona groups - `red` and `marigold` colors from shared color tokens are used as persona shared colors as well. That is intentional, for that reasons, the "persona slots" have the same color mapping in both groups:

| Color slot                          | Notes                 |
| ----------------------------------- | --------------------- |
| `colorPaletteRedBackground1`        | status                |
| `colorPaletteRedBackground2`        | status + persona      |
| `colorPaletteRedBackground3`        | status                |
| `colorPaletteRedForeground1`        | status                |
| `colorPaletteRedForeground2`        | status + persona      |
| `colorPaletteRedForeground3`        | status                |
| `colorPaletteRedForegroundInverted` | Red, Green and Yellow |
| `colorPaletteRedBorderActive`       | status + persona      |
| `colorPaletteRedBorder1`            | status                |
| `colorPaletteRedBorder2`            | status                |

This results in 150 (28 _ 3 + 7 _ 9 + 3) color tokens.

Adding new tokens comes at a [runtime performance cost](https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/theme-shape.md).

## Problem statement

There is no semantic meaning in the current shared color tokens. The intended use case is communicated only by a design spec. See [#26168](https://github.com/microsoft/fluentui/issues/26168), [#25720](https://github.com/microsoft/fluentui/issues/25720).
Designers plan to update the color values for the status shared colors - that might seem just like a hex value change, but that results in a color name change: for example **red** will be replaced by **cranberry**.

### Token change request from design

The current requirement from design is to keep **presence** and **persona** token names and introduce semantic names for **status** tokens. This is the ideal end state:

| Current name | Current meaning       | Proposed change                                                                                                                     |
| ------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `red`        | danger, busy, persona | Introduce semantic `danger`, mapped to `cranberry` instead of `red`.<br/>Keep `red`, it is still used for **busy** and **persona**. |
| `green`      | success               | Replace by semantic `success`.                                                                                                      |
| `darkOrange` | severe                | **severe** should not be used anywhere. Keep `darkOrange` (temporarily) for Teams compatibility.                                    |
| `yellow`     | warning               | Replace by semantic `warning`, mapping changed from `yellow` to `orange`                                                            |
| `berry`      | OOF                   | No change                                                                                                                           |
| `lightGreen` | available             | No change                                                                                                                           |
| `marigold`   | away, persona         | No change                                                                                                                           |

Note: even though the task now is to introduce the semantic names only for the **status** tokens, in the future we might be asked to do the same change for **presence** tokens.

### Other platforms

I briefly checked react native packages for iOS and Android produced by token pipeline, they use tokens like `warningBackground1`.

## Detailed Design or Proposal

There are multiple options how to address the problem. This chapter describes the options and their pros and cons.

### 1. Introduce new semantic status tokens

Add 3 new semantic colors:

1. danger
2. success
3. warning

For each of the 3 new colors, add 9 (or 10) color slots (see the table above).

Update the sources in the library to use the semantic color names instead of the current shared color names.

Find a way how to get rid of the legacy tokens which are no longer needed:

- `green` (10 tokens)
- `yellow` (10 tokens)

Once the legacy tokens are not used by the library code, there are three possible ways how to get rid of the tokens:

#### 1A: "deprecate" the tokens and remove them in the next major release

#### 1B: "deprecate" the tokens and create a V2 theme which does not contain them - let applications switch when they are ready

#### 1C: big bang - break semver, remove the tokens immediately

#### Pros and Cons

- 👍 Decouples the persona and status shared colors, moves us to architecturally cleaner solution.
- 👍 Designers can "freely" change the status colors' mapping.
- 👍 Partners can override persona and status colors independently.
- 👎 We will remove some "basic" colors `green`, `yellow` - are we sure those have been used as semantic colors only?
  approach
- 👎 1A: adds ~30 new tokens
- 👎 If design decides to do the same for **presence** tokens, we will need to add another ~40 tokens to follow the same
- 👎 1A: can cause temporarily inconsistent UI colors between library and partners
- 👍 1B: we can use the current mapping in v1 theme and the new mapping in v2 theme - partners can control the moment when they switch to the new mapping
- 👎 1B: requires us maintaining the double amount of themes
- 👎 1C: breaks partners (the questions is how much, but...)

### 2. Continue with the current approach

The current names are set for v9, let's live with them 🤷‍♂️.

Add "status" slots to `cranberry`, add `orange` as a status color.

Update the sources in the library to use the new colors. Ask partners to update their sources.

#### Pros and Cons

- 👍 Minimal change, no new patterns, just adds 15 new tokens.
- 👎 Can cause temporarily inconsistent UI colors between library and partners.
- 👎 Not improving designers' workflow.

### 3. Hack the hex values

The current names are set for v9, let's live with them 🤷‍♂️.

Change the hex values for `red` to `cranberry` values, `yellow` to `orange`.

#### Pros and Cons

- 👍 Change does not affect components or partner code.
- 👍 No new tokens.
- 👎 Designers will scream as "Yellow and orange are two different colors!".
- 👎 There will be `red` and `cranberry` persona colors in the theme, but they will have the same hex values (but sure, we can take `cranberry` and change its hex values to, let's say `red` 🤯).

### 4. Add semantic color tokens mapped to the current shared colors

All tokens are mapped to CSS variables with the same name: `colorPaletteRedBackground1` token is mapped to `--colorPaletteRedBackground1` CSS variable. From the very first release of FUIR9, we [always warned partners](https://react.fluentui.dev/?path=/docs/concepts-developer-theming--page#do-not-use-css-variables-directly) that they should never depend on this fact:

> Do not use CSS variables directly
>
> ⚠ Never use theme CSS variables directly! The CSS variables implementation of the theme is internal to the library. We might eventually decide to change the variable names, hash them or even use direct values instead of some variables. Always use the tokens to access the theme.

Add "status" slots to `cranberry`, add `orange` as a status color.

Add semantic color tokens which are mapped to the current shared colors. For example, `colorPaletteDangerBackground1` is mapped to `--colorPaletteRedBackground1`. `Danger` is still mapped to the old `red` color, but the token name is now semantic. Still not changed to `cranberry`.

Update the sources in the library to use the new colors.

Update the mapping from old colors to the new colors.

#### 4B: Add CSS variables for new status tokens, map old tokens to the status CSS variables

The variant 4 proposes to keep `--colorPaletteRedBackground1`, create new token `colorPaletteDangerBackground1` and map it to the red CSS variable.
We can also implement this the other way around - create `colorPaletteDangerBackground1` mapped 1:1 to `--colorPaletteDangerBackground1` and re-map the legacy tokens `colorPaletteRedBackground1` to the status CSS variables.

#### Pros and Cons

- 👍 Semantic tokens without any unnecessary tokens.
- 👍 Controlled partner upgrade from old hex values to new values, but coupled with library upgrade.
- 👎 Semantic and status tokens are still coupled - the only way for the application to override `danger` is to override `red` (which will affect other parts of the UI).
- 👎 Debugging might be harder - the CSS variable names are not the same as the token names.
- 👎 There might be code which depends on the 1:1 token to CSS variable mapping (hello, [`themeToTokensObject`](https://github.com/microsoft/fluentui/blob/97c1c1ab218afb20e37bfc35936fd88177d439b4/packages/tokens/src/themeToTokensObject.ts#L14-L16)).
- 👍 4B: The css variable names map to the new, recommended token names for easier debugging.
- 👎 4B: If anyone is using the css variable names directly, they will break when we rename them to the new names.
- ‼️ In the current implementation we use `Theme` type for theme definition and `Record<keyof Theme, string>` for tokens in styles. In option 4 this would have to change - see [Open Issues](#open-issues).

## Naming the status tokens

In the theme we currently use prefixes to have "namespaces" for individual color ramps - we use `color` prefix for neutral color ramp and `colorPalette` prefix for shared colors.

What do we want to use for status tokens?

- K: `colorPalette` (`colorPaletteDangerBackground1`)
- L: `colorStatus` (`colorStatusDangerBackground1`)
- M: `colorSemantic` (`colorSemanticDangerBackground1`)
- n: anything else?

Also consider how the proposed name would work if we decide to introduce semantic **presence** tokens (`away`).

Keep in mind that in most options the token name will be visible in the DOM as CSS variable name.

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

- [ ] Option 4 breaks token to CSS variable 1:1 mapping. What does that mean for the types we have (theme and tokens are now `Theme` and `Record<keyof Theme, string>`, but would be two different shapes). What would be the impact on overrides - both technically and in terms of partner expectations?
