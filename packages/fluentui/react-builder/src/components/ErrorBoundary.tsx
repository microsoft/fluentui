import * as React from 'react';

export class ErrorBoundary extends React.Component<any, any> {
  state = {
    hasError: false,
    forCode: null,
    forJsonTree: null,
    error: null,
  };

  static getDerivedStateFromProps(props, state) {
    // FIXME: we should not need getDerivedStateFromProps
    if (props.code !== state.forCode || (props.jsonTree !== state.forJsonTree && state.hasError)) {
      return { hasError: false, error: null, forCode: props.code, forJsonTree: props.jsonTree };
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
