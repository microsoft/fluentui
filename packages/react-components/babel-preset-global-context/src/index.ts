import { transformPlugin } from './transformPlugin';

export default function preset(): PluginItem {
  return {
    plugins: [[transformPlugin]],
  };
}
