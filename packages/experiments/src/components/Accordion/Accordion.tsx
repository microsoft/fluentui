import * as React from 'react';
import { createComponent, IViewProps, IPropsWithStyles } from '../Text/createComponent';
import { CollapsibleSection, ICollapsibleSectionProps, ICollapsibleSectionStyles } from '../../CollapsibleSection';
import { IAccordionProps, IAccordionStyles } from './Accordion.types';
import { styles } from './Accordion.styles';

const AccordionItemType = (<CollapsibleSection /> as React.ReactElement<ICollapsibleSectionProps> & {
  styles?:
    | Partial<ICollapsibleSectionStyles>
    | ((
        props: IPropsWithStyles<ICollapsibleSectionProps, ICollapsibleSectionStyles>
      ) => Partial<ICollapsibleSectionStyles>);
}).type;

const view = (props: IViewProps<IAccordionProps, IAccordionStyles>) => {
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

export const Accordion: React.StatelessComponent<
  IAccordionProps & {
    styles?:
      | Partial<IAccordionStyles>
      | ((props: IPropsWithStyles<IAccordionProps, IAccordionStyles>) => Partial<IAccordionStyles>);
  }
> & {
  Item: React.StatelessComponent<
    ICollapsibleSectionProps & {
      styles?:
        | Partial<ICollapsibleSectionStyles>
        | ((
            props: IPropsWithStyles<ICollapsibleSectionProps, ICollapsibleSectionStyles>
          ) => Partial<ICollapsibleSectionStyles>);
    }
  >;
} = createComponent({
  displayName: 'Accordion',
  styles,
  view,
  statics: {
    Item: CollapsibleSection,
    defaultProps: {}
  }
});

export default Accordion;
