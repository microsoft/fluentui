import { coreComponents } from '../components/core';
import { describeParity } from '../harness';
import type { ComponentSpec, ParityVariant } from '../harness';
import { patternMatrix, tolerate, withClass } from './matrix';
import { useStateStyles } from './useStateStyles.styles';

/** `disabledFocusable` variants are also sampled pressed and keyboard focused. */
const variants: Record<string, ParityVariant[]> = {
  Button: [{ disabled: true }, { disabledFocusable: true }, { appearance: 'primary', disabledFocusable: true }],
  ToggleButton: [
    { disabled: true, checked: true },
    { disabledFocusable: true, checked: true },
  ],
  Link: [{ disabled: true }, { disabledFocusable: true }],
  Checkbox: [{ disabled: true }, { disabled: true, checked: true }],
  Switch: [{ disabled: true, checked: true }],
  Input: [{ disabled: true }],
  Select: [{ disabled: true }],
};

/**
 * App disabled rules (`:disabled:hover`, `[aria-disabled]:hover`, a class with `:hover`) now also apply hovered and
 * pressed, where Griffel's component `.disabled:hover`-style rules won by bucket.
 */
const disabledLook = {
  'root background-color': ['--colorPaletteBerryBackground2', '--colorPaletteBlueBackground2'],
  'root color': ['--colorPaletteBerryForeground2'],
};

const components = Object.fromEntries(
  Object.entries(variants).map(([name, componentVariants]): [string, ComponentSpec] => [
    name,
    { ...coreComponents[name], variants: componentVariants },
  ]),
);

// The variants themselves, without app styles: component parity for combinations the main specs don't render.
describeParity('app pattern: disabled variants without app styles', components, { scenarios: ['no app styles'] });

describeParity(
  'app pattern: disabled overrides',
  patternMatrix(components, {
    ':disabled': tolerate(withClass(useStateStyles, 'disabledPseudo'), disabledLook),
    '[aria-disabled]': tolerate(withClass(useStateStyles, 'ariaDisabled'), disabledLook),
    '[disabled]': tolerate(withClass(useStateStyles, 'disabledAttribute'), disabledLook),
    'disabled class': tolerate(withClass(useStateStyles, 'disabledClass'), disabledLook),
  }),
  { scenarios: ['app pattern'] },
);
