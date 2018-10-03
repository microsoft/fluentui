import * as React from 'react';
import { createStatelessComponent } from '../../../Foundation';
import { Stack } from '../Stack';
import { StackItem } from '../StackItem/StackItem';
import { IStackItemProps } from '../StackItem/StackItem.types';
import { getVerticalAlignment, getHorizontalAlignment } from '../StackUtils';
import { IHorizontalStackComponent, IHorizontalStackProps, IHorizontalStackStyles } from './HorizontalStack.types';
import { styles } from './HorizontalStack.styles';

const view: IHorizontalStackComponent['view'] = props => {
  const { horizontalAlign, verticalAlign, gap, verticalGap, classNames, children, styles: customStyles, ...rest } = props;

  const vertGap = verticalGap !== undefined ? verticalGap : gap;

  if (props.wrap) {
    return (
      <div className={classNames.root}>
        <Stack
          {...rest}
          wrap
          horizontal
          verticalAlignment={getVerticalAlignment(verticalAlign)}
          horizontalAlignment={getHorizontalAlignment(horizontalAlign)}
          className={classNames.inner}
          horizontalGap={gap}
          verticalGap={vertGap}
        >
          {children}
        </Stack>
      </div>
    );
  }

  return (
    <Stack
      {...rest}
      horizontal
      verticalAlignment={getVerticalAlignment(verticalAlign)}
      horizontalAlignment={getHorizontalAlignment(horizontalAlign)}
      className={classNames.root}
      horizontalGap={gap}
    >
      {children}
    </Stack>
  );
};

const HorizontalStackStatics = {
  Item: StackItem,
  defaultProps: {}
};
type IHorizontalStackStatics = typeof HorizontalStackStatics;

export const HorizontalStack: React.StatelessComponent<IHorizontalStackProps> & {
  Item: React.StatelessComponent<IStackItemProps>;
} = createStatelessComponent<IHorizontalStackProps, IHorizontalStackStyles, IHorizontalStackStatics>({
  displayName: 'HorizontalStack',
  styles,
  view,
  statics: HorizontalStackStatics
});

export default HorizontalStack;
