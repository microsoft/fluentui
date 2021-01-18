import { MakeStyles } from '@fluentui/make-styles';

export const flexStyles: MakeStyles = {
  display: 'flex',
  flexDirection: 'column',
};

export const gridStyles = (gridGap: string): MakeStyles => ({
  display: 'grid',
  gridGap,
});
