import { MakeStylesCSSValue, MakeStyles } from '../types';

type DirectionalProperties = 'border' | 'padding' | 'margin';

const positionMap = ['Top', 'Right', 'Bottom', 'Left'];

export function generateStyles(
  property: DirectionalProperties,
  suffix: '' | 'Color' | 'Style' | 'Width',
  ...values: MakeStylesCSSValue[]
): MakeStyles {
  const [firstValue, secondValue = firstValue, thirdValue = firstValue, fourthValue = secondValue] = values;
  const valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue];

  const styles: MakeStyles = {};

  for (let i = 0; i < valuesWithDefaults.length; i += 1) {
    if (valuesWithDefaults[i] || valuesWithDefaults[i] === 0) {
      styles[(property + positionMap[i] + suffix) as keyof MakeStyles] = valuesWithDefaults[i];
    }
  }

  return styles;
}
