import * as React from 'react';
import { createComponent, IViewProps, IPropsWithStyles } from '../Text/createComponent';
import StackItem from './StackItem/StackItem';
import { IStackItemProps, IStackItemStyles } from './StackItem/StackItem.types';
import { IStackProps, IStackStyles } from './Stack.types';
import { styles } from './Stack.styles';

const StackItemType = (<StackItem /> as React.ReactElement<IStackItemProps> & {
  styles?:
    | Partial<IStackItemStyles>
    | ((props: IPropsWithStyles<IStackItemProps, IStackItemStyles>) => Partial<IStackItemStyles>);
}).type;

const view = (props: IViewProps<IStackProps, IStackStyles>) => {
  const { renderAs: RootType = 'div', classNames, gap, vertical, collapseItems } = props;

  const children: React.ReactChild[] = React.Children.map(
    props.children,
    (child: React.ReactElement<IStackItemProps>, index: number) => {
      const defaultItemProps: IStackItemProps = {
        gap: index > 0 ? gap : 0,
        vertical,
        collapse: collapseItems
      };

      if (child.type === StackItemType) {
        return React.cloneElement(child, {
          ...defaultItemProps,
          ...child.props
        });
      }

      return <StackItem {...defaultItemProps}>{child}</StackItem>;
    }
  );

  return <RootType className={classNames.root}>{children}</RootType>;
};

export const Stack: React.StatelessComponent<
  IStackProps & {
    styles?: Partial<IStackStyles> | ((props: IPropsWithStyles<IStackProps, IStackStyles>) => Partial<IStackStyles>);
  }
> & {
  Item: React.StatelessComponent<
    IStackItemProps & {
      styles?:
        | Partial<IStackItemStyles>
        | ((props: IPropsWithStyles<IStackItemProps, IStackItemStyles>) => Partial<IStackItemStyles>);
    }
  >;
} = createComponent({
  displayName: 'Stack',
  styles,
  view,
  statics: {
    Item: StackItem,
    defaultProps: {}
  }
});

export default Stack;
