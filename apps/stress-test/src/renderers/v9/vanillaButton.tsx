import * as React from 'react';
import { ReactSelectorTreeComponentRenderer } from '../../shared/react/types';

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <button>{`${node.value.name}, ${index}`}</button>;
};

export default componentRenderer;
