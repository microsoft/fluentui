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
  webLightTheme,
} from '@fluentui/react-components';

import type { TagPickerLike } from './ComboboxVrTypes';
import { TagPickerOpenVrScene } from './TagPickerOpenVrScene';

// inline keeps the popover in DOM order; without it Griffel portals the surface to document.body
// and it leaves the captured tree entirely — see ComboboxVrTypes.ts.
export const TagPickerOpenRtlGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme} dir="rtl">
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
      inline
    />
  </FluentProvider>
);
