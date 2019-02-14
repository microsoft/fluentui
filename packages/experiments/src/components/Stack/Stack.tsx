/** @jsx withSlots */
import * as React from 'react';
import { withSlots, createComponent, getSlots } from '../../Foundation';
import StackItem from './StackItem/StackItem';
import { IStackItemProps } from './StackItem/StackItem.types';
import { IStackComponent, IStackProps, IStackSlots } from './Stack.types';
import { styles } from './Stack.styles';
import { getNativeProps, htmlElementProperties } from '../../Utilities';

const StackItemType = (<StackItem /> as React.ReactElement<IStackItemProps>).type;

const view: IStackComponent['view'] = props => {
  const { as: RootType = 'div', disableShrink, wrap, ...rest } = props;

  const stackChildren: (React.ReactChild | null)[] = React.Children.map(
    props.children,
    (child: React.ReactElement<IStackItemProps>, index: number) => {
      if (!child) {
        return null;
      }

      if (child.type === StackItemType) {
        const defaultItemProps: IStackItemProps = {
          shrink: !disableShrink
        };

        return React.cloneElement(child, {
          ...defaultItemProps,
          ...child.props
        });
      }

      return child;
    }
  );

  const nativeProps = getNativeProps(rest, htmlElementProperties);

  const Slots = getSlots<IStackProps, IStackSlots>(props, {
    root: RootType,
    inner: 'div'
  });

  if (wrap) {
    return (
      <Slots.root {...nativeProps}>
        <Slots.inner>{stackChildren}</Slots.inner>
      </Slots.root>
    );
  }

  return <Slots.root {...nativeProps}>{stackChildren}</Slots.root>;
};

const StackStatics = {
  Item: StackItem
};

export const Stack: React.StatelessComponent<IStackProps> & {
  Item: React.StatelessComponent<IStackItemProps>;
} = createComponent({
  displayName: 'Stack',
  styles,
  view,
  statics: StackStatics
});

export default Stack;
