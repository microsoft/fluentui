import { getProjectConfig } from '../../utils';
import { MigrateConvergedPkgGeneratorSchema } from './schema';

export interface AssertedSchema extends MigrateConvergedPkgGeneratorSchema {
  name: string;
}

export interface NormalizedSchema extends AssertedSchema, ReturnType<typeof getProjectConfig> {
  /**
   * package name without npmScope (@scopeName)
   */
  normalizedPkgName: string;
}
