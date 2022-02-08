export type OptionValue = {
  key: string;
  id: string;
  value: string;
};

export type OptionCollectionValue = {
  count: number;

  id: string;

  getOptionAtIndex(index: number): OptionValue;

  getIndexOfKey(key: string): number;

  getOptionByKey(key: string): OptionValue;
};

export type OptionData = {
  [key: string]: OptionValue;
};

export type OptionCollectionState = {
  collectionData: OptionCollectionValue;

  options: OptionData;

  /* function that child options call to register their values */
  registerOption: (option: OptionValue) => void;

  /* function that child options call to unregister their values */
  unRegisterOption: (id: string) => void;
};
