export type AnnotationAction = 'auto' | 'scaffold' | 'manual' | 'no-equivalent';

export interface Annotation {
  action: AnnotationAction;
  codemod: string;
  payload: string;
  note?: string;
}

/** Location-aware annotation produced by the detection engine. */
export interface AnnotationResult extends Annotation {
  /** 1-based line number in source; annotation comment goes on the line above. */
  line: number;
  /**
   * True when the annotated node is a JSX child element (inside another JSX element).
   * The writer emits JSX block comment syntax instead of a line comment to avoid
   * creating invalid JSX text nodes.
   */
  insideJsx?: boolean;
}

/** Per-file output of analyzeFiles(). */
export interface FileAnalysis {
  filePath: string;
  annotations: AnnotationResult[];
  missingDeps: Array<{ name: string; reason: string }>;
}
