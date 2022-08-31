export type CodeItemInfo = {
  name: string;
  componentType: 'component' | 'hook' | 'method' | 'constant' | 'type' | 'misc';
  newColumn?: boolean;
};

export type PackageInfo = {
  name: string;
  codeItems: CodeItemInfo[];
  newColumn?: boolean;
};

export type AreaInfo = {
  name: string;
  packages: PackageInfo[];
  newRow?: boolean;
};

export type LibraryInfo = {
  name: string;
  areas: AreaInfo[];
};
