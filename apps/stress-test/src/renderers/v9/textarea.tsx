import * as React from 'react';
import { Textarea } from '@fluentui/react-components';
import { ReactSelectorTreeComponentRenderer } from '../../shared/react/types';

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <Textarea defaultValue={`${node.value.name}, ${index}`} />;
};

export default componentRenderer;
