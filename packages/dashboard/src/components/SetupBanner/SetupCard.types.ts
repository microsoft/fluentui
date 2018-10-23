export interface ICardProps {
  id: number;
  title: string;
  selected: boolean;
  checked: boolean;
  transitionEnd?: (event: TransitionEvent) => void;
  transitionStart?: (event: TransitionEvent) => void;
}
