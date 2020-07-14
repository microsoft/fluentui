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
  // Icon is used a lot by other components.
  // It's likely to see expected cases which pass different className to the Icon.
  // Therefore setting a larger cache size.
  cacheSize: 100,
});

export class IconBase extends React.Component<IIconProps, IIconState> {
  constructor(props: IIconProps) {
    super(props);
    this.state = {
      imageLoadError: false,
    };
  }

  public render() {
    const { children, className, styles, iconName, imageErrorAs, theme } = this.props;
    const isPlaceholder = typeof iconName === 'string' && iconName.length === 0;
    const isImage =
      // eslint-disable-next-line deprecation/deprecation
      !!this.props.imageProps || this.props.iconType === IconType.image || this.props.iconType === IconType.Image;
    const iconContent = getIconContent(iconName) || {};
    const { iconClassName, children: iconContentChildren } = iconContent;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      iconClassName,
      isImage,
      isPlaceholder,
    });

    const RootType = isImage ? 'span' : 'i';
    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, htmlElementProperties, ['role']);
    const { imageLoadError } = this.state;
    const imageProps: IImageProps = {
      ...this.props.imageProps,
      onLoadingStateChange: this._onImageLoadingStateChange,
    };
    const ImageType = (imageLoadError && imageErrorAs) || Image;

    // eslint-disable-next-line deprecation/deprecation
    const accessibleName = imageProps.alt || this.props['aria-label'] || this.props.ariaLabel;
    const hasName = !!(accessibleName || this.props['aria-labelledby'] || imageProps['aria-labelledby']);
    const containerProps = hasName
      ? {
        role: isImage ? undefined : 'img',
        'aria-label': isImage ? undefined : this.props.ariaLabel
      }
      : {
        'aria-hidden': true
      };

    return (
      <RootType data-icon-name={iconName} {...containerProps} {...nativeProps} className={classNames.root}>
        {isImage ? <ImageType {...imageProps} alt={accessibleName} /> : children || iconContentChildren}
      </RootType>
    );
  }

  private _onImageLoadingStateChange = (state: ImageLoadState): void => {
    if (this.props.imageProps && this.props.imageProps.onLoadingStateChange) {
      this.props.imageProps.onLoadingStateChange(state);
    }
    if (state === ImageLoadState.error) {
      this.setState({ imageLoadError: true });
    }
  };
}
