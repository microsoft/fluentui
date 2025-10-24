// Definitions of component groups, their properties, variants, states, scales, and parts
export interface GroupPart {
  coreProperties?: string[];
  variantStateProperties?: string[];
  variantProperties?: string[];
  scales?: string[];
  scaleStateProperties?: string[];
  scaleProperties?: string[];
  variants?: string[];
  states?: string[];
  parts?: { [key: string]: GroupPart };
  exceptions?: GroupPart[];
  components?: string[];
}

export interface Groups {
  [key: string]: GroupPart;
}
