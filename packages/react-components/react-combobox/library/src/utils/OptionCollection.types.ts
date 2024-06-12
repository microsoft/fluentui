export type OptionValue = {
  /** The disabled state of the option. */
  disabled?: boolean;

  /** The `id` attribute of the option. */
  id: string;

  /** The `text` string for the option. */
  text: string;

  /** The value string of the option. */
  value: string;
};

export type OptionCollectionState = {
  /**
   * @deprecated - no longer used internally
   */
  getIndexOfId(id: string): number;

  /**
   * @deprecated - no longer used internally
   */
  getOptionAtIndex(index: number): OptionValue | undefined;

  /**
   * @deprecated - no longer used internally
   */
  getOptionsMatchingText(matcher: (text: string) => boolean): OptionValue[];

  /** The total number of options in the collection. */
  getCount: () => number;

  /** Returns the option data by key. */
  getOptionById(id: string): OptionValue | undefined;

  /** Returns an array of options filtered by a value matching function against the option's value string. */
  getOptionsMatchingValue(matcher: (value: string) => boolean): OptionValue[];

  /** The unordered option data. */
  options: OptionValue[];

  /** A function that child options call to register their values. Returns a function to unregister the option. */
  registerOption: (option: OptionValue, element: HTMLElement) => () => void;
};
