import { mergeStyleSets } from '../../Styling';
import type { IIconStyleProps, IIconStyles } from './Icon.types';

/** Class names used in themeable and non-themeable Icon components */
export const classNames = mergeStyleSets({
  root: {
    display: 'inline-block',
    textDecoration: 'inherit',
  },
  placeholder: [
    'ms-Icon-placeHolder',
    {
      width: '1em',
    },
  ],
  image: [
    'ms-Icon-imageContainer',
    {
      overflow: 'hidden',
    },
  ],
});
/** Class name used only in non-themeable Icon components */
export const MS_ICON = 'ms-Icon';

export const getStyles = (props: IIconStyleProps): IIconStyles => {
  const { className, iconClassName, isPlaceholder, isImage, styles } = props;

  return {
    root: [
      isPlaceholder && classNames.placeholder,
      classNames.root,
      isImage && classNames.image,
      iconClassName,
      className,
      styles && styles.root,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      styles && styles.imageContainer,
    ],
  };
};
