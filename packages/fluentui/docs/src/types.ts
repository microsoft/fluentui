import { UseKnobOptions } from '@fluentui/docs-components';
import { ThemePrepared } from '@fluentui/react-northstar';

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

export type KnobGeneratorOptions = {
  propName?: string;
  propDef: ComponentProp;
  componentInfo: ComponentInfo;
  theme: ThemePrepared;
};
export type KnobDefinition = UseKnobOptions<any> & { hook: Function };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type KnobGenerator<T> = (options: KnobGeneratorOptions) => KnobDefinition;

export type KnobComponentGenerators<P> = Partial<Record<keyof P, KnobGenerator<any>>>;
