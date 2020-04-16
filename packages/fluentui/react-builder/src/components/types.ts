export type JSONTreeElement = {
  type: string;
  $$typeof?: 'Symbol(react.element)';
  displayName?: string;
  uuid: string | number;
  props?: {
    [key: string]: any;
    children?: (string | JSONTreeElement)[];
  };
};

export type DesignerMode = 'build' | 'design' | 'use';
