/** @jsx createElementWrapper */
import { Text } from '../../Text';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { createElementWrapper, getSlots } from '../../Foundation';
import { ICollapsibleSectionTitleComponent, ICollapsibleSectionTitleSlots } from './CollapsibleSectionTitle.types';

export const CollapsibleSectionTitleView: ICollapsibleSectionTitleComponent['view'] = props => {
  const Slots = getSlots<typeof props, ICollapsibleSectionTitleSlots>(props, {
    root: 'button',
    icon: Icon,
    text: Text
  });

  return (
    <Slots.root ref={props.focusElementRef} onClick={props.onClick} onKeyDown={props.onKeyDown}>
      {!props.chevronDisabled && <Slots.icon iconName="ChevronDown" />}
      <Slots.text />
    </Slots.root>
  );
};
