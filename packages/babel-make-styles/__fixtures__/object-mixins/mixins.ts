import { MakeStyles } from '@fluentui/make-styles';

export const flexStyles: MakeStyles = {
  display: 'flex',
  flexDirection: 'column',
};

export const gridStyles = (gridGap: string): MakeStyles => ({
  display: 'grid',
  gridGap,
});

export const typography: Record<'text' | 'header', MakeStyles> = {
  text: { fontWeight: 'normal' },
  header: { fontWeight: 'bold' },
};
