import * as React from 'react';
import {
  renderInteractionTag as renderInteractionTagBase,
  type InteractionTagContextValues,
} from '@fluentui/react-headless-components-preview/interaction-tag';
import { InteractionTagVisualContext } from '../../Tag/tagVisualContext';
import type { InteractionTagState } from './InteractionTag.types';

export const renderInteractionTag = (
  state: InteractionTagState,
  contextValues: InteractionTagContextValues,
): React.ReactElement =>
  React.createElement(
    InteractionTagVisualContext.Provider,
    { value: { appearance: state.appearance, shape: state.shape, size: state.size } },
    renderInteractionTagBase(state, contextValues),
  );
