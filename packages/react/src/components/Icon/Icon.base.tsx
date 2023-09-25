import * as React from 'react';

import { IconType } from './Icon.types';
import { Image } from '../Image/Image';
import { ImageLoadState } from '../Image/Image.types';
import { getNativeProps, htmlElementProperties, classNamesFunction } from '../../Utilities';
import { getIconContent } from './FontIcon';
import type { IIconProps, IIconStyleProps, IIconStyles } from './Icon.types';
import type { IImageProps } from '../Image/Image.types';

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
    const { iconClassName, children: iconContentChildren, mergeImageProps } = iconContent;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      iconClassName,
      isImage,
      isPlaceholder,
    });

    const RootType = isImage ? 'span' : 'i';
    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, htmlElementProperties, [
      'aria-label',
    ]);
    const { imageLoadError } = this.state;
    const imageProps: IImageProps = {
      ...this.props.imageProps,
      onLoadingStateChange: this._onImageLoadingStateChange,
    };
    const ImageType = (imageLoadError && imageErrorAs) || Image;

    // eslint-disable-next-line deprecation/deprecation
    const ariaLabel = this.props['aria-label'] || this.props.ariaLabel;
    const accessibleName = imageProps.alt || ariaLabel || this.props.title;
    const hasName = !!(
      accessibleName ||
      this.props['aria-labelledby'] ||
      imageProps['aria-label'] ||
      imageProps['aria-labelledby']
    );
    const containerProps = hasName
      ? {
          role: isImage || mergeImageProps ? undefined : 'img',
          'aria-label': isImage || mergeImageProps ? undefined : accessibleName,
        }
      : {
          'aria-hidden': true,
        };

    let finalIconContentChildren = iconContentChildren;

    if (mergeImageProps && iconContentChildren && typeof iconContentChildren === 'object' && accessibleName) {
      finalIconContentChildren = React.cloneElement(iconContentChildren, {
        alt: accessibleName,
      });
    }

    return (
      <RootType
        data-icon-name={iconName}
        {...containerProps}
        {...nativeProps}
        {...(mergeImageProps
          ? {
              title: undefined,
              'aria-label': undefined,
            }
          : {})}
        className={classNames.root}
      >
        {isImage ? <ImageType {...imageProps} /> : children || finalIconContentChildren}
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
