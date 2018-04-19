import * as React from 'react';
import {
  BaseComponent,
  css
} from '../../Utilities';
import { IProgressIndicatorProps } from './ProgressIndicator.types';
import * as stylesImport from './ProgressIndicator.scss';
const styles: any = stylesImport;

// if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios
const ZERO_THRESHOLD = 0.01;

export class ProgressIndicatorBase extends BaseComponent<IProgressIndicatorProps, {}> {
  public static defaultProps = {
    label: '',
    description: '',
    width: 180
  };

  constructor(props: IProgressIndicatorProps) {
    super(props);

    this._warnDeprecations({
      title: 'label'
    });

  }

  public render() {
    const { title, description, className, ariaValueText } = this.props;
    let { label, percentComplete } = this.props;

    // Handle deprecated value.
    if (title) {
      label = title;
    }

    if (this.props.percentComplete !== undefined) {
      percentComplete = Math.min(100, Math.max(0, percentComplete! * 100));
    }

    return (
      <div className={ css('ms-ProgressIndicator', styles.root, className) }>
        <div className={ css('ms-ProgressIndicator-itemName', styles.itemName) }>{ label }</div>
        <div className={ css('ms-ProgressIndicator-itemProgress', styles.itemProgress) }>
          <div className={ css('ms-ProgressIndicator-progressTrack', styles.progressTrack) } />
          <div
            className={ css(
              'ms-ProgressIndicator-progressBar',
              styles.progressBar,
              percentComplete && percentComplete > ZERO_THRESHOLD && 'smoothTransition',
              percentComplete === undefined && styles.indeterminate
            ) }
            style={ percentComplete !== undefined ? { width: percentComplete + '%' } : undefined }
            role='progressbar'
            aria-valuemin={ 0 }
            aria-valuemax={ 100 }
            aria-valuenow={ percentComplete }
            aria-valuetext={ ariaValueText }
          />
        </div>
        <div className={ css('ms-ProgressIndicator-itemDescription', styles.itemDescription) }>{ description }</div>
      </div>
    );
  }
}
