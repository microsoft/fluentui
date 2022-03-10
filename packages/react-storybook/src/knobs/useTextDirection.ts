import { select } from '@storybook/addon-knobs';

const directionSelectorLabel = 'Text Direction';

type TextDirection = 'ltr' | 'rtl';

const directionOptions: { label: string; direction: TextDirection }[] = [
  { label: 'LTR', direction: 'ltr' },
  { label: 'RTL', direction: 'rtl' },
];

export const useTextDirection = (): { label: string; direction: TextDirection } => {
  // Casting any here due to issue: https://github.com/storybookjs/storybook/issues/9751
  const directionLabels = directionOptions.map(option => ({ label: option.label }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { label } = select(directionSelectorLabel, directionLabels, directionLabels[0] as any);

  const { direction } = directionOptions.find(pair => pair.label === label) || { direction: 'ltr' };
  return { label, direction };
};
