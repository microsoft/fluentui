'use client';

import type * as React from 'react';
import { useMenuItemLinkBase_unstable } from '@fluentui/react-menu';
import { toDataAttributeValue } from '../../../utils';
import type { MenuItemLinkProps, MenuItemLinkState } from './MenuItemLink.types';

export const useMenuItemLink = (props: MenuItemLinkProps, ref: React.Ref<HTMLAnchorElement>): MenuItemLinkState => {
  const state: MenuItemLinkState = useMenuItemLinkBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(props.disabled);

  return state;
};
