import * as React from 'react';
import { getStyles } from './ScrollablePane.styles';
import { ScrollablePaneBase } from './ScrollablePane.base';
import { styled } from '../../Utilities';
import type { IScrollablePaneProps, IScrollablePaneStyleProps, IScrollablePaneStyles } from './ScrollablePane.types';

export const ScrollablePane: React.FunctionComponent<IScrollablePaneProps> = styled<
  IScrollablePaneProps,
  IScrollablePaneStyleProps,
  IScrollablePaneStyles
>(ScrollablePaneBase, getStyles, undefined, { scope: 'ScrollablePane' });
