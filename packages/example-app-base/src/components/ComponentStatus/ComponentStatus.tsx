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
        { this._badgeAnchor('Keyboard accessibility support. ' +
          this._badgeStatusString(this.props.keyboardAccessibilitySupport), this._badgeURL(
            this._colorForDualStatusBadge(this.props.keyboardAccessibilitySupport),
            keyboardAccessibilitySubject,
            this._badgeStatusString(this.props.keyboardAccessibilitySupport))) }
        { this._badgeAnchor('Markup support. ' + this._badgeStatusString(this.props.markupSupport), this._badgeURL(
          this._colorForDualStatusBadge(this.props.markupSupport),
          markupSubject,
          this._badgeStatusString(this.props.markupSupport))) }
        { this._badgeAnchor('High contrast support. ' + this._badgeStatusString(this.props.highContrastSupport), this._badgeURL(
          this._colorForDualStatusBadge(this.props.highContrastSupport),
          highContrastSupportSubject,
          this._badgeStatusString(this.props.highContrastSupport))) }
        { this._badgeAnchor('Right to left support. ' + this._badgeStatusString(this.props.rtlSupport), this._badgeURL(
          this._colorForDualStatusBadge(this.props.rtlSupport),
          rtlSubject,
          this._badgeStatusString(this.props.rtlSupport))) }
        { this._badgeAnchor('Test coverage. ' + this.props.testCoverage, this._badgeURL(
          this._colorForTestCoverageStatus(this.props.testCoverage),
          testCoverageSubject,
          this.props.testCoverage ? this.props.testCoverage : TestCoverageStatus.none)) }
      </div >
    );
  }

  private _badgeAnchor(ariaLabel: string, imgSrc: string): JSX.Element {
    return (
      <a
        aria-label={ ariaLabel }
        href='#/components-status'
        className='ComponentStatus-badge'
      >
        <img
          src={ imgSrc }
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
    return isSupported ? 'green' : 'red';
  }

  private _colorForTestCoverageStatus(testCoverageStatus: TestCoverageStatus | undefined): string {
    switch (testCoverageStatus) {
      case TestCoverageStatus.none:
        return 'red';
      case TestCoverageStatus.poor:
        return 'orange';
      case TestCoverageStatus.fair:
        return 'yellowgreen';
      case TestCoverageStatus.good:
        return 'green';
    }

    return 'red';
  }

}