import type { IVerticalDividerPropsStyles, IVerticalDividerStyles } from './VerticalDivider.types';
import type { IStyleFunction } from '../../Utilities';

export const getStyles: IStyleFunction<IVerticalDividerPropsStyles, IVerticalDividerStyles> = (
  props: IVerticalDividerPropsStyles,
): IVerticalDividerStyles => {
  // eslint-disable-next-line deprecation/deprecation
  const { theme, getClassNames, className } = props;

  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }

  if (getClassNames) {
    const names = getClassNames(theme);
    return {
      wrapper: [names.wrapper],
      divider: [names.divider],
    };
  }

  return {
    wrapper: [
      {
        display: 'inline-flex',
        height: '100%',
        alignItems: 'center',
      },
      className,
    ],
    divider: [
      {
        width: 1,
        height: '100%',
        backgroundColor: theme.palette.neutralTertiaryAlt,
      },
    ],
  };
};
