import * as React from 'react';

export type OptionValue = {
  /** The `key` prop of the option. */
  key: string;

  /** The `id` attribute of the option. */
  id: string;

  /** The value string of the option. */
  value: string;
};

export type OptionCollectionValue = {
  /** The total number of options in the collection. */
  count: number;

  /** Returns the option data for the nth option. */
  getOptionAtIndex(index: number): OptionValue;

  /** Returns the index of an option by key. */
  getIndexOfKey(key: string): number;

  /** Returns the option data by key. */
  getOptionByKey(key: string): OptionValue;
};

export type OptionData = {
  [key: string]: OptionValue;
};

export type OptionCollectionState = {
  /** The processed children of the option collection. */
  children: React.ReactNode;

  /** A set collection utilties for accessing options by index or key. */
  collectionData: OptionCollectionValue;

  /** The unordered option data. */
  options: OptionData;

  /* A function that child options call to register their values. Returns a function to unregister the option. */
  registerOption: (option: OptionValue) => void;
};
