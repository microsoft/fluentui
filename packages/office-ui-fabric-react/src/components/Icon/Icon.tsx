/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { IIconProps, IconType } from './Icon.Props';
import { Image } from '../Image/Image';
import {
  css,
  getNativeProps,
  htmlElementProperties
} from '../../Utilities';
import { getIcon, IIconRecord } from '../../Styling';
import { getStyles } from './Icon.styles';

export function Icon(props: IIconProps): JSX.Element {
  let {
    ariaLabel,
    className,
    styles: customStyles,
    iconName
   } = props;
  let styles = getStyles(customStyles);

  if (props.iconType === IconType.image || props.iconType === IconType.Image) {
    let containerClassName = css(
      'ms-Icon',
      'ms-Icon-imageContainer',
      styles.root,
      styles.imageContainer,
      className
    );

    return (
      <div className={
        css(
          containerClassName,
          styles.root
        ) }
      >
        <Image { ...props.imageProps as any } />
      </div>
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
        aria-label={ ariaLabel }
        { ...(ariaLabel ? {} : {
          role: 'presentation',
          'aria-hidden': true,
          'data-icon-name': iconName,
        }) }
        { ...getNativeProps(props, htmlElementProperties) }
        className={
          css(
            'ms-Icon', // dangerous?
            iconDefinition.subset.className,
            styles.root,
            props.className
          ) }
      >
        { iconDefinition.code }
      </i>
    );
  }
}