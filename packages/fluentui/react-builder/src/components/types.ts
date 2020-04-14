export type JSONTreeElement = {
  type: string;
  displayName?: string;
  uuid: string | number;
  props?: { [key: string]: any };
  children?: (string | JSONTreeElement)[];
};

export type DesignerMode = 'build' | 'design' | 'use';
