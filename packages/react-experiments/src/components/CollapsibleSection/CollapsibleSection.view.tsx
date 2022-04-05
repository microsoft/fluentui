/** @jsxRuntime classic */
/** @jsx withSlots */
import { withSlots, getSlots } from '@fluentui/foundation-legacy';
import { CollapsibleSectionTitle } from './CollapsibleSectionTitle';
import type {
  ICollapsibleSectionComponent,
  ICollapsibleSectionProps,
  ICollapsibleSectionSlots,
} from './CollapsibleSection.types';

export const CollapsibleSectionView: ICollapsibleSectionComponent['view'] = props => {
  const { collapsed, titleElementRef, children, onClick, onKeyDown, indent } = props;

  const Slots = getSlots<ICollapsibleSectionProps, ICollapsibleSectionSlots>(props, {
    root: 'div',
    title: CollapsibleSectionTitle,
    body: 'div',
  });

  return (
    <Slots.root onKeyDown={props.onRootKeyDown}>
      <Slots.title
        collapsed={props.collapsed}
        focusElementRef={titleElementRef}
        onClick={onClick}
        onKeyDown={onKeyDown}
        indent={indent}
        aria-expanded={!props.collapsed}
      />
      {!collapsed && <Slots.body>{children}</Slots.body>}
    </Slots.root>
  );
};
