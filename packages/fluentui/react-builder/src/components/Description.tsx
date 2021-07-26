import * as React from 'react';
import { Header } from '@fluentui/react-northstar';
import { ComponentInfo } from '../componentInfo/types';
import { JSONTreeElement } from './types';

export type DescriptionProps = {
  selectedJSONTreeElement: JSONTreeElement;
  componentInfo: ComponentInfo;
};

export const Description: React.FunctionComponent<DescriptionProps> = ({ selectedJSONTreeElement, componentInfo }) => {
  if (!componentInfo) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
          marginBottom: '.5em',
        }}
      >
        <Header as="h2" styles={{ margin: 0 }}>
          {componentInfo.displayName}
        </Header>{' '}
        <code>uuid: {selectedJSONTreeElement.uuid}</code>
      </div>
      <span style={{ opacity: 0.5 }}>{componentInfo.docblock.description}</span>
    </div>
  );
};
