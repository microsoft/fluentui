import * as React from 'react';
import { Input } from '@fluentui/react-components';
import { ReactSelectorTreeComponentRenderer } from '../../shared/react/types';

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <Input defaultValue={`${node.value.name}, ${index}`} />;
};

export default componentRenderer;
