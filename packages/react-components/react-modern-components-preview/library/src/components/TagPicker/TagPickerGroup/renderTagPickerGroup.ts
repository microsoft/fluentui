import * as React from 'react';
import { renderTagPickerGroup as renderTagPickerGroupBase } from '@fluentui/react-headless-components-preview/tag-picker';
import type { TagGroupContextValues } from '@fluentui/react-headless-components-preview/tag-group';
import { TagGroupVisualContext } from '../../Tag/tagVisualContext';
import type { TagPickerGroupState } from './TagPickerGroup.types';

export const renderTagPickerGroup = (
  state: TagPickerGroupState,
  contextValues: TagGroupContextValues,
): React.ReactElement =>
  React.createElement(
    TagGroupVisualContext.Provider,
    { value: { appearance: state.appearance, size: state.size } },
    renderTagPickerGroupBase(state, contextValues),
  );
