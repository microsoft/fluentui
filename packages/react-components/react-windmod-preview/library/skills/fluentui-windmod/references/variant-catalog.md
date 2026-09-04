# The variant catalog

The state vocabulary. Read this when composing `group-<variant>/fui-<component>` classes, when unsure
whether a variant exists, or when adding one.

## Two files, and only two

Variants are **never** defined in a component module. The catalog is exactly two files, both shipped
and both importable:

| File                                                      | Vocabulary                                                             | Entries |
| --------------------------------------------------------- | ---------------------------------------------------------------------- | ------- |
| `@fluentui/react-tailwind-theme-preview/css/variants.css` | **generic** — meaningful without knowing any component's API           | 95      |
| `@fluentui/react-windmod-preview/variants.css`            | **component-specific** — component API values, sectioned per component | 68      |

The split test: _would this name mean anything to someone who has never seen this component's props?_
`disabled`, `placement-above`, `size-small` — yes, generic. `appearance-filled-alternative`,
`text-position-below`, `toaster-position-top-end` — no, component-specific.

## The canonical form

Every entry is authored the same way:

```css
@custom-variant disabled (&:where([disabled], [data-disabled], :disabled));
@custom-variant appearance-primary (&:where([data-appearance='primary']));
@custom-variant intent-error (&:where([data-intent='error']));
```

`&:where(…)` does three things at once:

1. **Zero added specificity** — every catalog variant is flat, so cascade order between rules is decided
   by source order, not by an accidental specificity win.
2. **Automatic group composition** — Tailwind rewrites a `&:where(…)` entry into its
   `group-<variant>/<name>` form for free. An **ancestor-form** entry silently stops group-composing;
   that is why the form is mandatory rather than stylistic.
3. **Predictable overrides** — a consumer's unlayered single-class rule always wins.

Two rules follow:

- **No union entries.** Comma-separate at the call site — `@variant hover, focus { … }` compiles to one
  nested rule per variant. A union entry would be one rule matching either, which composes differently.
- **No numeric `size-*` variants.** `size-16` would read as a Tailwind utility. Numeric `data-size`
  values are coerced instead: `calc(attr(data-size type(<number>)) * 1px)`.

At-rule variants such as `forced-colors` cannot take a group prefix — nest the group variant inside
them instead.

## Generic catalog

### Direction and orientation

```
rtl                     :dir(rtl)          — computed, correct under nesting
ltr                     :dir(ltr)
vertical                [data-orientation='vertical']
horizontal              [data-orientation='horizontal']
vertical-flag           [data-vertical]    — the boolean spelling (Slider, Toolbar)
```

The headless library spells vertical orientation two ways; they are separate entries, one spelling each.

### Placement (anchored surfaces)

```
placement-above|below|before|after            prefix match on the main axis
placement-start|end|top|bottom                suffix match on the alignment
placement-above-centered|below-centered
placement-before-centered|after-centered      exact, suffix-less
```

### Alignment and layout

```
align-content-start|center|end
layout-vertical|horizontal|horizontal-stacked|singleline|multiline|grid
label-above|after|before|below                data-label-position, always stamped — select on value
```

### Generic state

```
disabled                [disabled], [data-disabled], :disabled
enabled                 the negation
checked / not-checked
checked-mixed / not-checked-mixed
selected / not-selected
multiselect
current                 [data-current], [aria-current] not 'false'
open                    [open], [data-open], :open
expanded
invalid
required
read-only
placeholder-shown
indeterminate / not-indeterminate
submenu-open
```

### The disabled family

Four entries, in narrowing order — pick the narrowest that fits:

```
disabled-focusable      [data-disabled-focusable]
disabled-native         :disabled                              — native form controls only
disabled                [disabled], [data-disabled], :disabled
disabled-control        adds [aria-disabled='true']
enabled-control         the negation of disabled-control
```

`disabled-native` exists because a component that renders as either a `button` or an `a` needs to reach
the button form alone — `disabled` and `disabled-control` also match the `data-disabled` an anchor
carries.

### Interaction

```
hover                   :hover
focus                   :focus
focused / not-focused   [data-focused]
active                  :active
hover-active            :hover:active, :active:focus-visible
at-rest                 :not(:hover, :active:focus-visible)
```

### Focus visibility

```
focus-visible           [data-fui-focus-visible], :focus-visible
focus-within            :focus-within                — permissive
not-focus-within
focus-within-visible    :has(:focus-visible)         — keyboard-only, native modality heuristic
activedescendant-focusvisible                        — the react-aria active-descendant ring
```

`focus-within-visible` is the keyboard-only ring: measured equivalent to Griffel's keyborg gate for
non-text controls (no match on mouse click, match on keyboard and on a mouse-then-keyboard modality
switch). Text-editable descendants always match — which is the behaviour text controls want anyway.

### Size

```
size-extra-tiny  size-tiny  size-extra-small  size-small  size-medium
size-large  size-extra-large  size-huge  size-full
```

A multi-component vocabulary; not every component uses every step.

### Icons

```
icon-only / not-icon-only        [data-icon-only]
with-icon                        [data-icon-position] present
icon-before / icon-after         the position value
icon-present / not-icon-present  [data-icon]
```

### Content presence

Two readings, deliberately on different attributes, because one element sometimes needs both:

```
empty / not-empty                [data-empty], :empty          — falsiness reading
content-empty / not-content-empty [data-content-empty]         — nullish reading
with-description / not-with-description
```

`empty` mirrors "no JSX children" with a `:empty` fallback for unstamped elements. `content-empty`
mirrors "children is null or undefined", so a falsy-but-rendered `0` or `''` still counts as present.
Griffel needs both readings on one element (CompoundButton gates its icon margin nullishly, Button's
gate is falsiness), so they cannot share an attribute.

### Per-component booleans

```
inset  interactive  inline  multiline  content-before  content-after
has-actions / not-has-actions
```

## Component-specific catalog

Sectioned by owning component, in
`@fluentui/react-windmod-preview/variants.css`:

```
Accordion       expand-icon-position-start|end
Button          appearance-secondary|primary|outline|subtle|transparent
CounterBadge    dot  hidden
PresenceBadge   status-available|away|blocked|busy|do-not-disturb|offline|out-of-office|unknown
                out-of-office
Card            appearance-filled-alternative        (outline, subtle shared with Button)
icons           icon                                 — any direct-child Fluent glyph ([data-fui-icon], SVG or font)
bundleIcon      icon-filled  icon-regular         — the glyph swap, direct-child form
                variant-filled  variant-regular      — glyph-self form for deeper-nested glyphs
ColorSlider     channel-saturation  channel-value    (hue is the resting look, no entry)
Dialog          modal-type-non-modal  nested
Drawer          position-start|end|bottom
                scroll-state-none|top|middle|bottom, not-scroll-state-none
                separator
Field           validate-state-error|warning|success
MessageBar/Toast intent-info|success|warning|error
Nav             density-small                        (medium is the base look)
Persona         text-position-after|before|below, text-alignment-center
Skeleton        animation-pulse  appearance-translucent  shape-circle  shape-square
SpinButton      spin-active
Spinner/Toast   appearance-inverted
SwatchPicker    spacing-small  shape-rounded  shape-circular
TabList         appearance-subtle-circular  appearance-filled-circular  animating
Toaster         toaster-position-top|top-start|top-end|bottom|bottom-start|bottom-end
ToggleButton    accessible
```

Note the deliberate minimality: **a resting look gets no entry.** `hue` on ColorSlider, `medium` on Nav
density, `start` on Persona text position — each is the base state that everything else overrides, so
there is nothing to select. Similarly `toaster-position-*` is prefixed because a bare `position-start`
already belongs to Drawer and means something else.

## Using the catalog

### From a child, via a group variant

```tsx
<Button disabled>
  <span className="group-disabled/fui-button:line-through">Send</span>
</Button>

<Tooltip content="…">
  <span className="group-placement-above/fui-tooltip:rotate-180" />
</Tooltip>
```

Form: `group-<variant>/fui-<component>`. No group declaration of your own is required.

### From a sibling, via a peer variant

Where the real state lives on a native input — `Switch`, `Radio`, `Checkbox` — the input slot carries
`peer/fui-<component>`:

```tsx
<span className="peer-checked/fui-switch:text-brand-foreground-1">On</span>
```

Never emit a peer marker on the root of a composite control: a consumer's
`peer-checked/fui-x` would silently match a root that is never `:checked`.

### From your own Tailwind

Import both catalogs into your Tailwind entry stylesheet so your build knows the variants exist:

```css
@import '@fluentui/react-tailwind-theme-preview/css/variants.css';
@import '@fluentui/react-windmod-preview/variants.css';
```

Both files are pure `@custom-variant` declarations and emit no CSS. See [setup.md](setup.md) for the
full entry-stylesheet shape and the caveat about build wiring.

## If a variant is missing

**Consumers:** you do not need one. Write the plain attribute selector in your own unlayered CSS —
`.fui-button[data-appearance='primary'] { … }` — which wins outright anyway.

**Contributors:** add it in the canonical `&:where([data-…])` form, to whichever catalog it belongs to
(generic vs. component-specific), one selector per entry. Keep each catalog minimal. See
[authoring-conventions.md](authoring-conventions.md).

An entry is vocabulary, not a usage index — having no in-repo consumer is not by itself a reason to
delete one. Three kinds stay unconsumed on purpose:

- names that **shadow a Tailwind built-in** whose selector is narrower and not `:where()`-flat
  (`invalid`, `required`, `read-only`, `ltr`) — dropping the entry silently substitutes the built-in
- the **unused half of a polarity pair** (`focused`, `not-selected`, `not-indeterminate`, `has-actions`)
- the **unstyled member of a live enumeration** (`layout-horizontal`, `layout-singleline`,
  `scroll-state-none`)

Delete an entry only when its selector can match nothing the tree renders, or when it can never be
false.
