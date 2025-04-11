export interface Token {
  no: number;
  name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fst_reference: string;
  optional: boolean;
  nullable: boolean;
  description: string;
  components: string[];
  contrast: string;
  fallback: string;
  exceptions: string[];
  cssName: string;
}

export type ComponentTokenMap = Record<string, string>;
