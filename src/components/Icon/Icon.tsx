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
  let iconName = IconName[props.iconName];

  return <i { ...getNativeProps(props, htmlElementProperties) } className={ css('ms-Icon', 'ms-Icon--' + iconName, props.className) } />;
};