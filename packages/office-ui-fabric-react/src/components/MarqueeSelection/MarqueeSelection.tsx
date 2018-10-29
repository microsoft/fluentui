import { styled } from '../../Utilities';
import { MarqueeSelectionBase } from './MarqueeSelection.base';
import { getStyles } from './MarqueeSelection.styles';
import { IMarqueeSelectionProps } from './MarqueeSelection.types';

export const MarqueeSelection: (props: IMarqueeSelectionProps) => JSX.Element = styled(MarqueeSelectionBase, getStyles, undefined, {
  scope: 'MarqueeSelection'
});
