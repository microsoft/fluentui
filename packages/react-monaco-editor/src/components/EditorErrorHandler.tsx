import * as React from 'react';
import { EditorError } from './EditorError';
import type { ITransformedExample } from '../interfaces/index';

export interface IEditorErrorBoundaryProps {
  /**
   * Result of transforming the code. Used to get the transform error (if any) and to determine
   * when a previously-caught rendering error should be cleared (because the code has updated and
   * we should try again).
   */
  transformResult: ITransformedExample;
}

interface IEditorErrorBoundaryState {
  caughtError?: string;
}

/**
 * Error boundary to catch and display any errors thrown while rendering the example component.
 * It also handles displaying errors from transforming the code.
 *
 * The example preview should be rendered as a child of this component. (This component can't just
 * render the preview directly because error boundaries only catch errors in passed-in children.)
 */
export class EditorErrorBoundary extends React.Component<IEditorErrorBoundaryProps, IEditorErrorBoundaryState> {
  public state: IEditorErrorBoundaryState = {};
  private _lastGoodChildren: React.ReactNode;
  private _lastErrorTime: number | undefined;

  public static getDerivedStateFromError(error: Error) {
    return { caughtError: `Error while rendering component: ${error.message || error}` };
  }

  public componentDidUpdate(prevProps: IEditorErrorBoundaryProps, prevState: IEditorErrorBoundaryState) {
    const { props, state } = this;
    // remove the caught error state if:
    // - the error state is not new (present in both curr/prev state)
    // - we have an updated result to render
    if (
      state.caughtError &&
      prevState.caughtError &&
      props.transformResult.output !== prevProps.transformResult.output
    ) {
      this.setState({ caughtError: undefined });
    }

    if (!(state.caughtError || props.transformResult.error)) {
      // keep track of the last known-good children, to reuse if there's an error
      this._lastGoodChildren = props.children;
    }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error to the console so people can see the full stack/etc if they want
    // (only in production, because React logs these errors itself in dev mode)
    if (process.env.NODE_ENV === 'production') {
      /* eslint-disable no-console */
      console.error(error.stack || error);
      console.error('In component: ' + errorInfo.componentStack);
      /* eslint-enable no-console */
    }

    // If there was another error within the past second, get rid of the "last good children"
    // because re-rendering them may cause an infinite loop (has sometimes happened with list
    // examples in the past)
    const errorTime = Date.now();
    if (this._lastErrorTime && errorTime - this._lastErrorTime < 1000) {
      this._lastGoodChildren = null;
    }

    this._lastErrorTime = errorTime;
  }

  public render() {
    const caughtError = this.state.caughtError;
    const error = caughtError || this.props.transformResult.error;
    return (
      <>
        <EditorError error={error} />
        {
          // If there was an error either transforming or rendering, reuse the most recent
          // successfully-rendered children (especially important if the error is from rendering,
          // because attempting to re-render bad children causes the page to crash)
          error ? this._lastGoodChildren : this.props.children
        }
      </>
    );
  }
}
