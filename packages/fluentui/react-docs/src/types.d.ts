import { docgen } from '@fluentui/react-docs';

export type ComponentInfo = {
  Component: any;
  constructorName: string;
  displayName: string;
    docblock: {
      description: string;
      tags: { description: string; title: string }[];
    };
  filename: string;
  filenameWithoutExt: string;
  props: ComponentProp[];
  repoPath: string;
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


export type FileInfo = {
  absPath: string;
  dir: string;
  dirname: string;
  filename: string;
  filenameWithoutExt: string;
  info: docgen.ComponentDoc;
};
