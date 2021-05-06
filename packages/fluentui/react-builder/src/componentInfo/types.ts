// FIXME: these types are copy&paste from @fluentui/docs to avoid circular dependency
// Should be moved to different/separate package?

export type BehaviorInfo = {
  name: string;
  displayName: string;
  category: string;
};

export type ComponentInfo = {
  behaviors?: BehaviorInfo[];
  constructorName: string;
  componentClassName: string;
  implementsCreateShorthand: boolean;
  mappedShorthandProp?: string;
  displayName: string;
  filename: string;
  filenameWithoutExt: string;
  docblock: {
    description: string;
    tags: { description: string; title: string }[];
  };
  apiPath: string;
  isChild: boolean;
  isParent: boolean;
  parentDisplayName: null | string;
  props: ComponentProp[];
  repoPath: string;
  subcomponentName: null | string;
  subcomponents: string[] | null;
  type: 'component';
  moduleName?: string;
};

export type ComponentProp = {
  defaultValue: any;
  description: string;
  name: string;
  tags: {
    title: string;
    description: string;
    type: null;
    name: string;
  }[];
  types: ComponentPropType[];
  required: boolean;
};

export type ComponentPropType = {
  name?: 'any' | 'boolean' | 'never' | 'string' | 'array' | 'literal' | string;
  keyword?: boolean;
  parameters?: ComponentPropType[];
  value?: string;
};
