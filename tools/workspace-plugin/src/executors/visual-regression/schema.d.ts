export interface VisualRegressionExecutorSchema {
  mode: 'build' | 'build-shared' | 'capture';
  hostRoot: string;
  outputPath: string;
  stories?: string[];
  selectedProjects?: string[];
  addons?: string[];
  previewAnnotations?: string[];
  storybookPath?: string;
  storybookHash?: string;
  concurrency?: number;
}
