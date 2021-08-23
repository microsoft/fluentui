import * as React from 'react';
import { classNames, MS_ICON } from './Icon.styles';
import { css, getNativeProps, htmlElementProperties, memoizeFunction } from '../../Utilities';
import { getIcon } from '../../Styling';
import type { IFontIconProps } from './Icon.types';
import type { IIconRecord, IIconSubsetRecord } from '../../Styling';

export interface IIconContent {
  children?: string | JSX.Element;
  iconClassName?: string;
  fontFamily?: string;
  mergeImageProps?: boolean;
}

export const getIconContent = memoizeFunction(
  (iconName?: string): IIconContent | null => {
    const { code, subset }: Pick<IIconRecord, 'code'> & { subset: Partial<IIconSubsetRecord> } = getIcon(iconName) || {
      subset: {},
      code: undefined,
    };

    if (!code) {
      return null;
    }

    return {
      children: code,
      iconClassName: subset.className,
      fontFamily: subset.fontFace && subset.fontFace.fontFamily,
      mergeImageProps: subset.mergeImageProps,
    };
  },
  undefined,
  true /*ignoreNullOrUndefinedResult */,
);

/**
 * Fast icon component which only supports font glyphs (not images) and can't be targeted by customizations.
 * To style the icon, use `className` or reference `ms-Icon` in CSS.
 * {@docCategory Icon}
 */
export const FontIcon: React.FunctionComponent<IFontIconProps> = props => {
  const { iconName, className, style = {} } = props;
  const iconContent = getIconContent(iconName) || {};
  const { iconClassName, children, fontFamily, mergeImageProps } = iconContent;

  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLElement>>(props, htmlElementProperties);
  const accessibleName = props['aria-label'] || props.title;
  const containerProps =
    props['aria-label'] || props['aria-labelledby'] || props.title
      ? {
          role: mergeImageProps ? undefined : 'img',
        }
      : {
          'aria-hidden': true,
        };

  let finalChildren = children;

  if (mergeImageProps) {
    if (typeof children === 'object' && typeof children.props === 'object' && accessibleName) {
      finalChildren = React.cloneElement(children, { alt: accessibleName });
    }
  }

  return (
    <i
      data-icon-name={iconName}
      {...containerProps}
      {...nativeProps}
      {...(mergeImageProps
        ? {
            title: undefined,
            'aria-label': undefined,
          }
        : {})}
      className={css(MS_ICON, classNames.root, iconClassName, !iconName && classNames.placeholder, className)}
      // Apply the font family this way to ensure it doesn't get overridden by Fabric Core ms-Icon styles
      // https://github.com/microsoft/fluentui/issues/10449
      style={{ fontFamily, ...style }}
    >
      {finalChildren}
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
