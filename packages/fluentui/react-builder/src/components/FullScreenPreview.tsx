import * as React from 'react';
import { Provider, teamsTheme } from '@fluentui/react-northstar';
import { readTreeFromStore, readTreeFromURL, readThemeFromStore, readThemeFromURL } from '../utils/treeStore';
import { renderJSONTreeToJSXElement } from '../config';

export const FullScreenPreview: React.FunctionComponent = () => {
  const jsonTree = readTreeFromURL(window.location.href) || readTreeFromStore();
  const themeOverrides = readThemeFromURL(window.location.href) || readThemeFromStore() || {};
  return (
    <Provider theme={teamsTheme} target={document}>
      <Provider theme={themeOverrides}>{renderJSONTreeToJSXElement(jsonTree)}</Provider>
    </Provider>
  );
};
