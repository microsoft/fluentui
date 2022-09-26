import * as React from 'react';
import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { ITreeStyles, ITreeProps, ITreeStyleProps } from './TreeChart.types';
import { TreeChartBase } from './TreeChart.base';
import { getStyles } from './TreeChart.styles';

export const TreeChart: React.FunctionComponent<ITreeProps> = styled<ITreeProps, ITreeStyleProps, ITreeStyles>(
  TreeChartBase,
  getStyles,
);
