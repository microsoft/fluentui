/* tslint:disable */
import * as React from 'react';
import './Icon.scss'
/* tslint:enable */
import { IIconProps } from './Icon.Props';
import { IconName } from './IconName';
import { IconType } from './IconType';
import {
  css,
  getNativeProps,
  htmlElementProperties,
  imageProperties
} from '../../Utilities';

export const Icon: (props: IIconProps) => JSX.Element = (props: IIconProps) => {
  let customIcon = props.iconName === IconName.None;

  if (props.iconType === IconType.IconSheet) {
    let containerClassName = css('ms-Icon', 'ms-Icon-imageContainer', props.className);
    let imageClassName = css('ms-Icon', 'ms-Icon-Image', props.imageClassName);

    return (
      <div className={ containerClassName }>
        <img { ...getNativeProps(props, imageProperties) } className={ imageClassName } />
      </div>
    );
  } else {
    let className = css('ms-Icon', customIcon ? '' : ('ms-Icon--' + IconName[props.iconName]), props.className);

    return <i { ...getNativeProps(props, htmlElementProperties) } className={ className } />;
  }
};