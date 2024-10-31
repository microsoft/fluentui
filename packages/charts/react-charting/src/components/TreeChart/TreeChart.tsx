import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { ITreeStyles, ITreeProps, ITreeStyleProps } from './TreeChart.types';
import { TreeChartBase } from './TreeChart.base';
import { getStyles } from './TreeChart.styles';

/**
 * Treechart component
 * {@docCategory TreeChart}
 */
export const TreeChart: React.FunctionComponent<ITreeProps> = styled<ITreeProps, ITreeStyleProps, ITreeStyles>(
  TreeChartBase,
  getStyles,
);
