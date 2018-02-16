/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { IIconProps, IconType } from './Icon.types';
import { Image } from '../Image/Image';
import { ImageLoadState } from '../Image/Image.types';
import {
  css,
  getNativeProps,
  htmlElementProperties
} from '../../Utilities';
import { getIcon, IIconRecord } from '../../Styling';
import { getClassNames } from './Icon.classNames';

export interface IIconState {
  imageLoadError: boolean;
}

export class Icon extends React.Component<IIconProps, IIconState> {
  constructor(props: IIconProps) {
    super(props);
    this.state = {
      imageLoadError: false,
    }
  }

  private onImageLoadingStateChange = (state: ImageLoadState): void => {
    if (this.props.imageProps && this.props.imageProps.onLoadingStateChange) {
      this.props.imageProps.onLoadingStateChange(state);
    }
    if (state == ImageLoadState.error) {
      this.setState({ imageLoadError: true });
    }
  }

  render() {
    let {
    ariaLabel,
      className,
      styles,
      iconName,
      imageErrorAs,
   } = this.props;
    let classNames = getClassNames(
      styles
    );

    const containerProps = ariaLabel ? { 'aria-label': ariaLabel, 'data-icon-name': iconName, } : {
      role: 'presentation',
      'aria-hidden': true,
      'data-icon-name': iconName,
    }

    if (this.props.iconType === IconType.image || this.props.iconType === IconType.Image) {
      let containerClassName = css(
        'ms-Icon-imageContainer',
        classNames.root,
        classNames.imageContainer,
        className
      );
      let { imageLoadError } = this.state;
      let imageProps = { ...this.props.imageProps, onLoadingStateChange: this.onImageLoadingStateChange }
      let ImageType = imageLoadError && imageErrorAs || Image;
      return (
        <div
          {...containerProps}
          className={
            css(
              containerClassName,
              classNames.root
            ) }
        >
          <ImageType { ...imageProps } />
        </div>
      );
    } else if (typeof iconName === 'string' && iconName.length === 0) {
      return (
        <i
          {...containerProps}
          { ...getNativeProps(this.props, htmlElementProperties) }
          className={
            css(
              'ms-Icon-placeHolder',
              classNames.rootHasPlaceHolder,
              this.props.className
            ) }
        />
      );
    } else {
      let iconDefinition = getIcon(iconName) || {
        subset: {
          className: undefined
        },
        code: undefined
      };

      return (
        <i
          {...containerProps}
          { ...getNativeProps(this.props, htmlElementProperties) }
          className={
            css(
              iconDefinition.subset.className,
              classNames.root,
              this.props.className
            ) }
        >
          { iconDefinition.code }
        </i>
      );
    }
  }
};
