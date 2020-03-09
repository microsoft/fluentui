export type FluentBehaviorInfo = {
  name: string;
  displayName: string;
  category: string;
};

export type FluentComponentInfo<T> = T & {
  apiPath: string;
  behaviors?: FluentBehaviorInfo[];
  componentClassName: string;
  implementsCreateShorthand: boolean;
  isChild: boolean;
  isParent: boolean;
  mappedShorthandProp?: string;
  parentDisplayName: null | string;
  subcomponentName: null | string;
  subcomponents: string[];
};
