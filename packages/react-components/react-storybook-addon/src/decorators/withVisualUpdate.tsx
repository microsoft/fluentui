import * as React from 'react';

import type { JSXElement } from '@fluentui/react-utilities';
import { CAPThemeProvider, CAP_THEME_TEAMS } from '@fluentui/react-visual-refresh-preview';
import { VISUAL_UPDATE_ID } from '../constants';
import { FluentStoryContext } from '../hooks';
import { isDecoratorDisabled } from '../utils/isDecoratorDisabled';

export const withVisualUpdate = (StoryFn: () => JSXElement, context: FluentStoryContext): JSXElement => {
  const { globals } = context;

  if (isDecoratorDisabled(context, 'VisualUpdate')) {
    return StoryFn();
  }

  const isVisualUpdateEnabled = globals[VISUAL_UPDATE_ID] ?? false;

  if (isVisualUpdateEnabled) {
    return (
      <CAPThemeProvider theme={{ ...CAP_THEME_TEAMS }}>
        {StoryFn()}
      </CAPThemeProvider>
    );
  }

  return StoryFn();
};