'use client';

import * as React from 'react';
import type { TagGroupContextValue } from '@fluentui/react-tags';

import type { TagGroupContextValues, TagGroupState } from './TagGroup.types';

export const useTagGroupContextValues = (state: TagGroupState): TagGroupContextValues => {
  const { handleTagDismiss, handleTagSelect, selectedValues, disabled, dismissible, role } = state;

  const tagGroup: TagGroupContextValue = React.useMemo(
    () => ({
      handleTagDismiss,
      handleTagSelect,
      selectedValues,
      disabled,
      dismissible,
      role,
      size: 'medium',
      appearance: 'filled',
    }),
    [handleTagDismiss, handleTagSelect, selectedValues, disabled, dismissible, role],
  );

  return { tagGroup };
};
