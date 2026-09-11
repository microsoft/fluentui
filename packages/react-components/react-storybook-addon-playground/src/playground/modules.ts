/**
 * Pre-installed dependencies available to playground code.
 *
 * Every entry is a lazy loader so each dependency becomes its own webpack chunk and is only downloaded when the code
 * actually imports it (e.g. `@fluentui/react-icons` is large).
 */
export type ModuleLoader = () => Promise<unknown>;

export const moduleLoaders: Record<string, ModuleLoader> = {
  react: () => import('react'),
  'react/jsx-runtime': () => import('react/jsx-runtime'),
  'react-dom': () => import('react-dom'),
  '@fluentui/react-components': () => import('@fluentui/react-components'),
  '@fluentui/react-components/unstable': () => import('@fluentui/react-components/unstable'),
  '@fluentui/react-icons': () => import('@fluentui/react-icons'),
};

export const allowedModuleNames = Object.keys(moduleLoaders);
