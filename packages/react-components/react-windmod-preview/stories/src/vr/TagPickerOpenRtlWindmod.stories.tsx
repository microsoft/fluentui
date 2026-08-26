import * as React from 'react';
import {
  Avatar,
  Field,
  FluentProvider,
  Tag,
  TagPicker,
  TagPickerButton,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerOptionGroup,
} from '@fluentui/react-windmod-preview';

import type { TagPickerLike } from './ComboboxVrTypes';
import { TagPickerOpenVrScene } from './TagPickerOpenVrScene';

// list={{ popover: 'manual' }} and the absent `inline` are both windmod-only — see ComboboxVrTypes.ts.
export const TagPickerOpenRtlWindmod = (): React.ReactNode => (
  <FluentProvider dir="rtl">
    <TagPickerOpenVrScene
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
