import * as React from 'react';
import { css, getNativeProps, htmlElementProperties } from '@uifabric/utilities';
import * as classes from './SvgIcon.scss';
import { ISvgIconProps } from './SvgIcon.types';
import { SvgIconCreateFnParams } from './types';

const createSvgIcon = <TProps = {}>({ svg, displayName }: SvgIconCreateFnParams<TProps>) => {
  const Component: React.FC<React.HTMLAttributes<HTMLSpanElement> & TProps & ISvgIconProps> = props => {
    const { className, style = {} } = props;

    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLElement>>(props, htmlElementProperties);
    const containerProps = props['aria-label']
      ? {}
      : {
          role: 'presentation',
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
      svg({ classes, props }),
    );
  };

  Component.displayName = displayName;

  return Component;
};

export default createSvgIcon;
