import * as React from 'react';
import { FluentProvider, Tag, TagGroup } from '@fluentui/react-windmod-preview';

import { TagGroupVrScene } from './TagGroupVrScene';

export const TagGroupWindmod = (): React.ReactNode => (
  <FluentProvider>
    <TagGroupVrScene TagGroup={TagGroup} Tag={Tag} />
  </FluentProvider>
);
