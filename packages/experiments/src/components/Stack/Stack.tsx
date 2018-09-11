import * as React from 'react';
import { createStatelessComponent, IStyleableComponentProps, IViewComponentProps } from '../../Foundation';
import StackItem from './StackItem/StackItem';
import { IStackItemProps, IStackItemStyles } from './StackItem/StackItem.types';
import { IStackProps, IStackStyles } from './Stack.types';
import { styles } from './Stack.styles';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const StackItemType = (<StackItem /> as React.ReactElement<IStackItemProps> & IStyleableComponentProps<IStackItemProps, IStackItemStyles>)
  .type;

const view = (props: IViewComponentProps<IStackProps, IStackStyles>) => {
  const {
    renderAs: RootType = 'div',
    classNames,
    gap,
    horizontal,
    shrinkItems,
    verticalAlignment,
    horizontalAlignment,
    grow,
    ...rest
  } = props;

  const stackChildren: (React.ReactChild | null)[] = React.Children.map(
    props.children,
    (child: React.ReactElement<IStackItemProps>, index: number) => {
      if (!child) {
        return null;
      }

      const defaultItemProps: IStackItemProps = {
        gap: index > 0 ? gap : 0,
        horizontal,
        shrink: shrinkItems,
        className: child.props ? child.props.className : undefined
      };

      if (child.type === StackItemType) {
        // If child is a StackItem, we need to pass down the className of ITS first child to the StackItem for mergeStylesSet to work
        const children = child.props ? child.props.children : undefined;
        const stackItemFirstChildren = React.Children.toArray(children) as React.ReactElement<{ className?: string }>[];
        const stackItemFirstChild = stackItemFirstChildren && stackItemFirstChildren[0];

        // pass down both the className on the StackItem as well as the className on its first child
        let mergedClassName = defaultItemProps.className;
        if (stackItemFirstChild && stackItemFirstChild.props && stackItemFirstChild.props.className) {
          mergedClassName = mergeStyles(mergedClassName, stackItemFirstChild.props.className);
        }

        return React.cloneElement(child, {
          ...defaultItemProps,
          ...child.props,
          className: mergedClassName
        });
      }

      return <StackItem {...defaultItemProps}>{child}</StackItem>;
    }
  );

  return (
    <RootType {...rest} className={classNames.root}>
      {stackChildren}
    </RootType>
  );
};

const StackStatics = {
  Item: StackItem,
  defaultProps: {}
};
type IStackStatics = typeof StackStatics;

export const Stack: React.StatelessComponent<IStackProps> & {
  Item: React.StatelessComponent<IStackItemProps>;
} = createStatelessComponent<IStackProps, IStackStyles, IStackStatics>({
  displayName: 'Stack',
  styles,
  view,
  statics: StackStatics
});

export default Stack;
