import * as React from 'react';
import { styled } from '../../Utilities';
import { OverflowSetBase } from './OverflowSet.base';
import { getStyles } from './OverflowSet.styles';
import type { IOverflowSetProps } from './OverflowSet.types';

export const OverflowSet: React.FunctionComponent<IOverflowSetProps> = styled(OverflowSetBase, getStyles, undefined, {
  scope: 'OverflowSet',
});
