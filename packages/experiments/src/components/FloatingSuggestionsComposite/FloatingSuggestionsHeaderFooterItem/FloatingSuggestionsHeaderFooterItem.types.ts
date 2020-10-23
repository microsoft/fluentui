import { ITheme, IStyle } from '@uifabric/styling';

export interface IFloatingSuggestionsHeaderFooterProps {
  renderItem: () => JSX.Element;
  onExecute?: () => void;
  className?: string;
  ariaLabel?: string;
  shouldShow: () => boolean;
}

export interface IFloatingSuggestionsHeaderFooterItemProps {
  renderItem: () => JSX.Element;
  onExecute?: () => void;
  isSelected: boolean;
  id: string;
  className: string | undefined;
  theme?: ITheme;
}

export interface IFloatingSuggestionHeaderFooterItemStylesProps {}

export interface IFloatingSuggestionHeaderFooterItemStyles {
  actionButton: IStyle;
  buttonSelected: IStyle;
}
