import * as React from 'react';
import { ComposePreparedOptions } from '@fluentui/react-compose';
import { classNamesFunction } from '../../Utilities';
import { mergeProps } from '../../utils/mergeProps';
import { ILink, ILinkProps, ILinkSlots, LinkSlotProps, ILinkStyleProps, ILinkStyles } from './Link.types';

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>({ useStaticStyles: true });

/**
 * The useLink hook processes the Link component props and returns
 * state, slots and slotProps for consumption by the component.
 */
export const useLink = (props: ILinkProps, options: ComposePreparedOptions) => {
  const {
    'aria-describedby': ariaDescribedBy,
    as,
    className,
    disabled,
    href,
    keytipProps,
    onClick,
    ref,
    styles,
    theme,
  } = props;

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

  const handledProps: ILinkProps = {
    ...props,
    'aria-disabled': disabled,
    as: as ? as : href ? 'a' : 'button',
    className: classNames.root,
    href: disabled ? undefined : href,
    onClick: _onClick,
    type: !as && !href ? 'button' : undefined,
    keytipData: {
      ariaDescribedBy: ariaDescribedBy,
      disabled,
      keytipProps,
    },
  };
  return mergeProps<ILinkProps, ILinkSlots, LinkSlotProps>(handledProps, options);
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
