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
  const { content, icon, onClick, value } = props;

  // const selected = useNavContext_unstable(ctx => ctx.selectedValue === value);
  // const onRegister = useNavContext_unstable(ctx => ctx.onRegister);
  // const onUnregister = useNavContext_unstable(ctx => ctx.onUnregister);
  // const onSelect = useNavContext_unstable(ctx => ctx.onSelect);

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

  const iconSlot = slot.optional(icon, { elementType: 'span' });
  const contentSlot = slot.always(content, {
    defaultProps: { children: props.children },
    elementType: 'span',
  });

  return {
    components: { root: 'button', icon: 'span', content: 'span', contentReservedSpace: 'span' },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref: useMergedRefs(ref, innerRef),
        role: 'nav',
        type: 'navigation',
        ...props,
        onClick: onNavGroupClick,
      }),
      { elementType: 'button' },
    ),
    icon: iconSlot,
    content: contentSlot,
    contentReservedSpace: slot.optional(content, {
      defaultProps: { children: props.children },
      elementType: 'span',
    }),
    selected,
    value,
  };
};
