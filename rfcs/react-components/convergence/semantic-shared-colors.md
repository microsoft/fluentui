# RFC: Semantic shared color tokens

@miroslavstastny

## Summary

All color palette tokens in the theme are named after colors. This RFC discusses options how we could name some of them using semantic names (`danger`, `success`...).

## Background

After changes described in [RFC: Reduce number of shared color alias tokens](https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/theme-shared-colors.md) and another ad-hoc changes to shared color tokens, Fluent UI theme currently contains 2 types of shared color tokens:

- [28 **persona** shared colors](https://github.com/microsoft/fluentui/blob/76e6598eae0c9247fb7f8834c1e24d8e864bf5df/packages/tokens/src/types.ts#L390-L420), where each contains [3 color "slots"](https://github.com/microsoft/fluentui/blob/76e6598eae0c9247fb7f8834c1e24d8e864bf5df/packages/tokens/src/types.ts#L239-L242) (tokens).
- [7 **status** shared colors](https://github.com/microsoft/fluentui/blob/76e6598eae0c9247fb7f8834c1e24d8e864bf5df/packages/tokens/src/types.ts#L379-L388), where each contains [9 color slots](https://github.com/microsoft/fluentui/blob/76e6598eae0c9247fb7f8834c1e24d8e864bf5df/packages/tokens/src/types.ts#L159-L169) (plus 3 of them contain 10th slot).

There is an overlap between the two groups - `red` and `marigold` colors from shared color tokens are used as persona shared colors as well. That is intentional, for that reasons, the "persona slots" have the same color mapping in both groups:

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

| Current name | Meaning      | New name  | Color change                                 |
| ------------ | ------------ | --------- | -------------------------------------------- |
| `red`        | danger, busy | ???       | Change `red` to `cranberry`                  |
| `green`      | success      | success   | No change                                    |
| `darkOrange` | severe       | REMOVE    | Remove `darkOrange` and "severe" as a status |
| `yellow`     | warning      | warning   | Change `yellow` for `orange`                 |
| `berry`      | OOF          | oof       | No change                                    |
| `lightGreen` | available    | available | No change                                    |
| `marigold`   | away         | away      | No change                                    |

_‼️ TODO: verify with design_

## Detailed Design or Proposal

There are multiple options how to address the problem. This chapter describes the options and their pros and cons.

### 1. Decouple persona and status shared colors, introduce semantic token names

Add 7 new semantic colors:

1. danger
2. busy
3. success
4. warning
5. oof
6. available
7. away

For each of the 7 new colors, add 9 (or 10) color slots (see the table above).

Update the sources in the library to use the semantic color names instead of the current shared color names.

Find a way how to get rid of the legacy tokens which are no longer needed:

- "status" slots in `red`
- `green`
- `darkOrange`
- `yellow`
- `berry`
- `lightGreen`
- "status" slots in `marigold`

Once the legacy tokens are not used by the library code, there are three possible ways how to get rid of the tokens:

#### 1A: "deprecate" the tokens and remove them in the next major release

#### 1B: "deprecate" the tokens and create a V2 theme which does not contain them - let applications switch when they are ready

#### 1C: big bang - break semver, remove the tokens immediately

#### Pros and Cons

- 👍 Decouples the persona and status shared colors, moves us to architecturally cleaner solution.
- 👍 Designers can "freely" change the status colors' mapping.
- 👍 Partners can override persona and status colors independently.
- 👎 We will remove some "basic" colors like (slots of) `red`, `green`, `yellow` - are we sure those have been used as semantic colors only?
- 👎 1A: adds ~70 new tokens
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

#### Pros and Cons

- 👍 Semantic tokens without any unnecessary tokens.
- 👍 Controlled partner upgrade from old hex values to new values, but coupled with library upgrade.
- 👎 Semantic and status tokens are still coupled - the only way for the application to override `danger` is to override `red` (which will affect other parts of the UI).
- 👎 Debugging might be harder - the CSS variable names are not the same as the token names.
- 👎 There might be code which depends on the 1:1 token to CSS variable mapping (hello, [`themeToTokensObject`](https://github.com/microsoft/fluentui/blob/97c1c1ab218afb20e37bfc35936fd88177d439b4/packages/tokens/src/themeToTokensObject.ts#L14-L16)).

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
