import * as React from 'react';
import { IComponentStatusProps, TestCoverageStatus } from './ComponentStatus.Props';
import './ComponentStatus.scss';

export class ComponentStatus extends React.Component<IComponentStatusProps, {}> {

  public static defaultProps: IComponentStatusProps = {
    keyboardAccessibilitySupport: false,
    markupSupport: false,
    highContrastSupport: false,
    rtlSupport: false,
    testCoverage: TestCoverageStatus.none
  };

  public render(): JSX.Element {
    const keyboardAccessibilitySubject = 'Keyboard Accessibility';
    const markupSubject = 'Markup';
    const highContrastSupportSubject = 'High Contrast';
    const rtlSubject = 'Right to Left';
    const testCoverageSubject = 'Test Coverage';

    return (
      <div className='ComponentStatus-div'>
        { this._badgeAnchorForDual(keyboardAccessibilitySubject, !!this.props.keyboardAccessibilitySupport) }
        { this._badgeAnchorForDual(markupSubject, !!this.props.markupSupport) }
        { this._badgeAnchorForDual(highContrastSupportSubject, !!this.props.highContrastSupport) }
        { this._badgeAnchorForDual(rtlSubject, !!this.props.rtlSupport) }
        { this._badgeAnchorForTestCoverage(testCoverageSubject) }
      </div >
    );
  }

  private _badgeAnchorForDual(subject: string, isSupported: boolean): JSX.Element {
    isSupported = isSupported ? isSupported : false;
    const ariaLabel = subject + '. ' + this._badgeStatusString(isSupported);
    const color = this._colorForDualStatusBadge(isSupported);
    const status = this._badgeStatusString(isSupported);

    return this._badgeAnchor(ariaLabel, color, subject, status);
  }

  private _badgeAnchorForTestCoverage(subject: string): JSX.Element {
    const ariaLabel = subject + '. ' + this.props.testCoverage;
    const color = this._colorForTestCoverageStatus(this.props.testCoverage);
    const coverageStatus = this.props.testCoverage ? this.props.testCoverage : TestCoverageStatus.none;

    return this._badgeAnchor(ariaLabel, color, subject, coverageStatus);
  }

  private _badgeAnchor(ariaLabel: string, color: string, subject: string, status: string): JSX.Element {
    return (
      <a
        aria-label={ ariaLabel }
        href='#/components-status'
        className='ComponentStatus-badge'
      >
        <img
          src={ this._badgeURL(color, subject, status) }
        />
      </a>
    );
  }

  private _badgeURL(color: string, subject: String, status: String): string {
    const badgeBaseURL = 'https://img.shields.io/badge/';
    const badgeStyle = 'flat';
    return badgeBaseURL + subject + '-' + status + '-' + color + '.svg' + '?style=' + badgeStyle;
  }

  // Status
  private _badgeStatusString(isSupported: boolean | undefined): string {
    return isSupported ? 'Pass' : 'Fail';
  }

  // Colors
  private _colorForDualStatusBadge(isSupported: boolean | undefined): string {
    return isSupported ? 'brightgreen' : 'red';
  }

  private _colorForTestCoverageStatus(testCoverageStatus: TestCoverageStatus | undefined): string {
    switch (testCoverageStatus) {
      case TestCoverageStatus.none:
        return 'red';
      case TestCoverageStatus.poor:
        return 'yellow';
      case TestCoverageStatus.fair:
        return 'yellowgreen';
      case TestCoverageStatus.good:
        return 'brightgreen';
    }

    return 'red';
  }

}