import { transformPlugin } from './transformPlugin';

import type { ConfigAPI } from '@babel/core';

export default function preset(babel: ConfigAPI) {
  return {
    plugins: [[transformPlugin]],
  };
}
