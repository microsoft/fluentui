/** @jsxRuntime classic */
/** @jsx withSlots */
import * as React from 'react';
import { createComponent, withSlots, getSlots } from '@fluentui/foundation-legacy';
import { CollapsibleSection } from '../../CollapsibleSection';
import { styles } from './Accordion.styles';
import type { ICollapsibleSectionProps } from '../../CollapsibleSection';
import type { IAccordionComponent, IAccordionProps, IAccordionSlots } from './Accordion.types';

const AccordionItemType = ((<CollapsibleSection />) as React.ReactElement<ICollapsibleSectionProps>).type;

const AccordionView: IAccordionComponent['view'] = props => {
  const { collapseItems } = props;

  const children: React.ReactChild[] | undefined | null = React.Children.map(
    props.children,
    (child: React.ReactElement<ICollapsibleSectionProps>, index: number) => {
      const defaultItemProps: ICollapsibleSectionProps = {
        defaultCollapsed: collapseItems,
      };

      if (child.type === AccordionItemType) {
        return React.cloneElement(child, {
          ...defaultItemProps,
          ...child.props,
        });
      }

      return <CollapsibleSection {...defaultItemProps}> {child} </CollapsibleSection>;
    },
  );

  const Slots = getSlots<ICollapsibleSectionProps, IAccordionSlots>(props, {
    root: 'div',
  });

  return <Slots.root>{children}</Slots.root>;
};

const AccordionStatics = {
  Item: CollapsibleSection,
  defaultProps: {},
};

export const Accordion: React.FunctionComponent<IAccordionProps> & {
  Item: React.FunctionComponent<ICollapsibleSectionProps>;
} = createComponent(AccordionView, {
  displayName: 'Accordion',
  styles,
  statics: AccordionStatics,
});

export default Accordion;
