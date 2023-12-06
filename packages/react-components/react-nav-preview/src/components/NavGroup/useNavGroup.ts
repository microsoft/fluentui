import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  useEventCallback,
  useMergedRefs,
  slot,
} from '@fluentui/react-utilities';
import { useNavContext_unstable } from '../NavContext';
import { NavGroupProps, NavGroupState } from './NavGroup.types';

/**
 * Create the state required to render NavGroup.
 *
 * The returned state can be modified with hooks such as useNavGroupStyles,
 * before being passed to renderNavGroup.
 *
 * @param props - props from this instance of NavGroup
 * @param ref - reference to root HTMLButtonElement of NavGroup
 */
export const useNavGroup_unstable = (props: NavGroupProps, ref: React.Ref<HTMLButtonElement>): NavGroupState => {
  const { content, onClick, value } = props;

  const { selectedValue, onRegister, onUnregister, onSelect } = useNavContext_unstable();

  const selected = selectedValue === value;

  const innerRef = React.useRef<HTMLElement>(null);
  const onNavGroupClick = useEventCallback(
    mergeCallbacks(onClick, event => onSelect(event, { type: 'click', event, value })),
  );

  React.useEffect(() => {
    onRegister({
      value,
      ref: innerRef,
    });

    return () => {
      onUnregister({ value, ref: innerRef });
    };
  }, [onRegister, onUnregister, innerRef, value]);

  const contentSlot = slot.always(content, {
    defaultProps: { children: props.children },
    elementType: 'span',
  });

  return {
    components: { root: 'button', content: 'span' },
    root: slot.always(
      getIntrinsicElementProps('button', {
        // FIXME: Follow up with Ben to understand more about what's going on here.
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLButtonElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, innerRef) as React.Ref<HTMLButtonElement>,
        role: 'nav',
        type: 'navigation',
        ...props,
        onClick: onNavGroupClick,
      }),
      { elementType: 'button' },
    ),
    content: contentSlot,
    selected,
    value,
  };
};
