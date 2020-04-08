import * as React from 'react';
// @ts-ignore
import { css, getNativeProps, htmlElementProperties } from '@uifabric/utilities/src';
import { classNames, MS_ICON } from 'office-ui-fabric-react/src/components/Icon/SvgIcon.styles';
import { ISvgIconProps } from 'office-ui-fabric-react/src/components/Icon/SvgIcon.types';

export type SvgIconFuncArg<TProps = ISvgIconProps> = {
  classNames: { [iconSlot: string]: string }; // renamed from classes
  // rtl: boolean; // how do we support this?
  props: TProps;
};

export type SvgIconChildrenFn<TProps = ISvgIconProps> = (svgIcon: SvgIconFuncArg<TProps>) => React.ReactNode;

export type SvgIconCreateFnParams<TProps> = {
  svg: SvgIconChildrenFn<TProps & ISvgIconProps>;
  displayName: string;
  // handledProps?: (keyof TProps)[];
};

// TODO: SvgIconProps are different...
const createSvgIcon = <TProps = {}>({ svg, displayName }: SvgIconCreateFnParams<TProps>) => {
  // @ts-ignore
  const Component: React.FC<React.HTMLAttributes<HTMLSpanElement> & TProps & ISvgIconProps> & {
    handledProps: (keyof (TProps & ISvgIconProps))[];
  } = props => {
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
        className: css(MS_ICON, classNames.root, className),
        /* tslint:disable-next-line:jsx-ban-props */
        style,
      },
      svg({ classNames, props }),
    );
  };

  Component.displayName = displayName;

  return Component;
};

export default createSvgIcon;
