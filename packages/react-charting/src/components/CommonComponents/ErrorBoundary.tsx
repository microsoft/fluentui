/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { getId } from '@fluentui/react/lib/Utilities';
import ErrorImage from './ErrorImage';
import { ITheme } from '@fluentui/react/lib/Styling';
import MissingDataImage from './MissingDataImage';

export enum ErrorCodes {
  NoData = 'No data',
  GeneralError = 'General error',
}

export interface IErrorBoundaryProps {
  hasErrorState?: boolean;
  hasEmptyState?: boolean;
  handleError?: () => JSX.Element;
  handleEmptyState?: () => JSX.Element;
  theme?: ITheme;
  width?: number;
  height?: number;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public componentDidCatch(_error: any, _errorInfo: any) {
    this.setState({
      hasError: true,
    });
  }

  public render() {
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
          <ErrorImage
            theme={this.props.theme}
            width={
              this.props.width ? (this.props.width > 500 ? 500 : this.props.width < 350 ? 350 : this.props.width) : 350
            }
            height={
              this.props.height
                ? this.props.height > 500
                  ? 500
                  : this.props.height < 350
                  ? 350
                  : this.props.height
                : 350
            }
          />
          <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'Segoe UI', textAlign: 'center' }}>
            Couldn't load data
          </div>
          <div style={{ fontSize: '12px', fontFamily: 'Segoe UI', textAlign: 'center' }}>
            Something went wrong and we couldn't get the page to display
          </div>
          <div style={{ fontSize: '12px', fontFamily: 'Segoe UI', textAlign: 'center' }}>
            Error code: {ErrorCodes.GeneralError}
          </div>
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
          <MissingDataImage
            theme={this.props.theme}
            width={
              this.props.width ? (this.props.width > 500 ? 500 : this.props.width < 350 ? 350 : this.props.width) : 350
            }
            height={
              this.props.height
                ? this.props.height > 500
                  ? 500
                  : this.props.height < 350
                  ? 350
                  : this.props.height
                : 350
            }
          />
          <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'Segoe UI', textAlign: 'center' }}>
            Couldn't load data
          </div>
          <div style={{ fontSize: '12px', fontFamily: 'Segoe UI', textAlign: 'center' }}>
            Something went wrong and we couldn't get the page to display
          </div>
          <div style={{ fontSize: '12px', fontFamily: 'Segoe UI', textAlign: 'center' }}>
            Error code: {ErrorCodes.NoData}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
