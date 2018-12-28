/** @jsx createElementWrapper */
import { createElementWrapper, getSlots } from '../../Foundation';

import { ICollapsibleSectionComponent, ICollapsibleSectionSlots } from './CollapsibleSection.types';
import { CollapsibleSectionTitle } from './CollapsibleSectionTitle';

export const CollapsibleSectionView: ICollapsibleSectionComponent['view'] = props => {
  const {
    collapsed,
    titleElementRef,
    children,
    onClick,
    onKeyDown,
    indent
  } = props;

  const Slots = getSlots<typeof props, ICollapsibleSectionSlots>(props, {
    root: 'div',
    title: CollapsibleSectionTitle,
    body: 'div'
  });

  return (
    <Slots.root onKeyDown={props.onRootKeyDown}>
      <Slots.title
        collapsed={props.collapsed}
        focusElementRef={titleElementRef}
        onClick={onClick}
        onKeyDown={onKeyDown}
        indent={indent}
      />
      <Slots.body>{!collapsed && children}</Slots.body>
    </Slots.root>
  );
};
