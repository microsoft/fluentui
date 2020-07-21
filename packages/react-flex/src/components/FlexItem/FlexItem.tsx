import * as React from 'react';
import { compose } from '@fluentui/react-compose';
import { FlexItemProps } from './FlexItem.types';

export const FlexItem = compose<'div', FlexItemProps, FlexItemProps, {}, {}>(
  (props, ref, options) => {
    const { children } = props;

    const element = children as React.ReactElement; // apply styles to element

    return element;
  },
  {
    displayName: 'FlexItem',
    handledProps: ['grow', 'shrink', 'align', 'order', 'fluid', 'push'],
  },
);

FlexItem.defaultProps = {
  as: 'div',
};
