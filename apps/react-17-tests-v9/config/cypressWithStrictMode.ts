// TODO: these relative paths won;t work once repo is migrated to react18, will need to adjust to local node_modules
import { mount as cypressMount } from '../../../node_modules/@cypress/react';

type MountWithStrictMode = typeof cypressMount;

export * from '../../../node_modules/@cypress/react';

export const mount: MountWithStrictMode = (jsx, options) => {
  const { strict = true, ...rest } = options || {};

  return cypressMount(jsx, { strict, ...rest });
};
