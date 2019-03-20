import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { IAddCardPanelProps, IAddCardPanelStyleProps, IAddCardPanelStyles } from './AddCardPanel.types';
import { AddCardPanelBase } from './AddCardPanelBase';
import { getStyles } from './AddCardPanel.styles';

// Create a AddCardPanel variant which uses these default styles and this styled subcomponent.
export const AddCardPanel: React.StatelessComponent<IAddCardPanelProps> = styled<
  IAddCardPanelProps,
  IAddCardPanelStyleProps,
  IAddCardPanelStyles
>(AddCardPanelBase, getStyles);
