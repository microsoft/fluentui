import { IVerticalDividerPropsStyles, IVerticalDividerStyles } from './VerticalDivider.types';
import { IStyleFunction } from '../../Utilities';

export const getStyles: IStyleFunction<IVerticalDividerPropsStyles, IVerticalDividerStyles> = (
  props: IVerticalDividerPropsStyles
): IVerticalDividerStyles => {
  const { theme, getClassNames } = props;

  if (!theme) {
    return {
      wrapper: {},
      divider: {}
    };
  }

  if (getClassNames) {
    const names = getClassNames(theme);
    return {
      wrapper: [names.wrapper],
      divider: [names.divider]
    };
  }

  return {
    wrapper: {
      display: 'inline-flex',
      height: '100%',
      alignItems: 'center'
    },
    divider: {
      width: 1,
      height: '100%',
      backgroundColor: theme.palette.neutralTertiaryAlt
    }
  };
};
