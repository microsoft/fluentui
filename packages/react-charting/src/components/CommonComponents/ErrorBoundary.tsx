import * as React from 'react';
import { getId } from '@fluentui/react/lib/Utilities';
import ErrorImage from './ErrorImage';
import { ITheme } from '@fluentui/react/lib/Styling';

export enum ErrorCodes {
  NoData = 'No data',
  GeneralError = 'General error',
}

export interface IErrorBoundaryProps {
  hasErrorState?: boolean;
  hasEmptyState?: boolean;
  handleError?: () => void;
  handleEmptyState?: () => void;
  theme?: ITheme;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
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
    return { hasError: true, error: error };
  }

  render() {
    if (this.state.hasError || this.props.hasErrorState) {
      if (this.props.handleError !== undefined) {
        return this.props.handleError();
      }
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <ErrorImage theme={this.props.theme} />
          <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'Segoe UI' }}>Couldn't load data</div>
          <div style={{ fontSize: '12px', fontFamily: 'Segoe UI' }}>
            Something went wrong and we couldn't get the page to display
          </div>
          <div style={{ fontSize: '12px', fontFamily: 'Segoe UI' }}>Error code: {ErrorCodes.GeneralError}</div>
        </div>
      );
    } else if (this.props.hasEmptyState) {
      if (this.props.handleEmptyState) {
        return this.props.handleEmptyState();
      }
      return (
        <div
          id={getId('_Chart_empty_')}
          role={'alert'}
          aria-label={'Graph has no data to display'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <ErrorImage theme={this.props.theme} />
          <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'Segoe UI' }}>Couldn't load data</div>
          <div style={{ fontSize: '12px', fontFamily: 'Segoe UI' }}>
            Something went wrong and we couldn't get the page to display
          </div>
          <div style={{ fontSize: '12px', fontFamily: 'Segoe UI' }}>Error code: {ErrorCodes.NoData}</div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
