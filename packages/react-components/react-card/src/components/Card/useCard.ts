import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { CardProps, CardState } from './Card.types';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { Enter } from '@fluentui/keyboard-keys';

/**
 * Create the state required to render Card.
 *
 * The returned state can be modified with hooks such as useCardStyles_unstable,
 * before being passed to renderCard_unstable.
 *
 * @param props - props from this instance of Card
 * @param ref - reference to root HTMLElement of Card
 */
export const useCard_unstable = (props: CardProps, ref: React.Ref<HTMLElement>): CardState => {
  const {
    appearance = 'filled',
    focusMode = 'off',
    orientation = 'vertical',
    size = 'medium',
    select,
    selectable = false,
    selected,
    defaultSelected = false,
    onCardSelect,
  } = props;

  const [checked, setChecked] = React.useState(selected || defaultSelected);

  const focusMap = {
    off: undefined,
    'no-tab': 'limited-trap-focus',
    'tab-exit': 'limited',
    'tab-only': 'unlimited',
  } as const;

  const groupperAttrs = useFocusableGroup({
    tabBehavior: focusMap[focusMode],
  });

  const focusAttrs = focusMode !== 'off' ? { ...groupperAttrs } : null;

  const onChangeHandler = (event: React.MouseEvent | React.KeyboardEvent) => {
    setChecked(!checked);
    onCardSelect && onCardSelect(event, { selected: checked });
  };

  const selectAttrs =
    selectable === true
      ? {
          onClick: onChangeHandler,
          onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === Enter) {
              onChangeHandler(event);
            }
          },
        }
      : null;

  return {
    appearance,
    orientation,
    size,
    selectable,
    selected: checked,

    components: { root: 'div', select: 'input' },
    root: getNativeElementProps(props.as || 'div', {
      ref,
      role: 'group',
      tabIndex: selectable || focusMode !== 'off' ? 0 : undefined,
      ...focusAttrs,
      ...selectAttrs,
      ...props,
    }),
    select: selectable
      ? resolveShorthand(select || {}, {
          defaultProps: {
            checked,
            type: 'checkbox',
            readOnly: true,
          },
        })
      : undefined,
  };
};
