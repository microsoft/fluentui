export interface GenerateApiExecutorSchema {
  config?: string;
  local?: boolean;
  diagnostics?: boolean;
  exportSubpaths?: boolean | { apiReport?: boolean };
}
