/** @jsxRuntime classic */
/** @jsx withSlots */
import * as React from 'react';
import { Icon, Text } from '@fluentui/react';
import { getNativeProps, buttonProperties } from '@fluentui/react/lib/Utilities';
import { withSlots, getSlots } from '@fluentui/foundation-legacy';
import type {
  ICollapsibleSectionTitleComponent,
  ICollapsibleSectionTitleProps,
  ICollapsibleSectionTitleSlots,
} from './CollapsibleSectionTitle.types';

export const CollapsibleSectionTitleView: ICollapsibleSectionTitleComponent['view'] = props => {
  const Slots = getSlots<ICollapsibleSectionTitleProps, ICollapsibleSectionTitleSlots>(props, {
    root: 'button',
    chevron: Icon,
    text: Text,
  });

  const buttonProps = getNativeProps<React.HTMLAttributes<HTMLButtonElement>>(props, buttonProperties);

  return (
    <Slots.root {...buttonProps} ref={props.focusElementRef}>
      {!props.chevronDisabled && <Slots.chevron iconName="ChevronDown" />}
      <Slots.text />
    </Slots.root>
  );
};
