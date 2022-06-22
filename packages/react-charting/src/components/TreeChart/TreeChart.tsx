import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { ITreeStyles, ITreeProps, ITreeStyleProps } from '../../index';
import { TreeBase } from './TreeChart.base';
import { getStyles } from './TreeChart.styles';

// Create a AreaChart variant which uses these default styles and this styled subcomponent.
export const TreeChart: React.FunctionComponent<ITreeProps> = styled<ITreeProps, ITreeStyleProps, ITreeStyles>(
  TreeBase,
  getStyles,
);
