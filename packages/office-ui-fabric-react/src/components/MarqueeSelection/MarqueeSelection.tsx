import { styled } from '../../Utilities';
import { MarqueeSelectionBase } from './MarqueeSelection.base';
import { getStyles } from './MarqueeSelection.styles';
import { IMarqueeSelectionProps } from './MarqueeSelection.types';

export const MarqueeSelection: React.StatelessComponent<IMarqueeSelectionProps> = styled(MarqueeSelectionBase, getStyles, undefined, {
  scope: 'MarqueeSelection'
});
