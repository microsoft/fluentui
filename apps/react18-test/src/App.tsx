import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Default } from '../../../packages/react-components/react-button/src/stories/Button/ButtonDefault.stories';
import { Appearance } from '../../../packages/react-components/react-button/src/stories/Button/ButtonAppearance.stories';

export const App = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <Default />
      <Appearance />
    </FluentProvider>
  );
};
