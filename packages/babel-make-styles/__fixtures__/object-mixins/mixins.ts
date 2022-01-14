import { MakeStylesStyle } from '@fluentui/make-styles';
import { tokens } from '@fluentui/react-theme';

export const flexStyles: MakeStylesStyle = {
  display: 'flex',
  flexDirection: 'column',
};

export const gridStyles = (gridGap: string): MakeStylesStyle => ({
  display: 'grid',
  gridRowGap: gridGap,
});

export const typography: Record<'text' | 'header', MakeStylesStyle> = {
  text: { fontWeight: tokens.fontWeightRegular },
  header: { fontWeight: 'bold' },
};
