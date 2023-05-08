import * as React from 'react';
import { DefaultButton } from '@fluentui/react';
import { ReactSelectorTreeComponentRenderer } from '../../shared/react/types';

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <DefaultButton text={`${node.value.name}, ${index}`} />;
};

export default componentRenderer;
