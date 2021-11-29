import { MakeStylesStyle, MakeStylesStyleRule } from '@fluentui/make-styles';
import { Theme } from '@fluentui/react-theme';

export const flexStyles: MakeStylesStyle = {
  display: 'flex',
  flexDirection: 'column',
};

export const gridStyles = (gridGap: string): MakeStylesStyle => ({
  display: 'grid',
  gridRowGap: gridGap,
});

export const typography: Record<'text' | 'header', MakeStylesStyleRule<Theme>> = {
  text: theme => ({ fontWeight: theme.fontWeightRegular }),
  header: { fontWeight: 'bold' },
};
