/* tslint:disable */
import * as React from 'react';
import styles = require('./Icon.scss')
/* tslint:enable */
import { IIconProps } from './Icon.Props';
import { IconType } from './IconType';
import { Image } from '../Image/Image';
import {
  css,
  getNativeProps,
  htmlElementProperties
} from '../../Utilities';

export const Icon: (props: IIconProps) => JSX.Element = (props: IIconProps) => {
  let customIcon = props.iconName === 'None';
  let iconClassName = props.iconName ? ('ms-Icon--' + props.iconName) : '';

  if (props.iconType === IconType.Image) {
    let containerClassName = css('ms-Icon', 'ms-Icon-imageContainer', styles.imageContainer, props.className);

    return (
      <div className={ containerClassName } >
        <Image { ...props.imageProps as any } />
      </div>
    );
  } else {
    let className = css('ms-Icon', customIcon ? '' : iconClassName, props.className);

    return <i { ...getNativeProps(props, htmlElementProperties) } className={ className } />;
  }
};