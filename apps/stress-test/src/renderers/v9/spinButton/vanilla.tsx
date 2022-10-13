import * as React from 'react';
import { ReactSelectorTreeComponentRenderer } from '../../../shared/react/types';

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <input type="number" value={`${node.value.name}, ${index}`} />;
};

export default componentRenderer;
