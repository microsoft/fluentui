export type OptionValue = {
  key: string;
  id: string;
  value: string;
};

export type OptionGroupValue = {
  count: number;

  id: string;

  getOptionAtIndex(index: number): OptionValue;

  getIndexOfKey(key: string): number;

  getOptionByKey(key: string): OptionValue;
};

export type OptionData = {
  [key: string]: OptionValue;
};

export type OrderedGroupState = {
  groupData: OptionGroupValue;

  options: OptionData;
};
