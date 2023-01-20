import * as React from 'react';
import { SpinButton } from '@fluentui/react-components';
import { ReactSelectorTreeComponentRenderer } from '../../shared/react/types';

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <SpinButton value={0} displayValue={`${node.value.name}, ${index}`} />;
};

export default componentRenderer;
