import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-hooks';
import { classNamesFunction, useFocusRects } from '@fluentui/utilities';
import type { ILink, ILinkProps, ILinkStyleProps, ILinkStyles } from './Link.types';

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>();

/**
 * The useLink hook processes the Link component props and returns
 * state, slots and slotProps for consumption by the component.
 */
export const useLink = (props: ILinkProps, forwardedRef: React.Ref<HTMLElement>): any => {
  const { as, className, disabled, href, onClick, styles, theme, underline } = props;
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const mergedRootRefs: React.Ref<HTMLElement> = useMergedRefs(rootRef, forwardedRef);

  useComponentRef(props, rootRef);
  useFocusRects(rootRef);

  const classNames = getClassNames(styles!, {
    className,
    isButton: !href,
    isDisabled: disabled,
    isUnderlined: underline,
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
      ref: mergedRootRefs,
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
    [link],
  );
};

const adjustPropsForRootType = (
  RootType: string | React.ComponentClass | React.FunctionComponent,
  props: ILinkProps & { getStyles?: any },
): Partial<ILinkProps> => {
  // Deconstruct the props so we remove props like `as`, `theme` and `styles`
  // as those will always be removed. We also take some props that are optional
  // based on the RootType.
  const { as, disabled, target, href, theme, getStyles, styles, componentRef, underline, ...restProps } = props;

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
