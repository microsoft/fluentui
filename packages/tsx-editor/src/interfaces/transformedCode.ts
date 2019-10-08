import * as React from 'react';

/** Result of transpiling and/or transforming code */
export interface ITransformedCode {
  /** Transpiled code (defined unless there's an error) */
  output?: string;
  /** Transpile/eval error, if any */
  error?: string | string[];
}

/** Transpiled and/or transformed example, eval'd to get the component to render. */
export interface ITransformedExample extends ITransformedCode {
  /** Component to render (defined unless there's an error) */
  component?: React.ComponentType;
}
