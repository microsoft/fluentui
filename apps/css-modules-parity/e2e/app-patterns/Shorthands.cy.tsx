import { coreComponents } from '../components/core';
import { describeParity } from '../harness';
import { patternMatrix, pick, withClass } from './matrix';
import { useShorthandStyles } from './useShorthandStyles.styles';

const families = [
  'padding',
  'paddingInline',
  'paddingBlock',
  'paddingLeft',
  'margin',
  'marginInline',
  'border',
  'borderColor',
  'borderWidth',
  'borderLeft',
  'borderRadius',
  'outline',
  'gap',
  'flex',
  'overflow',
  'textDecoration',
] as const;

describeParity(
  'app pattern: CSS shorthand overrides',
  patternMatrix(
    pick(coreComponents, ['Button', 'Input', 'Checkbox', 'Link']),
    Object.fromEntries(families.map(family => [family, withClass(useShorthandStyles, family)])),
  ),
  { scenarios: ['app pattern'] },
);
