import * as React from 'react';
import { Checkbox } from '@fluentui/react';
import { ReactSelectorTreeComponentRenderer } from '../../shared/react/types';

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <Checkbox label={`${node.value.name}, ${index}`} />;
};

export default componentRenderer;
