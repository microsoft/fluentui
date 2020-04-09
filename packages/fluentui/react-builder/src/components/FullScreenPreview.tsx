import * as React from 'react';
import { Provider, themes } from '@fluentui/react-northstar';
import { readTreeFromStore } from '../utils/treeStore';
import { renderJSONTreeToJSXElement } from '../config';

const FullScreenPreview: React.FunctionComponent = () => {
  const jsonTree = readTreeFromStore();
  return (
    <Provider theme={themes.teams} target={document}>
      {renderJSONTreeToJSXElement(jsonTree)}
    </Provider>
  );
};

export default FullScreenPreview;
