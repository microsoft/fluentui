export type OptionValue = {
  id: string;
  value: string;
};

export type OptionGroupValue = {
  count: number;

  id: string;

  getIdAtIndex(index: number): string;

  getIndexOfId(id: string): number;
};

export type OptionData = {
  [id: string]: OptionValue | OptionGroupValue;
};

export type OrderedGroupState = {
  groupData: OptionGroupValue;

  options: OptionData;
};
