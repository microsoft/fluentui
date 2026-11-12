import { coreComponents } from '../components/core';
import { describeParity } from '../harness';
import type { ComponentSpec, ParityVariant } from '../harness';
import { patternMatrix, tolerate, withClass } from './matrix';
import { useStateStyles } from './useStateStyles.styles';

/**
 * Variants whose component styles are compound selectors in CSS Modules (`.primary:hover`, `.small:where(.withIcon)`,
 * `.subtle:hover .fui-Button__icon`) while Griffel resolved them to single atomic classes.
 */
const variants: Record<string, ParityVariant[]> = {
  Button: [
    { appearance: 'primary', size: 'small' },
    { appearance: 'primary', size: 'large' },
    { appearance: 'subtle', shape: 'circular' },
    { appearance: 'outline', shape: 'square' },
    { appearance: 'transparent', size: 'small' },
    { appearance: 'secondary', children: undefined },
    { appearance: 'subtle', children: undefined },
  ],
  ToggleButton: [
    { appearance: 'secondary', checked: false },
    { appearance: 'primary', checked: false },
    { appearance: 'outline', checked: true },
    { appearance: 'transparent', checked: true },
    { appearance: 'subtle', checked: false },
    { size: 'small', checked: true },
  ],
  Checkbox: [{ size: 'large', checked: true }, { shape: 'circular' }, { size: 'large', checked: 'mixed' }],
  Switch: [{ checked: false }, { checked: true, labelPosition: 'above' }],
  Input: [{ size: 'large' }, { appearance: 'filled-lighter' }, { size: 'small', appearance: 'underline' }],
  Link: [{ inline: true, appearance: 'subtle' }],
};

const components = Object.fromEntries(
  Object.entries(variants).map(([name, componentVariants]): [string, ComponentSpec] => [
    name,
    { ...coreComponents[name], variants: componentVariants },
  ]),
);

describeParity('app pattern: variant and state overrides', components, {
  scenarios: ['stateful makeStyles override', 'slot makeStyles override'],
});

// The variants themselves, without app styles: component parity for combinations the main specs don't render.
describeParity('app pattern: variants without app styles', components, { scenarios: ['no app styles'] });

describeParity(
  'app pattern: every state override on variants',
  patternMatrix(components, {
    // The app's `:focus-within` border now also applies pressed and focused (Input), where Griffel's component
    // `:active`/`:focus-within` border rule won.
    'every state': tolerate(withClass(useStateStyles, 'everyState'), {
      'root border-top-color': ['--colorPaletteBerryBorderActive'],
      'root border-bottom-color': ['--colorPaletteBerryBorderActive'],
      'root border-inline-start-color': ['--colorPaletteBerryBorderActive'],
      'root border-inline-end-color': ['--colorPaletteBerryBorderActive'],
    }),
  }),
  { scenarios: ['app pattern'] },
);
