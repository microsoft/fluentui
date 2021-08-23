import Ajv from 'ajv';

import { configSchema } from './schema';
import type { BabelPluginOptions } from './types';

const ajv = new Ajv();

/**
 * Validates options for plugin with a schema.
 */
export function validateOptions(pluginOptions: BabelPluginOptions): void {
  const valid = ajv.validate(configSchema, pluginOptions);

  if (!valid) {
    throw new Error(`Validation failed for passed config: ${ajv.errorsText(ajv.errors)}`);
  }
}
