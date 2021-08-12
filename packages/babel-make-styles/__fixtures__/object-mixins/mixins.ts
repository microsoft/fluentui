import { MakeStyles, MakeStylesStyleRule } from '@fluentui/make-styles';
import { Theme } from '@fluentui/react-theme';

export const flexStyles: MakeStyles = {
  display: 'flex',
  flexDirection: 'column',
};

export const gridStyles = (gridGap: string): MakeStyles => ({
  display: 'grid',
  gridGap,
});

export const typography: Record<'text' | 'header', MakeStylesStyleRule<Theme>> = {
  text: theme => ({ fontWeight: theme.global.type.fontWeights.regular }),
  header: { fontWeight: 'bold' },
};
