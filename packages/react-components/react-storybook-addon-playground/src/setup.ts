import type * as React from 'react';

export interface PlaygroundTheme<TTheme = unknown> {
  id: string;
  label: string;
  value: TTheme;
  /** When `true`, the playground shell (editor chrome) uses its dark palette. */
  dark?: boolean;
}

export interface PlaygroundSetup<TTheme = unknown> {
  title?: string;
  subtitle?: string;
  defaultCode?: string;
  themes?: PlaygroundTheme<TTheme>[];
  render?: (context: { Component: React.ComponentType; theme: TTheme | undefined }) => React.ReactElement;
}

export interface PlaygroundSetupMetadata {
  title?: string;
  subtitle?: string;
  defaultCode?: string;
  themes: Array<{ id: string; label: string; dark?: boolean }>;
}

export interface PlaygroundRuntimeManifest {
  scripts: string[];
  styles: string[];
  typings: string;
  allowedModules: string[];
  buildId: string;
}

/**
 * Identity helper for typed playground setup modules.
 */
export function definePlaygroundSetup<TTheme>(setup: PlaygroundSetup<TTheme>): PlaygroundSetup<TTheme> {
  return setup;
}
