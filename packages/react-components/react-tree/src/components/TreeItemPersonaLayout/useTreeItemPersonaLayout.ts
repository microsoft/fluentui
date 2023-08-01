import * as React from 'react';
import type { TreeItemPersonaLayoutProps, TreeItemPersonaLayoutState } from './TreeItemPersonaLayout.types';
import { resolveShorthand } from '@fluentui/react-utilities';
import { useTreeContext_unstable } from '../../contexts';
import { treeAvatarSize } from '../../utils/tokens';
import { useTreeItemLayout_unstable } from '../TreeItemLayout/useTreeItemLayout';
import { Checkbox, CheckboxProps } from '@fluentui/react-checkbox';
import { Radio, RadioProps } from '@fluentui/react-radio';

/**
 * Create the state required to render TreeItemPersonaLayout.
 *
 * The returned state can be modified with hooks such as useTreeItemPersonaLayoutStyles_unstable,
 * before being passed to renderTreeItemPersonaLayout_unstable.
 *
 * @param props - props from this instance of TreeItemPersonaLayout
 * @param ref - reference to root HTMLElement of TreeItemPersonaLayout
 */
export const useTreeItemPersonaLayout_unstable = (
  props: TreeItemPersonaLayoutProps,
  ref: React.Ref<HTMLSpanElement>,
): TreeItemPersonaLayoutState => {
  const { media, children, content, description } = props;

  const treeItemLayoutState = useTreeItemLayout_unstable(
    {
      ...props,
      iconBefore: null,
      iconAfter: null,
    },
    ref,
  );

  const size = useTreeContext_unstable(ctx => ctx.size);
  const selectionMode = useTreeContext_unstable(ctx => ctx.selectionMode);

  return {
    ...treeItemLayoutState,
    components: {
      expandIcon: 'div',
      content: 'div',
      description: 'div',
      root: 'div',
      media: 'div',
      aside: 'div',
      actions: 'div',
      // Casting here to a union between checkbox and radio
      selector: (selectionMode === 'multiselect' ? Checkbox : Radio) as React.ElementType<CheckboxProps | RadioProps>,
    },
    avatarSize: treeAvatarSize[size],
    content: resolveShorthand(content, { required: true, defaultProps: { children } }),
    media: resolveShorthand(media, { required: true }),
    description: resolveShorthand(description),
  };
};
