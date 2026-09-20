import { renderInfoLabel as renderInfoLabelBase } from '@fluentui/react-headless-components-preview/info-label';
import type { JSXElement } from '@fluentui/react-utilities';
import type { InfoLabelState } from './InfoLabel.types';

export const renderInfoLabel = renderInfoLabelBase as (state: InfoLabelState) => JSXElement;
