import * as React from 'react';
import { getId } from '@fluentui/react/lib/Utilities';

export interface IErrorBoundaryProps {
  hasErrorState?: boolean;
  hasEmptyState?: boolean;
  handleError?: () => void;
  handleEmptyState?: () => void;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    console.log('here in error boundary');
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
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

  render() {
    if (this.state.hasError || this.props.hasErrorState) {
      console.log('error = ', this.props.handleError);
      if (this.props.handleError !== undefined) {
        return this.props.handleError();
      }
      return (
        <div>
          <img src={'https://upload.wikimedia.org/wikipedia/commons/f/f0/Error.svg'} alt="error" />
        </div>
      );
    } else if (this.props.hasEmptyState) {
      if (this.props.handleEmptyState) {
        return this.props.handleEmptyState();
      }
      return (
        <div id={getId('_Chart_empty')} role={'alert'} aria-label={'Graph has no data to display'}>
          <img
            src={
              'https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7899.jpg?w=996&t=st=1704980908~exp=1704981508~hmac=c9dcc38fa37803ef28cce8639cbe5cb6a66af1d41892b9f9a15326ac3d4cc8da'
            }
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
