import type { PlaygroundRuntimeManifest, PlaygroundSetupMetadata } from '../setup';

export interface ResolvedPlaygroundRuntimeManifest extends PlaygroundRuntimeManifest {
  baseUrl: string;
  scripts: string[];
  styles: string[];
  typings: string;
}

export type PlaygroundRuntimeErrorKind = 'import' | 'runtime' | 'export';

export type PlaygroundRuntimeMessage =
  | {
      source: 'fluentui-playground';
      token: string;
      type: 'ready';
      metadata: PlaygroundSetupMetadata;
    }
  | {
      source: 'fluentui-playground';
      token: string;
      type: 'success';
      runId: number;
    }
  | {
      source: 'fluentui-playground';
      token: string;
      type: 'error';
      runId: number;
      kind: PlaygroundRuntimeErrorKind;
      message: string;
    };

export async function loadRuntimeManifest(
  targetWindow: Window,
  manifestPath: string,
): Promise<ResolvedPlaygroundRuntimeManifest> {
  const manifestUrl = new URL(manifestPath, targetWindow.location.href);
  const response = await targetWindow.fetch(manifestUrl);

  if (!response.ok) {
    throw new Error(`Failed to load playground runtime (${response.status} ${response.statusText})`);
  }

  const manifest = (await response.json()) as PlaygroundRuntimeManifest;
  const storybookRoot = new URL('../../', manifestUrl);

  return {
    ...manifest,
    baseUrl: storybookRoot.href,
    scripts: manifest.scripts.map(script => new URL(script, storybookRoot).href),
    styles: manifest.styles.map(style => new URL(style, storybookRoot).href),
    typings: new URL(manifest.typings, storybookRoot).href,
  };
}
