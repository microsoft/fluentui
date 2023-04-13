import * as React from 'react';
import type { TreeItemPersonaLayoutProps, TreeItemPersonaLayoutState } from './TreeItemPersonaLayout.types';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { useTreeContext_unstable, useTreeItemContext_unstable } from '../../contexts';
import { treeAvatarSize } from '../../utils/tokens';

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
  const { media, content, children, main, description, aside, as = 'span' } = props;
  const size = useTreeContext_unstable(ctx => ctx.size);
  const { isActionsVisible } = useTreeItemContext_unstable();
  return {
    components: {
      content: 'div',
      main: 'span',
      description: 'span',
      root: 'span',
      media: 'span',
      aside: 'span',
    },
    isActionsVisible,
    avatarSize: treeAvatarSize[size],
    root: getNativeElementProps(as, { ...props, ref }),
    main: resolveShorthand(main, { required: true, defaultProps: { children } }),
    media: resolveShorthand(media, { required: true }),
    content: resolveShorthand(content, { required: true }),
    description: resolveShorthand(description),
    aside: resolveShorthand(aside),
  };
};
