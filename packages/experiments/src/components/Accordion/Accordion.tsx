import * as React from 'react';
import { createStatelessComponent, IStyleableComponentProps } from '../../Foundation';
import { CollapsibleSection, ICollapsibleSectionProps, ICollapsibleSectionStyles } from '../../CollapsibleSection';
import { IAccordionComponent, IAccordionProps, IAccordionStyles } from './Accordion.types';
import { styles } from './Accordion.styles';

const AccordionItemType = (<CollapsibleSection /> as React.ReactElement<ICollapsibleSectionProps> &
  IStyleableComponentProps<ICollapsibleSectionProps, ICollapsibleSectionStyles>).type;

const view: IAccordionComponent['view'] = props => {
  const { renderAs: RootType = 'div', classNames, collapseItems } = props;

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

  return <RootType className={classNames.root}> {children} </RootType>;
};

const AccordionStatics = {
  Item: CollapsibleSection,
  defaultProps: {}
};
type IAccordionStatics = typeof AccordionStatics;

export const Accordion: React.StatelessComponent<IAccordionProps> & {
  Item: React.StatelessComponent<ICollapsibleSectionProps>;
} = createStatelessComponent<IAccordionProps, IAccordionStyles, IAccordionStatics>({
  displayName: 'Accordion',
  styles,
  view,
  statics: AccordionStatics
});

export default Accordion;
