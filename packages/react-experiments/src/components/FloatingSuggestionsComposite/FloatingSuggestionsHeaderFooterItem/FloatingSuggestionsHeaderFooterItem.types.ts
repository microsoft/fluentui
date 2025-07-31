import type { ITheme, IStyle } from '@fluentui/style-utilities';

export interface IFloatingSuggestionsHeaderFooterProps {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  renderItem: () => JSX.Element;
  onExecute?: () => void;
  className?: string;
  ariaLabel?: string;
  shouldShow: () => boolean;
}

export interface IFloatingSuggestionsHeaderFooterItemProps {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
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
