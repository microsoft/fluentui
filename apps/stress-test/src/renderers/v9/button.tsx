import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { ReactSelectorTreeComponentRenderer } from '../../shared/react/types';

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <Button>{`${node.value.name}, ${index}`}</Button>;
};

export default componentRenderer;
