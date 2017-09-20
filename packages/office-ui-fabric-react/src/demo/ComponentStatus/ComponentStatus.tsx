import * as React from 'react';
import { IComponentStatusProps, ChecklistStatus } from './ComponentStatus.Props';
import './ComponentStatus.scss';

export class ComponentStatus extends React.Component<IComponentStatusProps, {}> {

  public static defaultProps: IComponentStatusProps = {
    keyboardAccessibilitySupport: ChecklistStatus.fail,
    markupSupport: ChecklistStatus.fail,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.fail,
    testCoverage: ChecklistStatus.none
  };

  public render(): JSX.Element {
    const keyboardAccessibilitySubject = 'Keyboard Accessibility';
    const markupSubject = 'Markup';
    const highContrastSupportSubject = 'High Contrast';
    const rtlSubject = 'Right to Left';
    const testCoverageSubject = 'Test Coverage';

    return (
      <div className='ComponentStatus-div'>
        { this._definebadgeAnchor(keyboardAccessibilitySubject, this.props.keyboardAccessibilitySupport) }
        { this._definebadgeAnchor(markupSubject, this.props.markupSupport) }
        { this._definebadgeAnchor(highContrastSupportSubject, this.props.highContrastSupport) }
        { this._definebadgeAnchor(rtlSubject, this.props.rtlSupport) }
        { this._definebadgeAnchor(testCoverageSubject, this.props.testCoverage) }
      </div >
    );
  }

  private _definebadgeAnchor(subject: string, state: ChecklistStatus): JSX.Element {
    const ariaLabel = subject + '. ' + state;
    const color = this._colorForComponentStateStatus(state);
    return this._badgeAnchor(ariaLabel, color, subject, state);
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

  private _colorForComponentStateStatus(testCoverageStatus: ChecklistStatus | undefined): string {
    switch (testCoverageStatus) {
      case ChecklistStatus.unknown:
        return 'lightgrey';
      case ChecklistStatus.fail:
      case ChecklistStatus.none:
        return 'red';
      case ChecklistStatus.poor:
        return 'yellow';
      case ChecklistStatus.fair:
        return 'yellowgreen';
      case ChecklistStatus.pass:
      case ChecklistStatus.good:
        return 'brightgreen';
    }

    return 'red';
  }

}