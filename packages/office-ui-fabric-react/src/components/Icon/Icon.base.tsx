import * as React from 'react';
import { IIconProps, IconType, IIconStyleProps, IIconStyles } from './Icon.types';
import { Image } from '../Image/Image';
import { getNativeProps, htmlElementProperties, classNamesFunction } from '../../Utilities';
import { getIcon, IIconRecord } from '../../Styling';

const getClassNames = classNamesFunction<IIconStyleProps, IIconStyles>();

export const IconBase = (props: IIconProps): JSX.Element => {
  const {
    ariaLabel,
    as: RootType = 'i',
    className,
    getStyles,
    iconName,
    iconType
   } = props;
  const iconDefinition = getIcon(iconName) || {
    subset: {
      className: undefined,
    },
    code: undefined
  };
  const classNames = getClassNames(
    getStyles,
    {
      className,
      isPlaceholder: typeof iconName === 'string' && iconName.length === 0,
      isImage: iconType === IconType.image,
      subsetClassName: iconDefinition.subset.className
    }
  );

  return (
    <RootType
      { ...getNativeProps(props, htmlElementProperties) }
      className={ classNames.root }
      role='presentation'
      aria-hidden='true'
      aria-label={ ariaLabel }
      { ...(ariaLabel ? {} : { 'aria-hidden': true }) }
      data-icon-name={ iconName || '' }
    >
      { iconType === IconType.image && (
        <Image { ...props.imageProps } />
      ) }
      { iconDefinition.code }
    </RootType>
  );
};
