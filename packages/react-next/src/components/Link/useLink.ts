import * as React from 'react';
import { ComposePreparedOptions } from '@fluentui/react-compose';
import { classNamesFunction } from '../../Utilities';
import { ILink, ILinkProps, ILinkStyleProps, ILinkStyles } from './Link.types';

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>({ useStaticStyles: true });

/**
 * The useLink hook processes the Link component props and returns
 * state, slots and slotProps for consumption by the component.
 */
// tslint:disable-next-line:no-any
export const useLink = (props: ILinkProps, options: ComposePreparedOptions): any => {
  const { as, className, disabled, href, onClick, ref, styles, theme } = props;

  useComponentRef(props, ref);

  const classNames = getClassNames(styles!, {
    className,
    isButton: !href,
    isDisabled: disabled,
    theme: theme!,
  });

  const _onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (disabled) {
      ev.preventDefault();
    } else if (onClick) {
      onClick(ev);
    }
  };

  const rootType = as ? as : href ? 'a' : 'button';

  const state = {};
  const slots = { root: rootType };
  const slotProps = {
    root: {
      ...adjustPropsForRootType(rootType, props),
      'aria-disabled': disabled,
      className: classNames.root,
      onClick: _onClick,
      ref: ref,
    },
  };

  return { state, slots, slotProps };
};

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
  RootType: string | React.ComponentClass | React.FunctionComponent,
  // tslint:disable-next-line:no-any
  props: ILinkProps & { getStyles?: any },
): Partial<ILinkProps> => {
  // Deconstruct the props so we remove props like `as`, `theme` and `styles`
  // as those will always be removed. We also take some props that are optional
  // based on the RootType.
  const { as, disabled, target, href, theme, getStyles, styles, componentRef, ...restProps } = props;

  // RootType will be a string if we're dealing with an html component
  if (typeof RootType === 'string') {
    // Remove the disabled prop for anchor elements
    if (RootType === 'a') {
      return {
        target,
        href: disabled ? undefined : href,
        ...restProps,
      };
    }

    // Add the type='button' prop for button elements
    if (RootType === 'button') {
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
