import * as React from 'react';

export interface IErrorBoundaryProps {
  handleError: (error: Error) => void;
}

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  constructor(props: IErrorBoundaryProps) {
    super(props);
    console.log('here in error boundary');
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }

  static getDerivedStateFromError(error: Error) {
    console.log('error = ', error);
    return { hasError: true, error: error };
  }

  handleError(error: Error) {
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <img src={'https://upload.wikimedia.org/wikipedia/commons/f/f0/Error.svg'} alt="error" />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
