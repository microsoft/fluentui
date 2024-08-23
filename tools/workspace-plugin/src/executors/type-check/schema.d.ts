export interface TypeCheckExecutorSchema {
  /**
   * Exclude TsConfigs from type checking (e2e,spec).
   */
  exclude?: { spec: boolean; e2e: boolean };
}
