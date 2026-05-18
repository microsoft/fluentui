'use client';

import * as React from 'react';
import { useMenuTriggerBase_unstable } from '@fluentui/react-menu';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { isHTMLElement } from '@fluentui/react-utilities';
import { useMenuContext } from '../menuContext';
import { stringifyDataAttribute } from '../../../utils';
import type { MenuTriggerProps, MenuTriggerState } from '@fluentui/react-menu';

type TriggerChildProps = {
  'data-open'?: string;
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onContextMenu?: React.MouseEventHandler<HTMLElement>;
};

/**
 * Mirrors the `isTargetDisabled` check used inside `@fluentui/react-menu`'s
 * `useMenuTriggerBase_unstable` onContextMenu handler. Kept local because the
 * helper is not exported by `@fluentui/react-menu`.
 */
const isTargetDisabled = (event: React.SyntheticEvent): boolean => {
  const target = event.target;
  if (!isHTMLElement(target)) {
    return false;
  }
  return target.hasAttribute('disabled') || target.getAttribute('aria-disabled') === 'true';
};

export const useMenuTrigger = (props: MenuTriggerProps): MenuTriggerState => {
  const baseState = useMenuTriggerBase_unstable(props);
  const open = useMenuContext(ctx => ctx.open);
  const openOnContext = useMenuContext(ctx => ctx.openOnContext);
  const setOpen = useMenuContext(ctx => ctx.setOpen);
  const { targetDocument } = useFluent();

  if (!baseState.children || !React.isValidElement(baseState.children)) {
    return baseState;
  }

  const child = baseState.children as React.ReactElement<TriggerChildProps>;
  const overrideProps: TriggerChildProps = {
    'data-open': stringifyDataAttribute(open),
  };

  if (openOnContext && targetDocument) {
    const consumerChild = props.children as React.ReactElement<TriggerChildProps> | undefined;
    const consumerOnContextMenu = React.isValidElement(consumerChild) ? consumerChild.props.onContextMenu : undefined;

    overrideProps.onContextMenu = (event: React.MouseEvent<HTMLElement>) => {
      consumerOnContextMenu?.(event);

      if (isTargetDisabled(event) || event.isDefaultPrevented()) {
        return;
      }

      event.preventDefault();
      const nativeEvent = event.nativeEvent;
      const fire = () =>
        setOpen(nativeEvent as unknown as React.MouseEvent<HTMLElement>, {
          open: true,
          type: 'menuTriggerContextMenu',
          event: nativeEvent as unknown as React.MouseEvent<HTMLElement>,
        });

      if (event.button !== 2) {
        fire();
        return;
      }

      targetDocument.addEventListener('pointerup', fire, { once: true, capture: true });
    };
  }

  return {
    ...baseState,
    children: React.cloneElement(child, overrideProps),
  };
};
