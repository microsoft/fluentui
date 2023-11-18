import * as React from 'react';
import { TextField } from '@fluentui/react';
import { ReactSelectorTreeComponentRenderer } from '../../shared/react/types';

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <TextField defaultValue={`${node.value.name}, ${index}`} />;
};

export default componentRenderer;
