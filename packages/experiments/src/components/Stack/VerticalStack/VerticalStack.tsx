import * as React from 'react';
import { createStatelessComponent, IViewComponentProps } from '../../../Foundation';
import { Stack } from '../Stack';
import { StackItem } from '../StackItem/StackItem';
import { IStackItemProps } from '../StackItem/StackItem.types';
import { getVerticalAlignment, getHorizontalAlignment } from '../StackUtils';
import { IVerticalStackProps, IVerticalStackStyles } from './VerticalStack.types';
import { styles } from './VerticalStack.styles';

const view = (props: IViewComponentProps<IVerticalStackProps, IVerticalStackStyles>) => {
  const { verticalAlign, horizontalAlign, classNames, children } = props;

  return (
    <Stack
      {...props}
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
type IVerticalStackStatics = typeof StackStatics;

export const VerticalStack: React.StatelessComponent<IVerticalStackProps> & {
  Item: React.StatelessComponent<IStackItemProps>;
} = createStatelessComponent<IVerticalStackProps, IVerticalStackStyles, IVerticalStackStatics>({
  displayName: 'VerticalStack',
  styles,
  view,
  statics: StackStatics
});

export default VerticalStack;
