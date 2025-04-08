export interface TypeCheckExecutorSchema {
  /**
   * Exclude TsConfigs from type checking (e2e,spec). By default all TsConfigs specified in project root tsconfig#references are checked.
   */
  excludeProject?: { spec: boolean; e2e: boolean };
}
