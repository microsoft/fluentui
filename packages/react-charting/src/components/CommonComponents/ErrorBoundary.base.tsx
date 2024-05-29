/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { classNamesFunction, getId } from '@fluentui/react/lib/Utilities';
import { IErrorBoundaryProps, IErrorBoundaryStyles } from './ErrorBoundary.types';
import { ErrorBadgeIcon, ErrorIcon, StatusErrorFullIcon } from '@fluentui/react-icons-mdl2';

export enum ErrorCodes {
  NoData = 'No data',
  GeneralError = 'General error',
}

interface IErrorBoundaryState {
  hasError: boolean;
  errorMsg: string;
}
const getClassNames = classNamesFunction<IErrorBoundaryProps, IErrorBoundaryStyles>();

export class ErrorBoundaryBase extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  private _defaultErrorMsg = "Something went wrong and we couldn't get the page to display";
  private _classNames;
  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error.message };
  }

  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMsg: '',
    };
    this._classNames = getClassNames(this.props.styles!, {
      hasEmptyState: this.props.hasEmptyState,
      theme: this.props.theme!,
      width: this.props.width,
      height: this.props.height,
    });
  }

  public componentDidCatch(_error: any, errorInfo: any) {
    this.setState({
      hasError: true,
      errorMsg: errorInfo,
    });
  }

  public render() {
    if (this.state.hasError || this.props.hasEmptyState) {
      if (this.state.hasError && this.props.handleError !== undefined) {
        return this.props.handleError();
      }

      if (this.props.hasEmptyState && this.props.handleEmptyState !== undefined) {
        return (
          <div
            id={getId('_Chart_empty_')}
            role={'alert'}
            aria-label={this.state.errorMsg ? this.state.errorMsg : this._defaultErrorMsg}
            className={this._classNames.root}
          >
            {this.props.handleEmptyState()}
          </div>
        );
      }
      return (
        <div id={getId('_Chart_empty_')} className={this._classNames.root} aria-label={this._getAriaLabel()}>
          <div className={this._classNames.errorIconDiv}>{this._getErrorIcon()}</div>
          {this._displayErrorMessage()}
          <div className={this._classNames.dataLoadErrorSubText}>
            {`Error code: ${this.props.hasEmptyState ? ErrorCodes.NoData : ErrorCodes.GeneralError}`}
          </div>
        </div>
      );
    }
    return this.props.children;
  }

  private _getErrorIcon(): JSX.Element {
    return this.props.hasEmptyState ? (
      this.props.theme && !this.props.theme!.isInverted ? (
        <ErrorBadgeIcon className={this._classNames.errorIconLightTheme} />
      ) : (
        <StatusErrorFullIcon className={this._classNames.errorIconDarkTheme} />
      )
    ) : this.props.theme && !this.props.theme!.isInverted ? (
      <ErrorIcon className={this._classNames.errorIconLightTheme} />
    ) : (
      <ErrorIcon className={this._classNames.errorIconDarkTheme} />
    );
  }

  private _displayErrorMessage() {
    return this.props.hasEmptyState && this.props.customEmptyMsg ? (
      <div className={this._classNames.dataLoadErrorText}>{this.props.customEmptyMsg}</div>
    ) : this.state.hasError && this.props.customErrorMsg ? (
      <div className={this._classNames.dataLoadErrorText}>{this.props.customErrorMsg}</div>
    ) : (
      <>
        <div className={this._classNames.dataLoadErrorText}>{"Couldn't load data"}</div>
        <div className={this._classNames.dataLoadErrorSubText}>
          {this.props.customErrorMsg ? this.props.customErrorMsg : this._defaultErrorMsg}
        </div>
      </>
    );
  }

  private _getAriaLabel() {
    return this.props.hasEmptyState && this.props.customEmptyMsg
      ? this.props.customEmptyMsg
      : this.state.hasError && this.props.customErrorMsg
      ? this.props.customErrorMsg
      : this.state.errorMsg
      ? this.state.errorMsg
      : this._defaultErrorMsg;
  }
}
