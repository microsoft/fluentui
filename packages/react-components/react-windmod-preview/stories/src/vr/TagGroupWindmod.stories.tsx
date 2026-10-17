import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Tag } from '@fluentui/react-windmod-preview/tag';
import { TagGroup } from '@fluentui/react-windmod-preview/tag-group';

import { TagGroupVrScene } from './TagGroupVrScene';

export const TagGroupWindmod = (): React.ReactNode => (
  <FluentProvider>
    <TagGroupVrScene TagGroup={TagGroup} Tag={Tag} />
  </FluentProvider>
);
