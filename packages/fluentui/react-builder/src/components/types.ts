export type JSONTreeElement = {
  type: string;
  uuid: string | number;
  props?: { [key: string]: any };
  children?: (string | JSONTreeElement)[];
};

export type ElementLike = {
  displayName: string;
  type?: { [key: string]: any };
  props?: { [key: string]: any };
};

export type DesignerMode = 'build' | 'use';
