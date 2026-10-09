import * as React from 'react';
import { Avatar } from '@fluentui/react-windmod-preview/avatar';
import { Field } from '@fluentui/react-windmod-preview/field';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Tag } from '@fluentui/react-windmod-preview/tag';
import {
  TagPicker,
  TagPickerButton,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerOptionGroup,
} from '@fluentui/react-windmod-preview/tag-picker';

import type { TagPickerLike } from './ComboboxVrTypes';
import { TagPickerWidthVrScene } from './TagPickerWidthVrScene';

// list={{ popover: 'manual' }} and the absent `inline` are both windmod-only — see ComboboxVrTypes.ts.
export const TagPickerWidthLtrWindmod = (): React.ReactNode => (
  <FluentProvider>
    <TagPickerWidthVrScene
      Avatar={Avatar}
      Field={Field}
      Tag={Tag}
      TagPicker={TagPicker as TagPickerLike}
      TagPickerButton={TagPickerButton}
      TagPickerControl={TagPickerControl}
      TagPickerGroup={TagPickerGroup}
      TagPickerInput={TagPickerInput}
      TagPickerList={TagPickerList}
      TagPickerOption={TagPickerOption}
      TagPickerOptionGroup={TagPickerOptionGroup}
      list={{ popover: 'manual' }}
    />
  </FluentProvider>
);
