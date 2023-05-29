import * as React from 'react';
import type { TreeItemPersonaLayoutProps, TreeItemPersonaLayoutState } from './TreeItemPersonaLayout.types';
import { slot } from '@fluentui/react-utilities';
import { useTreeContext_unstable } from '../../contexts';
import { treeAvatarSize } from '../../utils/tokens';
import { useTreeItemLayout_unstable } from '../TreeItemLayout/useTreeItemLayout';

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
  const { media, content, children, main, description } = props;

  const treeItemLayoutState = useTreeItemLayout_unstable(
    {
      ...props,
      iconBefore: null,
      iconAfter: null,
    },
    ref,
  );

  const size = useTreeContext_unstable(ctx => ctx.size);
  return {
    ...treeItemLayoutState,
    components: {
      expandIcon: 'div',
      content: 'div',
      main: 'div',
      description: 'div',
      root: 'div',
      media: 'div',
    },
    avatarSize: treeAvatarSize[size],
    main: slot(main, { required: true, defaultProps: { children }, elementType: 'div' }),
    media: slot(media, { required: true, elementType: 'div' }),
    content: slot(content, { required: true, elementType: 'div' }),
    description: slot(description, { elementType: 'div' }),
  };
};
