/** @jsx withSlots */
import { Text } from '../../Text';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
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

  return (
    <Slots.root ref={props.focusElementRef} onClick={props.onClick} onKeyDown={props.onKeyDown}>
      {!props.chevronDisabled && <Slots.chevron iconName="ChevronDown" />}
      <Slots.text />
    </Slots.root>
  );
};
