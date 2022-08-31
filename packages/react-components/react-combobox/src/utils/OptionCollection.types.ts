export type OptionValue = {
  /** The disabled state of the option. */
  disabled?: boolean;

  /** The `id` attribute of the option. */
  id: string;

  /** The value string of the option. */
  value: string;
};

export type OptionCollectionState = {
  /** The total number of options in the collection. */
  getCount: () => number;

  /** Returns the index of an option by key. */
  getIndexOfId(id: string): number;

  /** Returns the option data for the nth option. */
  getOptionAtIndex(index: number): OptionValue | undefined;

  /** Returns the option data by key. */
  getOptionById(id: string): OptionValue | undefined;

  /** Returns an array of options filtered by a value matching function. */
  getOptionsMatchingValue(matcher: (value: string) => boolean): OptionValue[];

  /** The unordered option data. */
  options: OptionValue[];

  /* A function that child options call to register their values. Returns a function to unregister the option. */
  registerOption: (option: OptionValue, element: HTMLElement) => () => void;
};
