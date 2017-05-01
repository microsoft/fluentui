/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import { IIconProps, IconType } from './Icon.Props';
import { Image } from '../Image/Image';
import {
  getNativeProps,
  htmlElementProperties
} from '../../Utilities';
import { css, iconClassNames } from '@uifabric/styling';
import { getStyles } from './Icon.styles';

export function Icon(props: IIconProps): JSX.Element {
  let { className, classNames, iconName } = props;
  let styles = getStyles(classNames);

  if (props.iconType === IconType.image || props.iconType === IconType.Image) {
    let containerClassName = css(
      'ms-Icon',
      'ms-Icon-imageContainer',
      styles.imageContainer,
      className
    );

    return (
      <div className={ containerClassName } >
        <Image { ...props.imageProps as any } />
      </div>
    );
  } else {
    let iconMemberName = iconName ? iconName.charAt(0).toLowerCase() + iconName.substr(1) : '';

    return (
      <i
        { ...getNativeProps(props, htmlElementProperties) }
        className={ css('ms-Icon', iconClassNames[iconMemberName], props.className) }
      />
    );
  }
}