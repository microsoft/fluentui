export interface VisualRegressionExecutorSchema {
  mode: 'build' | 'capture';
  hostRoot: string;
  outputPath: string;
  stories?: string[];
  addons?: string[];
  previewAnnotations?: string[];
  storybookPath?: string;
  concurrency?: number;
}
