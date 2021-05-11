import { DevEnv } from 'ability-attributes';

export * from './schema';
export interface Settings extends DevEnv.DevEnvSettings {}

export function setup(settings?: Settings) {
  if (process.env.NODE_ENV !== 'production') {
    DevEnv.setup({ enforceClasses: false, ignoreUnknownClasses: true, ...settings });
  }
}
