import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface ISetupCardProps {
  id?: string;
  title: string;
  selected: boolean;
  checked: boolean;
  customStyle?: IStyle;
  className?: string;
  transitionEnd?: (event: TransitionEvent) => void;
  transitionStart?: (event: TransitionEvent) => void;
}

export interface ISetupCardStyles {
  root: IStyle;
  title: IStyle;
  cardBackground: IStyle;
  cardContentBackground: IStyle;
  cardRightEdge: IStyle;
  cardRightEdgeSeparator: IStyle;
  cardRightEdgeShadow: IStyle;
  cardTopEdge: IStyle;
  cardTopEdgeSeparator: IStyle;
  checkmark: IStyle;
}

export interface ISetupCardStylesProps {
  checked: boolean;
  selected: boolean;
}
