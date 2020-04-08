import { IIconStyleProps } from './Icon.types';
import { ISvgIconStyles } from './SvgIcon.types';
import { mergeStyleSets } from '../../Styling';

/** Class names used in themeable and non-themeable Icon components */
export const classNames = mergeStyleSets({
  root: {
    selectors: {
      svg: {
        height: 50,
        width: 50,
      },
    },
  },
});
/** Class name used only in non-themeable Icon components */
export const MS_ICON = 'ms-Icon';

export const getStyles = (props: IIconStyleProps): ISvgIconStyles => {
  const { className, iconClassName, styles } = props;

  return {
    root: [classNames.root, iconClassName, className, styles && styles.root],
  };
};
