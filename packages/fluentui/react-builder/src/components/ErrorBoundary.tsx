import * as React from 'react';

export class ErrorBoundary extends React.Component<any, any> {
  state = {
    hasError: false,
    forCode: null,
    error: null,
  };

  static getDerivedStateFromProps(props, state) {
    // FIXME: `code` is null if code editor is closed
    //   - what should we use to detect changes? always serialize the tree? or version in Designer's state?
    // FIXME: we should not need getDerivedStateFromProps
    if (props.code !== state.forCode && state.hasError) {
      return { hasError: false, error: null, forCode: props.code };
    }
    return null;
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }
    return <pre>{this.state.error.message}</pre>;
  }
}
