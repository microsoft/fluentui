/** @jsx withSlots */
import * as React from 'react';
import { withSlots, getSlots } from '../../Foundation';
import { createComponent } from '../../Foundation';
import { CollapsibleSection, ICollapsibleSectionProps } from '../../CollapsibleSection';
import { IAccordionComponent, IAccordionProps, IAccordionSlots } from './Accordion.types';
import { styles } from './Accordion.styles';

const AccordionItemType = (<CollapsibleSection /> as React.ReactElement<ICollapsibleSectionProps>).type;

const AccordionView: IAccordionComponent['view'] = props => {
  const { collapseItems } = props;

  const children: React.ReactChild[] = React.Children.map(
    props.children,
    (child: React.ReactElement<ICollapsibleSectionProps>, index: number) => {
      const defaultItemProps: ICollapsibleSectionProps = {
        defaultCollapsed: collapseItems
      };

      if (child.type === AccordionItemType) {
        return React.cloneElement(child, {
          ...defaultItemProps,
          ...child.props
        });
      }

      return <CollapsibleSection {...defaultItemProps}> {child} </CollapsibleSection>;
    }
  );

  const Slots = getSlots<ICollapsibleSectionProps, IAccordionSlots>(props, {
    root: 'div'
  });

  return <Slots.root>{children}</Slots.root>;
};

const AccordionStatics = {
  Item: CollapsibleSection,
  defaultProps: {}
};

export const Accordion: React.StatelessComponent<IAccordionProps> & {
  Item: React.StatelessComponent<ICollapsibleSectionProps>;
} = createComponent(AccordionView, {
  displayName: 'Accordion',
  styles,
  statics: AccordionStatics
});

export default Accordion;
