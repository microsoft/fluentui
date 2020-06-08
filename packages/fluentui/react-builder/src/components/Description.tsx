import * as React from 'react';
import * as FUI from '@fluentui/react-northstar';
import { ComponentInfo } from '../componentInfo/types';
import { JSONTreeElement } from './types';

const ComponentDescription = ({
  selectedJSONTreeElement,
  componentInfo,
}: {
  selectedJSONTreeElement: JSONTreeElement;
  componentInfo: ComponentInfo;
}) => {
  if (!componentInfo) {
    return null;
  }

  return (
    <div>
      <FUI.Header as="h2" styles={{ display: 'inline-block', margin: 0 }}>
        {componentInfo.displayName}
      </FUI.Header>{' '}
      <code style={{ float: 'right' }}>uuid: {selectedJSONTreeElement.uuid}</code>
      <br />
      <span style={{ opacity: 0.5 }}>{componentInfo.docblock.description}</span>
    </div>
  );
};

export default ComponentDescription;
