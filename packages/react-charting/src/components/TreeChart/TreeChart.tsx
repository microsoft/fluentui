import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { ITreeStyles, ITreeProps, ITreeStyleProps } from './TreeChart.types';
import { TreeBase } from './TreeChart.base';
import { getStyles } from './TreeChart.styles';

export const TreeChart: React.FunctionComponent<ITreeProps> = styled<ITreeProps, ITreeStyleProps, ITreeStyles>(
  TreeBase,
  getStyles,
);
