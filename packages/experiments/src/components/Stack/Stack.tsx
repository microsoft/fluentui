import * as React from 'react';
import { createComponent, IStyleableComponent, IViewComponentProps } from '../../Foundation';
import StackItem from './StackItem/StackItem';
import { IStackItemProps, IStackItemStyles } from './StackItem/StackItem.types';
import { IStackProps, IStackStyles } from './Stack.types';
import { styles } from './Stack.styles';

const StackItemType = (<StackItem /> as React.ReactElement<IStackItemProps> &
  IStyleableComponent<IStackItemProps, IStackItemStyles>).type;

const view = (props: IViewComponentProps<IStackProps, IStackStyles>) => {
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

const StackStatics = {
  Item: StackItem,
  defaultProps: {}
};
type IStackStatics = typeof StackStatics;

export const Stack: React.StatelessComponent<IStackProps> & {
  Item: React.StatelessComponent<IStackItemProps>;
} = createComponent<IStackProps, IStackStyles, IStackStatics>({
  displayName: 'Stack',
  styles,
  view,
  statics: StackStatics
});

export default Stack;
