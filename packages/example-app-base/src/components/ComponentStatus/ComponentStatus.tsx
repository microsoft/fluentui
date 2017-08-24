import * as React from 'react';
import { IComponentStatusProps, TestCoverageStatus } from './ComponentStatus.Props';
import './ComponentStatus.scss';

export class ComponentStatus extends React.Component<IComponentStatusProps, {}> {

  public static defaultProps: IComponentStatusProps = {
    keyboardAccessibilitySupport: false,
    highContrastSupport: false,
    rtlSupport: false,
    testCoverage: TestCoverageStatus.none
  };

  constructor(props: IComponentStatusProps) {
    super(props);
  }

  public render() {
    const statusSubject = 'Status';
    const keyboardAccessibilitySubject = 'Keyboard Accessibility';
    const highContrastSupportSubject = 'High Contrast';
    const rtlSubject = 'Right to Left';
    const testCoverageSubject = 'Test Coverage';

    return (
      <div>
        <a href='https://www.google.com' className='ComponentStatus-badge'><img src={ this._badgeURL(this._colorForKeyboardAccessibility(this.props.keyboardAccessibilitySupport), keyboardAccessibilitySubject, this._badgeStatusForKeyboardAccessibility(this.props.keyboardAccessibilitySupport)) } /></a>
        <a href='https://www.google.com' className='ComponentStatus-badge'><img src={ this._badgeURL(this._colorForHighContrast(this.props.highContrastSupport), highContrastSupportSubject, this._badgeStatusForHighContrast(this.props.highContrastSupport)) } /></a>
        <a href='https://www.google.com' className='ComponentStatus-badge'><img src={ this._badgeURL(this._colorForRTL(this.props.rtlSupport), rtlSubject, this._badgeStatusForRTL(this.props.rtlSupport)) } /></a>
        <a href='https://www.google.com' className='ComponentStatus-badge'><img src={ this._badgeURL(this._colorForTestCoverageStatus(this.props.testCoverage), testCoverageSubject, this.props.testCoverage ? this.props.testCoverage : TestCoverageStatus.none) } /></a>
      </div>
    );
  }

  private _badgeURL(color: string, subject: String, status: String): string {
    const badgeBaseURL = 'https://img.shields.io/badge/';
    const badgeStyle = 'flat';
    const badgeValidColor = 'brightgreen';
    const badgeInvalidColor = 'red';

    return badgeBaseURL + subject + '-' + status + '-' + color + '.svg' + '?style=' + badgeStyle;
  }

  // Status

  private _badgeStatusForKeyboardAccessibility(keyboardAccessibilitySupport: boolean | undefined): string {
    return keyboardAccessibilitySupport ? 'Pass' : 'Fail';
  }

  private _badgeStatusForHighContrast(highContrastSupport: boolean | undefined): string {
    return highContrastSupport ? 'Pass' : 'Fail';
  }

  private _badgeStatusForRTL(rtlSupport: boolean | undefined): string {
    return rtlSupport ? 'Pass' : 'Fail';
  }

  // Colors

  private _colorForKeyboardAccessibility(keyboardAccessibilitySupport: boolean | undefined): string {
    return keyboardAccessibilitySupport ? 'green' : 'red';
  }

  private _colorForHighContrast(highContrastSupport: boolean | undefined): string {
    return highContrastSupport ? 'green' : 'red';
  }

  private _colorForRTL(rtlSupport: boolean | undefined): string {
    return rtlSupport ? 'green' : 'red';
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