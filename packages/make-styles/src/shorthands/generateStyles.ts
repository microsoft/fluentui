import { MakeStylesCSSValue, MakeStylesStrictCSSObject } from '../types';

type DirectionalProperties = 'border' | 'padding' | 'margin';

const positionMap = ['Top', 'Right', 'Bottom', 'Left'];

export function generateStyles(
  property: DirectionalProperties,
  suffix: '' | 'Color' | 'Style' | 'Width',
  ...values: MakeStylesCSSValue[]
): MakeStylesStrictCSSObject {
  const [firstValue, secondValue = firstValue, thirdValue = firstValue, fourthValue = secondValue] = values;
  const valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue];

  const styles: MakeStylesStrictCSSObject = {};

  for (let i = 0; i < valuesWithDefaults.length; i += 1) {
    if (valuesWithDefaults[i] || valuesWithDefaults[i] === 0) {
      const newKey = (property + positionMap[i] + suffix) as keyof MakeStylesStrictCSSObject;

      styles[newKey] = (valuesWithDefaults[i] as unknown) as undefined;
    }
  }

  return styles;
}
