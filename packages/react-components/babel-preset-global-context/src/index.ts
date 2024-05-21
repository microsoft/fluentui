import { transformPlugin } from './transformPlugin';
import type { PluginItem } from '@babel/core';

export default function preset(): PluginItem {
  return {
    plugins: [[transformPlugin]],
  };
}
