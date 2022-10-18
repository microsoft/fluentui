import * as React from 'react';
import { SpinButton } from '@fluentui/react';
import { ReactSelectorTreeComponentRenderer } from '../../shared/react/types';

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <SpinButton value={`${node.value.name}, ${index}`} />;
};

export default componentRenderer;
