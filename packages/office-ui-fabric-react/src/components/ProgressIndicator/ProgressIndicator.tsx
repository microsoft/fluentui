/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  BaseComponent,
  css
} from '../../Utilities';
import { IProgressIndicatorProps } from './ProgressIndicator.Props';
import * as stylesImport from './ProgressIndicator.scss';
const styles: any = stylesImport;

// if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios
const ZERO_THRESHOLD = 0.01;

export class ProgressIndicator extends BaseComponent<IProgressIndicatorProps, {}> {
  public static defaultProps = {
    label: '',
    description: '',
    percentComplete: 0,
    width: 180
  };

  constructor(props: IProgressIndicatorProps) {
    super(props);

    this._warnDeprecations({
      title: 'label'
    });

  }

  public render() {
    let { title, label, description, percentComplete, className, ariaValueText } = this.props;

    // Handle deprecated value.
    if (title) {
      label = title;
    }

    percentComplete = Math.min(100, Math.max(0, percentComplete! * 100));

    return (
      <div className={ css('ms-ProgressIndicator', styles.root, className) }>
        <div className={ css('ms-ProgressIndicator-itemName', styles.itemName) }>{ label }</div>
        <div className={ css('ms-ProgressIndicator-itemProgress', styles.itemProgress) }>
          <div className={ css('ms-ProgressIndicator-progressTrack', styles.progressTrack) }></div>
          <div
            className={ css(
              'ms-ProgressIndicator-progressBar',
              styles.progressBar,
              percentComplete > ZERO_THRESHOLD && 'smoothTransition'
            ) }
            style={ { width: percentComplete + '%' } }
            role='progressbar'
            aria-valuemin='0'
            aria-valuemax='100'
            aria-valuenow={ percentComplete.toFixed().toString() }
            aria-valuetext={ ariaValueText }>
          </div>
        </div>
        <div className={ css('ms-ProgressIndicator-itemDescription', styles.itemDescription) }>{ description }</div>
      </div>
    );
  }
}
