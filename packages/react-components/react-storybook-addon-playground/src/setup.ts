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
  /** Declarations that are always loaded (React and the `typings` addon option). */
  typings: string;
  /**
   * Declaration files per configured module (including a file shared by several modules), loaded when the code imports
   * that module. Older manifests omit it and include every module's declarations in `typings`.
   */
  moduleTypings?: Record<string, string[]>;
  allowedModules: string[];
  buildId: string;
}

/**
 * Identity helper for typed playground setup modules.
 */
export function definePlaygroundSetup<TTheme>(setup: PlaygroundSetup<TTheme>): PlaygroundSetup<TTheme> {
  return setup;
}
