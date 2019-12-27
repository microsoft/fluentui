import * as React from 'react';

import { IFontIconProps } from './Icon.types';
import { classNames, MS_ICON } from './Icon.styles';
import { css, getNativeProps, htmlElementProperties, memoizeFunction } from '../../Utilities';
import { getIcon, IIconRecord, IIconSubsetRecord } from '../../Styling';

export const getIconContent = memoizeFunction((iconName?: string) => {
  const { code, subset }: Pick<IIconRecord, 'code'> & { subset: Partial<IIconSubsetRecord> } = getIcon(iconName) || {
    subset: {},
    code: undefined
  };

  return {
    children: code,
    iconClassName: subset.className,
    fontFamily: subset.fontFace && subset.fontFace.fontFamily
  };
});

export const getIconContentWithValidIconCaching = memoizeFunction(
  (iconName?: string) => {
    const { code, subset }: Pick<IIconRecord, 'code'> & { subset: Partial<IIconSubsetRecord> } = getIcon(iconName) || {
      subset: {},
      code: undefined
    };

    if (!code) {
      return null;
    }

    return {
      children: code,
      iconClassName: subset.className
    };
  },
  undefined,
  true /*doNotCacheIfCallbackResultIsNull */
);

/**
 * Fast icon component which only supports font glyphs (not images) and can't be targeted by customizations.
 * To style the icon, use `className` or reference `ms-Icon` in CSS.
 * {@docCategory Icon}
 */
export const FontIcon: React.FunctionComponent<IFontIconProps> = props => {
  const { iconName, className, style = {} } = props;
  const { iconClassName, children, fontFamily } = getIconContent(iconName);

  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLElement>>(props, htmlElementProperties);
  const containerProps = props['aria-label']
    ? {}
    : {
        role: 'presentation',
        'aria-hidden': true
      };

  return (
    <i
      data-icon-name={iconName}
      {...containerProps}
      {...nativeProps}
      className={css(MS_ICON, classNames.root, iconClassName, !iconName && classNames.placeholder, className)}
      // Apply the font family this way to ensure it doesn't get overridden by Fabric Core ms-Icon styles
      // https://github.com/OfficeDev/office-ui-fabric-react/issues/10449
      style={{ fontFamily, ...style }}
    >
      {children}
    </i>
  );
};

/**
 * Memoized helper for rendering a FontIcon.
 * @param iconName - The name of the icon to use from the icon font.
 * @param className - Class name for styling the icon.
 * @param ariaLabel - Label for the icon for the benefit of screen readers.
 * {@docCategory Icon}
 */
export const getFontIcon = memoizeFunction((iconName: string, className?: string, ariaLabel?: string) => {
  return FontIcon({ iconName, className, 'aria-label': ariaLabel });
});
