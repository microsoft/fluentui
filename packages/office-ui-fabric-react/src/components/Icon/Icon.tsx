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
  htmlElementProperties
} from '../../Utilities';

export const Icon: (props: IIconProps) => JSX.Element = (props: IIconProps) => {
  let customIcon = props.iconName === IconName.None;

  if (props.iconType === IconType.IconSheet) {
    let containerClassName = css('ms-Icon', 'ms-Icon-ImageContainer', props.className);
    let imageClassName = css('ms-Icon', 'ms-Icon-Image', props.imageCss);

    return (
      <div className={ containerClassName }>
        <img { ...getNativeProps(props, htmlElementProperties) } className={ imageClassName } />
      </div>
    );
  } else {
    let className = css('ms-Icon', customIcon ? '' : ('ms-Icon--' + IconName[props.iconName]), props.className);

    return <i { ...getNativeProps(props, htmlElementProperties) } className={ className } />;
  }
};