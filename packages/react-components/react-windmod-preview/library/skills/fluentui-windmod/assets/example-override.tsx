/**
 * example-override.tsx
 *
 * The consumer side of example-override.css. Demonstrates the three override routes,
 * theming by class, and group variants reaching a component's internals.
 */

import * as React from 'react';
import { Button, buttonClassNames } from '@fluentui/react-windmod-preview/button';
import { Card } from '@fluentui/react-windmod-preview/card';
import { MessageBar } from '@fluentui/react-windmod-preview/message-bar';
import { FluentProvider, themeClassNames, type ThemeClassName } from '@fluentui/react-windmod-preview/provider';
import { Switch } from '@fluentui/react-windmod-preview/switch';
import { Tooltip } from '@fluentui/react-windmod-preview/tooltip';
import { useCssVarValue } from '@fluentui/react-windmod-preview/use-css-var-value';

import './example-override.css';

// Two required root stylesheets, loaded once per document, ahead of everything else. The theme
// goes FIRST — it declares the cascade-layer family, and layer order is first-appearance.
// Component CSS needs no import: each component pulls its own chunk automatically.
//   import '@fluentui/react-tailwind-theme-preview/styles.css';
//   import '@fluentui/react-windmod-preview/base.css';

const pickTheme = (dark: boolean): ThemeClassName =>
  dark ? themeClassNames.webDarkTheme : themeClassNames.webLightTheme;

export function Example({ dark }: { dark: boolean }) {
  return (
    // ✅ theme is a CLASS NAME string, not a Griffel theme object
    <FluentProvider theme={pickTheme(dark)}>
      <ShippedThemeExamples />
      {/* A custom theme is just a class that redeclares the token custom properties. */}
      <FluentProvider theme="my-brand-theme">
        <Button appearance="primary">Brand surface</Button>
      </FluentProvider>
    </FluentProvider>
  );
}

function ShippedThemeExamples() {
  return (
    <div className="marketing-surface">
      {/* Route 1 — your own class. Unlayered, so it wins outright. */}
      <Button className="cta-button">Get started</Button>

      {/* Route 2 — slot className. Your class lands last on every slot. */}
      <Button icon={{ className: 'text-status-danger-foreground-1' }}>Delete</Button>

      {/* Route 3 — group variant from a child you control. The marker is already on the
          root, so no `group/name` declaration of your own is required. */}
      <Button disabled>
        <span className="group-disabled/fui-button:line-through">Send</span>
      </Button>

      {/* Group variants compose with any catalog entry, including the component-specific ones. */}
      <MessageBar intent="error">
        <span className="group-intent-error/fui-message-bar:font-semibold">Upload failed</span>
      </MessageBar>

      {/* peer variants, for state that lives on a native input rather than the root. */}
      <Switch label={<span className="peer-checked/fui-switch:font-semibold">Notifications</span>} />

      {/* Slot `style` works the same way — this is the documented fix for an unbounded listbox. */}
      {/* <Combobox listbox={{ style: { maxHeight: '20rem', overflowY: 'auto' } }} /> */}

      <NestedCards />
      <TokenReader />
      <ClassNameSurface />
    </div>
  );
}

function NestedCards() {
  return (
    // Adding your own `group/name` is optional, and only for disambiguating nested instances
    // of the SAME component.
    <Card className="group/outer">
      <Card>
        <span className="group-hover/outer:opacity-50">dims with the outer card only</span>
      </Card>
    </Card>
  );
}

function TokenReader() {
  const ref = React.useRef<HTMLDivElement>(null);

  // ✅ colour tokens read back as literals. Always pass a fallback — the hook returns it on the
  // server and until the layout effect runs.
  const fg = useCssVarValue('--color-neutral-foreground-1', ref, { fallback: '#242424' });

  // Record form: the return mirrors the input's keys. It is a fresh object every render, so
  // never use it as an effect dependency — read the slots.
  const { bg, radius } = useCssVarValue({ bg: '--color-neutral-background-1', radius: '--radius-medium' }, ref, {
    fallback: 'transparent',
  });

  // ⚠️ Spacing, text, stroke and --base-scale read back as UNEVALUATED calc() strings, because
  // the theme leaves its knobs unregistered. For a resolved length, read a real property.
  //   useCssVarValue('--text-base-300', ref)  →  'calc(14px * calc(1rem / 16px))'

  return (
    <div ref={ref}>
      <canvas data-fg={fg} data-bg={bg} data-radius={radius} />
    </div>
  );
}

function ClassNameSurface() {
  React.useEffect(() => {
    // ✅ the identity class is a valid selector, no escaping needed
    document.querySelectorAll('.fui-button');

    // ❌ buttonClassNames.root is the PAIR "fui-button group/fui-button" — invalid as a selector
    // document.querySelectorAll('.' + buttonClassNames.root);
  }, []);

  // ✅ the constant belongs in className, where the pair is exactly what you want
  return <div className={buttonClassNames.root} />;
}

/**
 * NOT AVAILABLE IN WINDMOD — Griffel escape hatches with no counterpart:
 *
 *   <Button customStyleHooks_unstable={…} />
 *   <FluentProvider customStyleHooks_unstable={…} overrides_unstable={…} applyStylesToPortals />
 *   useCustomStyleHook_unstable(…)
 *   <Button classNames={{ icon: '…' }} />        // no classNames prop; use slot className
 *
 * Restyle through CSS instead. Cascade layers make that the easier path — see references/overriding.md.
 */

/**
 * BROWSER FLOOR: Tooltip and Popover require native CSS anchor positioning, with no @supports
 * guard and no polyfill. On an engine without it the surface renders unpositioned at the viewport
 * origin. Either polyfill it, or keep these two on @fluentui/react-components — Griffel containers
 * compose over windmod children without trouble.
 */
export const AnchoredExample = () => (
  <Tooltip content="Save the document" relationship="label">
    <Button appearance="primary">Save</Button>
  </Tooltip>
);
