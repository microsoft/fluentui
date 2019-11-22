import * as React from 'react';

import { IIconProps, IconType, IIconStyleProps, IIconStyles } from './Icon.types';
import { Image } from '../Image/Image';
import { ImageLoadState, IImageProps } from '../Image/Image.types';
import { getNativeProps, htmlElementProperties, classNamesFunction } from '../../Utilities';
import { getIconContent } from './FontIcon';

export interface IIconState {
  imageLoadError: boolean;
}

const getClassNames = classNamesFunction<IIconStyleProps, IIconStyles>({
  disableCaching: true
});

export class IconBase extends React.Component<IIconProps, IIconState> {
  constructor(props: IIconProps) {
    super(props);
    this.state = {
      imageLoadError: false
    };
  }

  public render() {
    const { className, styles, iconName, imageErrorAs, theme } = this.props;
    const isPlaceholder = typeof iconName === 'string' && iconName.length === 0;
    const isImage = this.props.iconType === IconType.image || this.props.iconType === IconType.Image || !!this.props.imageProps;
    const { iconClassName, children } = getIconContent(iconName);

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      iconClassName,
      isImage,
      isPlaceholder
    });

    const RootType = isImage ? 'div' : 'i';
    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, htmlElementProperties, ['aria-label']);
    const { imageLoadError } = this.state;
    const imageProps: IImageProps = {
      ...this.props.imageProps,
      onLoadingStateChange: this.onImageLoadingStateChange
    };
    const ImageType = (imageLoadError && imageErrorAs) || Image;

    const ariaLabel = this.props.ariaLabel || this.props['aria-label'];
    const containerProps = ariaLabel
      ? {
          'aria-label': ariaLabel
        }
      : {
          'aria-hidden': this.props['aria-labelledby'] || imageProps['aria-labelledby'] ? false : true
        };

    return (
      <RootType data-icon-name={iconName} {...containerProps} {...nativeProps} className={classNames.root}>
        {isImage ? <ImageType {...imageProps} /> : children}
      </RootType>
    );
  }

  private onImageLoadingStateChange = (state: ImageLoadState): void => {
    if (this.props.imageProps && this.props.imageProps.onLoadingStateChange) {
      this.props.imageProps.onLoadingStateChange(state);
    }
    if (state === ImageLoadState.error) {
      this.setState({ imageLoadError: true });
    }
  };
}
