/** @jsx createElementWrapper */
import * as React from 'react';
import { createElementWrapper, getSlots } from '../../Foundation';
import { createStatelessComponent, IStyleableComponentProps } from '../../Foundation';
import { CollapsibleSection, ICollapsibleSectionProps, ICollapsibleSectionStyles } from '../../CollapsibleSection';
import { IAccordionComponent, IAccordionProps, IAccordionSlots, IAccordionStyles } from './Accordion.types';
import { styles } from './Accordion.styles';

const AccordionItemType = (<CollapsibleSection /> as React.ReactElement<ICollapsibleSectionProps> &
  IStyleableComponentProps<ICollapsibleSectionProps, ICollapsibleSectionStyles>).type;

const view: IAccordionComponent['view'] = props => {
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

  const Slots = getSlots<typeof props, IAccordionSlots>(props, {
    root: 'div'
  });

  return <Slots.root>{children}</Slots.root>;
};

const AccordionStatics = {
  Item: CollapsibleSection,
  defaultProps: {}
};
type IAccordionStatics = typeof AccordionStatics;

export const Accordion: React.StatelessComponent<IAccordionProps> & {
  Item: React.StatelessComponent<ICollapsibleSectionProps>;
} = createStatelessComponent<IAccordionProps, IAccordionStyles, {}, IAccordionStatics>({
  displayName: 'Accordion',
  styles,
  view,
  statics: AccordionStatics
});

export default Accordion;
