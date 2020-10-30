// Due to the react reference, putting these under /types doesn't work well

/* eslint-disable spaced-comment, @fluentui/no-global-react */
/// <reference types="react" />

declare const __DEV__: boolean;
declare const __PATH_SEP__: string;
declare const __BASENAME__: string;

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.mdx' {
  export const meta: {
    title: string;
  };
  const value: React.ComponentType;

  export default value;
}

declare interface Window {
  resetExternalLayout?: () => void;
  switchTheme?: (themeName: string) => void;
}
