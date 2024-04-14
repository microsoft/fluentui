import { OptionValue } from './OptionCollection.types';

export type ActiveOptionProps = {
  onHighlightedOptionChange: (event: React.KeyboardEvent<HTMLElement>, data: HighlightedOptionChangeData) => void;
}

/**
 * Data for the Listbox onHighlightedValueChange event.
 */
export type HighlightedOptionChangeData = {
  highlightedOption: OptionValue | null | undefined;
};
