import * as React from 'react';
import { getStyles } from './ScrollablePane.styles';
import { IScrollablePaneProps, IScrollablePaneStyleProps, IScrollablePaneStyles } from './ScrollablePane.types';
import { ScrollablePaneBase } from './ScrollablePane.base';
import { styled } from '../../Utilities';

export const ScrollablePane: React.StatelessComponent<IScrollablePaneProps> = styled<
  IScrollablePaneProps,
  IScrollablePaneStyleProps,
  IScrollablePaneStyles
>(ScrollablePaneBase, getStyles, undefined, { scope: 'ScrollablePane' });
