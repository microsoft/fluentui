import defaultConfig from '@microsoft/fast-test-harness/vite.config.mjs';
import { mergeConfig } from 'vite';

export default mergeConfig(defaultConfig, {
  publicDir: '../public',
});
