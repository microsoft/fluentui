import * as React from 'react';
import { FlexProps } from './Flex.types';
import { compose } from '@fluentui/react-compose';
import { getElementType } from '@fluentui/react-bindings';

export const Flex = compose<'div', FlexProps, FlexProps, {}, {}>(
  (props, ref, options) => {
    const { wrap, children } = props;

    const flexChildren = children; // filter children
    const ElementType = getElementType(props);

    if (wrap) {
      return (
        <ElementType>
          <div>{flexChildren}</div>
        </ElementType>
      );
    }
    return <ElementType>{flexChildren}</ElementType>;
  },
  {
    displayName: 'Flex',
    handledProps: [
      'inline',
      'column',
      'wrap',
      'horizontalAlign',
      'verticalAlign',
      'padding',
      'reversed',
      'gap',
      'disableShrink',
      'fluid',
      'space',
    ],
  },
);

Flex.defaultProps = {
  as: 'div',
};
