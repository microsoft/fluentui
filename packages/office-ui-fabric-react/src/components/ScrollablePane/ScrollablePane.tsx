import { styled } from '../../Utilities';
import { IScrollablePaneProps, IScrollablePaneStyleProps, IScrollablePaneStyles } from './ScrollablePane.types';
import { ScrollablePaneBase } from './ScrollablePane.base';
import { getStyles } from './ScrollablePane.styles';

export const ScrollablePane: React.StatelessComponent<IScrollablePaneProps> = styled<
  IScrollablePaneProps,
  IScrollablePaneStyleProps,
  IScrollablePaneStyles
>(ScrollablePaneBase, getStyles, undefined, { scope: 'ScrollablePane' });
