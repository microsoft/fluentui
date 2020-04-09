import { IIconStyleProps } from './Icon.types';
import { ISvgIconStyles } from './SvgIcon.types';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

/** Class names used in themeable and non-themeable Icon components */
export const classes = mergeStyleSets({
  root: {},
  svg: {
    height: '100%',
    width: '100%',
  },
});

/** Class name used only in non-themeable Icon components */
export const MS_ICON = 'ms-Icon';

export const getStyles = (props: IIconStyleProps): ISvgIconStyles => {
  const { className, iconClassName, styles } = props;

  return {
    root: [classes.root, iconClassName, className, styles && styles.root],
    svg: [classes.svg],
  };
};
