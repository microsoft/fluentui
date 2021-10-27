import * as React from 'react';
import { css, getNativeProps, htmlElementProperties } from '@fluentui/utilities';
import * as classes from './SvgIcon.scss';
import { useIconSubset } from '@fluentui/react-icon-provider';
import type { ISvgIconProps } from './SvgIcon.types';
import type { SvgIconCreateFnParams } from './types';

const createSvgIcon = <TProps = {}>({ svg, displayName }: SvgIconCreateFnParams<TProps>) => {
  const Component: React.FC<React.HTMLAttributes<HTMLSpanElement> & TProps & ISvgIconProps> = props => {
    const { className, style = {} } = props;
    const icons = useIconSubset(); // TODO: handle fontFace and styles

    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLElement>>(props, htmlElementProperties);
    const containerProps =
      props['aria-label'] || props['aria-labelledby'] || props.title
        ? {
            role: 'img',
          }
        : {
            ['aria-hidden']: true,
          };

    return React.createElement(
      'span',
      {
        ...containerProps,
        ...nativeProps,
        className: css(classes.root, className),
        style,
      },
      icons?.icons?.[displayName] ? icons.icons[displayName] : svg({ classes, props }),
    );
  };

  Component.displayName = displayName;

  return Component;
};

export default createSvgIcon;
