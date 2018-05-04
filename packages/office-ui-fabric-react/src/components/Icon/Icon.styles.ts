import { IIconStyleProps, IIconStyles } from './Icon.types';

export const getStyles = (props: IIconStyleProps): IIconStyles => {
  const { className, iconClassName, isPlaceholder, isImage } = props;

  return {
    root: [
      isImage && 'ms-Icon-imageContainer',
      isPlaceholder && 'ms-Icon-placeHolder',
      {
        display: 'inline-block',
      },
      isPlaceholder && {
        width: '1em'
      },
      isImage && {
        overflow: 'hidden'
      },
      iconClassName,
      className
    ],
  };
};
