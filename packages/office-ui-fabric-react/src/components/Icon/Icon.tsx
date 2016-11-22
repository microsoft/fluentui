/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { IIconProps } from './Icon.Props';
import { IconName } from './IconName';
import {
  css,
  getNativeProps,
  htmlElementProperties
} from '../../Utilities';

export const Icon: (props: IIconProps) => JSX.Element = (props: IIconProps) => {
  let customIcon = props.iconName === IconName.None;
  let className = css('ms-Icon', customIcon ? '' : ('ms-Icon--' + IconName[props.iconName]), props.className);

  return <i { ...getNativeProps(props, htmlElementProperties) } className={ className } />;
};