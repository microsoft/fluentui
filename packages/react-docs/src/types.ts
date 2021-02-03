import { ComponentType } from 'react';
import { Theme } from '@fluentui/react-theme';

//
// Missing Storybook Types
//
type StorybookContext<globals> = {
  argTypes: {};
  args: {};
  globals: globals;
  hooks: {
    currentContext: any;
    currentDecoratorName: any;
    currentEffects: any[];
    currentHooks: any[];
    currentPhase: string;
    hasUpdates: boolean;
    hookListsMap: WeakMap<(...args: any[]) => any, []>;
    mountedDecorators: Set<(...args: any[]) => any>;
    nextHookIndex: number;
    prevEffects: any[];
    prevMountedDecorators: Set<(...args: any[]) => any>;
    renderListener: () => any;
  };
  id: string;
  kind: string;
  loaded: object;
  name: string;
  parameters: {
    args: {};
    argTypes: {};
    component: any;
    docs: {
      container: ComponentType;
      iframeHeight: number;
      inlineStories: boolean;
      page: ComponentType;
      prepareForInline: () => any;
    };
    fileName: string;
    framework: string;
    globals: {};
    globalTypes: {}; // same as storybook main.ts config
    storySource: { source: string };
    subcomponents: any;
    story: string;
    viewMode: string;
  };
};

//
// Our usage of Storybook Types
//
export type StorybookThemeGlobal = {
  debugName: string;
  friendlyName: string;
  light: Theme;
  dark: Theme;
  highContrast: Theme;
};

export type StorybookStoryContext = StorybookContext<{
  theme: StorybookThemeGlobal;
}>;
