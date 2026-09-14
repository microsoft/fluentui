import type * as React from 'react';

export interface PlaygroundTheme<TTheme = unknown> {
  id: string;
  label: string;
  value: TTheme;
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
  themes: Array<{ id: string; label: string }>;
}

export interface PlaygroundRuntimeManifest {
  scripts: string[];
  styles: string[];
  typings: string;
  allowedModules: string[];
  buildId: string;
}

export function definePlaygroundSetup<TTheme>(setup: PlaygroundSetup<TTheme>): PlaygroundSetup<TTheme> {
  return setup;
}
