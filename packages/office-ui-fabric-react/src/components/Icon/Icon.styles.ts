import { IIconStyleProps, IIconStyles } from './Icon.types';
import { mergeStyleSets } from '../../Styling';

/** Class names used in themeable and non-themeable Icon components */
export const classNames = mergeStyleSets({
  root: {
    display: 'inline-block'
  },
  placeholder: [
    'ms-Icon-placeHolder',
    {
      width: '1em'
    }
  ],
  image: [
    'ms-Icon-imageContainer',
    {
      overflow: 'hidden'
    }
  ]
});

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
      styles && styles.imageContainer
    ]
  };
};
