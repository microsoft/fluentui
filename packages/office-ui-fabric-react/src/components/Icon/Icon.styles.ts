import { IIconStyleProps, IIconStyles } from './Icon.types';

export const getStyles = (props: IIconStyleProps): IIconStyles => {
  const { className, iconClassName, isPlaceholder, isImage, styles, theme } = props;

  return {
    root: [
      isImage && 'ms-Icon-imageContainer',
      isPlaceholder && 'ms-Icon-placeHolder',
      {
        display: 'inline-block',
        // TODO: for testing, remove
        color: theme!.semanticColors.buttonText
      },
      isPlaceholder && {
        width: '1em'
      },
      isImage && {
        overflow: 'hidden'
      },
      iconClassName,
      className,
      styles && styles.root,
      styles && styles.imageContainer
    ]
  };
};
