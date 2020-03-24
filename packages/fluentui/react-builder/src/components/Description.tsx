import * as React from 'react';
import * as FUI from '@fluentui/react';
import { ComponentInfo } from '@fluentui/docs/src/types';
import { JSONTreeElement } from './types';

const ComponentDescription = ({
  selectedJSONTreeElement,
  componentInfo
}: {
  selectedJSONTreeElement: JSONTreeElement;
  componentInfo: ComponentInfo;
}) => {
  if (!componentInfo) {
    return null;
  }

  return (
    <div>
      <FUI.Header as="h3" styles={{ display: 'inline-block', marginBottom: 0 }}>
        {componentInfo.displayName}
      </FUI.Header>{' '}
      uuid: <code>{selectedJSONTreeElement.uuid}</code>
      <br />
      <span style={{ opacity: 0.5 }}>{componentInfo.docblock.description}</span>
    </div>
  );
};

export default ComponentDescription;
