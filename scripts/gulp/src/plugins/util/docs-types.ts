import { Tag } from 'doctrine';

// Temporary copy from packages/fluentui/docs/src/types.ts
// TODO: move types to shared location

export type ExampleSource = {
  js: string;
  ts: string;
};

export type BehaviorInfo = {
  name: string;
  displayName: string;
  category: string;
};

export type BehaviorVariantionInfo = {
  name: string;
  description: string;
  specification: string;
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
    tags: Tag[];
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
};

export type ComponentProp = {
  defaultValue: any;
  description: string;
  name: string;
  tags: Tag[];
  types: ComponentPropType[];
  required: boolean;
  resolvedType?: any;
};

export type ComponentPropType = {
  name?: 'any' | 'boolean' | 'never' | 'string' | 'array' | 'literal' | string;
  keyword?: boolean;
  parameters?: ComponentPropType[];
  value?: string;
};
