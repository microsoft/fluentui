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

  public render(): JSX.Element {
    const keyboardAccessibilitySubject = 'Keyboard Accessibility';
    const highContrastSupportSubject = 'High Contrast';
    const rtlSubject = 'Right to Left';
    const testCoverageSubject = 'Test Coverage';

    return (
      <div className='ComponentStatus-div'>
        <a
          href='https://www.google.com'
          className='ComponentStatus-badge'
        >
          <img
            src={ this._badgeURL(
              this._colorForDualStatusBadge(this.props.keyboardAccessibilitySupport),
              keyboardAccessibilitySubject,
              this._badgeStatusString(this.props.keyboardAccessibilitySupport))
            }
          />
        </a>
        <a
          href='https://www.google.com'
          className='ComponentStatus-badge'
        >
          <img
            src={ this._badgeURL(
              this._colorForDualStatusBadge(this.props.highContrastSupport),
              highContrastSupportSubject,
              this._badgeStatusString(this.props.highContrastSupport))
            }
          />
        </a>
        <a
          href='https://www.google.com'
          className='ComponentStatus-badge'
        >
          <img
            src={ this._badgeURL(
              this._colorForDualStatusBadge(this.props.rtlSupport),
              rtlSubject,
              this._badgeStatusString(this.props.rtlSupport))
            }
          />
        </a>
        <a
          href='https://www.google.com'
          className='ComponentStatus-badge'
        >
          <img
            src={ this._badgeURL(
              this._colorForTestCoverageStatus(this.props.testCoverage),
              testCoverageSubject,
              this.props.testCoverage ? this.props.testCoverage : TestCoverageStatus.none)
            }
          />
        </a>
      </div>
    );
  }

  private _badgeURL(color: string, subject: String, status: String): string {
    const badgeBaseURL = 'https://img.shields.io/badge/';
    const badgeStyle = 'flat';
    // const badgeValidColor = 'brightgreen';
    // const badgeInvalidColor = 'red';

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