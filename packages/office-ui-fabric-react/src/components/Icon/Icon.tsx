/* tslint:disable */
import * as React from 'react';
import './Icon.scss'
/* tslint:enable */
import { IIconProps } from './Icon.Props';
import { IconName } from './IconName';
import { IconType } from './IconType';
import { Image } from '../Image/Image'
import {
  css,
  getNativeProps,
  htmlElementProperties
} from '../../Utilities';

export const Icon: (props: IIconProps) => JSX.Element = (props: IIconProps) => {
  let customIcon = props.iconName === IconName.None;

  if (props.iconType === IconType.Image) {
    let containerClassName = css('ms-Icon', 'ms-Icon-imageContainer', props.className);

    return (
      <div className={ containerClassName } >
        <Image { ...props.imageProps as any } />
      </div>
    );
  } else {
    let className = css('ms-Icon', customIcon ? '' : ('ms-Icon--' + IconName[props.iconName]), props.className);

    return <i { ...getNativeProps(props, htmlElementProperties) } className={ className } />;
  }
};