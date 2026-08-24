'use client';

import * as React from 'react';
import { omit, slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderTab, useTab } from '@fluentui/react-headless-components-preview/tab-list';

import { useTabListContext } from '../TabList/TabListContext';
import type { TabProps } from './Tab.types';
import { useTabAnimatedIndicator } from './useTabAnimatedIndicator';
import { useTabStyles } from './useTabStyles';

/**
 * A Tab is one selectable item of a TabList. Windmod Tab: the headless tab decorated with the
 * Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Tab: ForwardRefComponent<TabProps> = React.forwardRef((props, ref) => {
  const { appearance, reserveSelectedTabSpace, size } = useTabListContext();
  const base = useTab(props, ref as React.Ref<HTMLElement>);
  const { content } = props;
  // The ref is stripped so a consumer's content ref is never attached to two elements. The typed
  // local is load-bearing: inlining the ternary widens the generic slot.optional infers.
  const contentReservedSpace: typeof content =
    content && typeof content === 'object' ? omit(content, ['ref' as keyof typeof content]) : content;

  return renderTab(
    useTabAnimatedIndicator(
      useTabStyles({
        ...base,
        appearance,
        size,
        // The headless base hook declares this slot but never builds it.
        contentReservedSpace: slot.optional(contentReservedSpace, {
          renderByDefault: !base.selected && !base.iconOnly && reserveSelectedTabSpace,
          defaultProps: { children: props.children },
          elementType: 'span',
        }),
      }),
    ),
  );
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<TabProps>;

Tab.displayName = 'Tab';
