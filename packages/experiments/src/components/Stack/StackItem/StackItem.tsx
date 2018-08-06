import * as React from 'react';
import { createComponent, IViewComponentProps } from '../../../Foundation';
import { IStackItemProps, IStackItemStyles } from './StackItem.types';
import { styles } from './StackItem.styles';

const view = (props: IViewComponentProps<IStackItemProps, IStackItemStyles>) => {
  const childNodes: React.ReactElement<{}>[] = React.Children.toArray(props.children) as React.ReactElement<{}>[];
  const first = childNodes[0];

  if (typeof first === 'string') {
    return <span className={props.classNames.root}>{first}</span>;
  }

  return React.cloneElement(first as React.ReactElement<{ className: string }>, {
    ...first.props,
    className: props.classNames.root
  });
};

export const StackItem: React.StatelessComponent<IStackItemProps> = createComponent<IStackItemProps, IStackItemStyles>({
  displayName: 'StackItem',
  styles,
  view
});

export default StackItem;
