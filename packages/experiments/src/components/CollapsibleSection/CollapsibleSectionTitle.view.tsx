/** @jsx withSlots */
import { Text } from '../../Text';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getNativeProps, buttonProperties } from 'office-ui-fabric-react/lib/Utilities';
import { withSlots, getSlots } from '../../Foundation';
import {
  ICollapsibleSectionTitleComponent,
  ICollapsibleSectionTitleProps,
  ICollapsibleSectionTitleSlots
} from './CollapsibleSectionTitle.types';

export const CollapsibleSectionTitleView: ICollapsibleSectionTitleComponent['view'] = props => {
  const Slots = getSlots<ICollapsibleSectionTitleProps, ICollapsibleSectionTitleSlots>(props, {
    root: 'button',
    chevron: Icon,
    text: Text
  });

  const buttonProps = getNativeProps(props, buttonProperties);

  return (
    <Slots.root {...buttonProps} ref={props.focusElementRef}>
      {!props.chevronDisabled && <Slots.chevron iconName="ChevronDown" />}
      <Slots.text />
    </Slots.root>
  );
};
