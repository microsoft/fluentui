import * as React from 'react';
import { createStatelessComponent, IViewComponentProps } from '../../../Foundation';
import { Stack } from '../Stack';
import { StackItem } from '../StackItem/StackItem';
import { IStackItemProps } from '../StackItem/StackItem.types';
import { getVerticalAlignment, getHorizontalAlignment } from '../StackUtils';
import { IHorizontalStackProps, IHorizontalStackStyles } from './HorizontalStack.types';
import { styles } from './HorizontalStack.styles';

const view = (props: IViewComponentProps<IHorizontalStackProps, IHorizontalStackStyles>) => {
  const { horizontalAlign, verticalAlign, classNames, children } = props;

  return (
    <Stack
      {...props}
      horizontal
      verticalAlignment={getVerticalAlignment(verticalAlign)}
      horizontalAlignment={getHorizontalAlignment(horizontalAlign)}
      className={classNames.root}
    >
      {children}
    </Stack>
  );
};

const StackStatics = {
  Item: StackItem,
  defaultProps: {}
};
type IHorizontalStackStatics = typeof StackStatics;

export const HorizontalStack: React.StatelessComponent<IHorizontalStackProps> & {
  Item: React.StatelessComponent<IStackItemProps>;
} = createStatelessComponent<IHorizontalStackProps, IHorizontalStackStyles, IHorizontalStackStatics>({
  displayName: 'HorizontalStack',
  styles,
  view,
  statics: StackStatics
});

export default HorizontalStack;
