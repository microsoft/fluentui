import * as React from 'react';
import { FluentProvider, Tag, TagGroup, webLightTheme } from '@fluentui/react-components';

import { TagGroupVrScene } from './TagGroupVrScene';

export const TagGroupGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <TagGroupVrScene TagGroup={TagGroup} Tag={Tag} />
  </FluentProvider>
);
