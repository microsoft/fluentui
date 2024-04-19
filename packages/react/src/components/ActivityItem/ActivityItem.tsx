import * as React from 'react';
import { styled } from '../../Utilities';
import { ActivityItemBase } from './ActivityItem.base';
import { getStyles } from './ActivityItem.styles';
import type { IActivityItemProps, IActivityItemStyleProps, IActivityItemStyles } from './ActivityItem.types';

export const ActivityItem: React.FunctionComponent<IActivityItemProps> = styled<
  IActivityItemProps,
  IActivityItemStyleProps,
  IActivityItemStyles
>(ActivityItemBase, getStyles, undefined, { scope: 'ActivityItem' });
