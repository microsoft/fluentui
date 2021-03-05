import { mergeStyles } from '@fluentui/merge-styles';

export const MainPanelNumericalWidth = 1100;
export const MainPanelWidth = `${MainPanelNumericalWidth}px`;
export const MainPanelInnerContent = mergeStyles({
  marginRight: 'auto',
  marginLeft: 'auto',
  padding: '32px',
  width: MainPanelWidth,
});
