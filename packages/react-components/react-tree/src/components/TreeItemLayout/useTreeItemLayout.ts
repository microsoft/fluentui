import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useMergedRefs } from '@fluentui/react-utilities';
import { useTreeItemContext_unstable, useTreeContext_unstable, useTreeItemSlotsContext_unstable } from '../../contexts';
import type { TreeItemLayoutProps, TreeItemLayoutState } from './TreeItemLayout.types';
import { Checkbox, CheckboxProps } from '@fluentui/react-checkbox';
import { Radio, RadioProps } from '@fluentui/react-radio';

/**
 * Create the state required to render TreeItemLayout.
 *
 * The returned state can be modified with hooks such as useTreeItemLayoutStyles_unstable,
 * before being passed to renderTreeItemLayout_unstable.
 *
 * @param props - props from this instance of TreeItemLayout
 * @param ref - reference to root HTMLElement of TreeItemLayout
 */
export const useTreeItemLayout_unstable = (
  props: TreeItemLayoutProps,
  ref: React.Ref<HTMLElement>,
): TreeItemLayoutState => {
  const { content, iconAfter, iconBefore, as = 'span' } = props;

  const { actions, aside, expandIcon, selector } = useTreeItemSlotsContext_unstable();

  const layoutRef = useTreeItemContext_unstable(ctx => ctx.layoutRef);
  const selectionMode = useTreeContext_unstable(ctx => ctx.selectionMode);

  return {
    components: {
      root: 'div',
      expandIcon: 'div',
      iconBefore: 'div',
      content: 'div',
      iconAfter: 'div',
      actions: 'div',
      aside: 'div',
      // Casting here to a union between checkbox and radio
      selector: (selectionMode === 'multiselect' ? Checkbox : Radio) as React.ElementType<CheckboxProps | RadioProps>,
    },
    buttonContextValue: { size: 'small' },
    root: getNativeElementProps(as, { ...props, ref: useMergedRefs(ref, layoutRef) }),
    iconBefore: resolveShorthand(iconBefore, { defaultProps: { 'aria-hidden': true } }),
    content: resolveShorthand(content, { required: true }),
    iconAfter: resolveShorthand(iconAfter, { defaultProps: { 'aria-hidden': true } }),
    aside: resolveShorthand(aside),
    actions: resolveShorthand(actions),
    expandIcon: resolveShorthand(expandIcon),
    selector: resolveShorthand(selector),
  };
};
