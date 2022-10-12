import * as React from 'react';
import { useRootStyles } from './styles';
import { ReactSelectorTreeComponentRenderer } from '../../../shared/react/types';

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  const rootStyles = useRootStyles();
  return <button className={rootStyles.base}>{`${node.value.name}, ${index}`}</button>;
};

export default componentRenderer;
