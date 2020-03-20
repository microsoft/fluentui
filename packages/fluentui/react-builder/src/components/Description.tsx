import * as React from 'react';
import * as FUI from '@fluentui/react';
import { ComponentInfo } from '@fluentui/docs/src/types';

const ComponentDescription = ({ componentInfo }: { componentInfo: ComponentInfo }) => {
  if (!componentInfo) {
    return null;
  }

  return (
    <div>
      <FUI.Header as="h3" styles={{ marginBottom: 0 }}>
        {componentInfo.displayName}
      </FUI.Header>
      <span style={{ opacity: 0.5 }}>{componentInfo.docblock.description}</span>
    </div>
  );
};

export default ComponentDescription;
