import * as React from 'react';
import { createStatelessComponent } from '../../../Foundation';
import { Stack } from '../Stack';
import { StackItem } from '../StackItem/StackItem';
import { IStackItemProps } from '../StackItem/StackItem.types';
import { getVerticalAlignment, getHorizontalAlignment } from '../StackUtils';
import { IVerticalStackComponent, IVerticalStackProps, IVerticalStackStyles } from './VerticalStack.types';
import { styles } from './VerticalStack.styles';

const view: IVerticalStackComponent['view'] = props => {
  const { verticalAlign, horizontalAlign, gap, classNames, children, styles: customStyles, ...rest } = props;

  return (
    <Stack
      {...rest}
      verticalAlignment={getVerticalAlignment(verticalAlign)}
      horizontalAlignment={getHorizontalAlignment(horizontalAlign)}
      className={classNames.root}
      verticalGap={gap}
    >
      {children}
    </Stack>
  );
};

const VerticalStackStatics = {
  Item: StackItem,
  defaultProps: {}
};
type IVerticalStackStatics = typeof VerticalStackStatics;

export const VerticalStack: React.StatelessComponent<IVerticalStackProps> & {
  Item: React.StatelessComponent<IStackItemProps>;
} = createStatelessComponent<IVerticalStackProps, IVerticalStackStyles, IVerticalStackStatics>({
  displayName: 'VerticalStack',
  styles,
  view,
  statics: VerticalStackStatics
});

export default VerticalStack;
