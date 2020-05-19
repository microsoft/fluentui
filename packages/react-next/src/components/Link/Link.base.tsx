import * as React from 'react';
import { ILink, ILinkProps } from './Link.types';
import { KeytipData } from '../../KeytipData';
import { useLinkClasses } from './useLinkClasses';

const useComponentRef = (props: ILinkProps, link: React.RefObject<ILink>) => {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      focus() {
        if (link.current) {
          link.current.focus();
        }
      },
    }),
    [],
  );
};

const adjustPropsForRootType = (
  RootTypeProp: string | React.ComponentClass | React.FunctionComponent,
  adjustPropsForRootTypeProps: ILinkProps & { getStyles?: any },
): Partial<ILinkProps> => {
  // Deconstruct the props so we remove props like `as`, `theme` and `styles`
  // as those will always be removed. We also take some props that are optional
  // based on the RootType.
  const {
    children,
    as,
    disabled,
    target,
    href,
    theme,
    getStyles,
    styles,
    componentRef,
    ...restProps
  } = adjustPropsForRootTypeProps;
  // RootType will be a string if we're dealing with an html component
  if (typeof RootTypeProp === 'string') {
    // Remove the disabled prop for anchor elements
    if (RootTypeProp === 'a') {
      return {
        target,
        href: disabled ? undefined : href,
        ...restProps,
      };
    }
    // Add the type='button' prop for button elements
    if (RootTypeProp === 'button') {
      return {
        type: 'button',
        disabled,
        ...restProps,
      };
    }
    // Remove the target and href props for all other non anchor elements
    return { ...restProps, disabled };
  }
  // Retain all props except 'as' for ReactComponents
  return { target, href, disabled, ...restProps };
};

export const LinkBase: React.FunctionComponent = (props: ILinkProps) => {
  const link = React.useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const ariaDescribedBy = (props as { 'aria-describedby': string })['aria-describedby'];
  const { disabled, children, keytipProps } = props;

  // TODO: this should be called during `compose`
  const classNames = useLinkClasses(props);

  const getRootType = (): string | React.ComponentClass | React.FunctionComponent => {
    if (props.as) {
      return props.as;
    }
    if (props.href) {
      return 'a';
    }
    return 'button';
  };

  const onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (disabled) {
      ev.preventDefault();
    } else if (onClick) {
      onClick(ev);
    }
  };

  const RootType = getRootType();
  useComponentRef(props, link);

  const keytipData = (keytipAttributes: any): JSX.Element => (
    <RootType
      {...keytipAttributes}
      {...adjustPropsForRootType(RootType, props)}
      className={classNames.root}
      onClick={onClick}
      ref={link}
      aria-disabled={disabled}
    >
      {children}
    </RootType>
  );

  return (
    <KeytipData keytipProps={keytipProps} ariaDescribedBy={ariaDescribedBy} disabled={disabled}>
      {keytipData}
    </KeytipData>
  );
};
LinkBase.displayName = 'Link';
