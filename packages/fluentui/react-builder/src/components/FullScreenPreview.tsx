import * as React from 'react';
import { Provider, teamsTheme } from '@fluentui/react-northstar';
import { readTreeFromStore, readTreeFromURL } from '../utils/treeStore';
import { renderJSONTreeToJSXElement } from '../config';

export const FullScreenPreview: React.FunctionComponent = () => {
  const jsonTree = readTreeFromURL(window.location.href) || readTreeFromStore();
  return (
    <Provider theme={teamsTheme} target={document}>
      {renderJSONTreeToJSXElement(jsonTree)}
    </Provider>
  );
};
