import * as React from 'react';
import {
  renderTagGroup as renderTagGroupBase,
  type TagGroupContextValues,
} from '@fluentui/react-headless-components-preview/tag-group';
import { TagGroupVisualContext } from '../Tag/tagVisualContext';
import type { TagGroupState } from './TagGroup.types';

export const renderTagGroup = (state: TagGroupState, contextValues: TagGroupContextValues): React.ReactElement =>
  React.createElement(
    TagGroupVisualContext.Provider,
    { value: { appearance: state.appearance, size: state.size } },
    renderTagGroupBase(state, contextValues),
  );
