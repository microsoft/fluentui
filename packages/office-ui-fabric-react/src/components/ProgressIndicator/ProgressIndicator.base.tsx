import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
} from '../../Utilities';
import {
  IProgressIndicatorProps,
  IProgressIndicatorStyleProps,
  IProgressIndicatorStyles,
} from './ProgressIndicator.types';

const getClassNames = classNamesFunction<IProgressIndicatorStyleProps, IProgressIndicatorStyles>();

// if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios
const ZERO_THRESHOLD = 0.01;

/**
* ProgressIndicator with no default styles.
* [Use the `getStyles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Styling)
*/
@customizable('ProgressIndicator', ['theme'])
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
    const {
      ariaValueText,
      barHeight = 2,
      className,
      description,
      getStyles,
      theme,
      title,
    } = this.props;

    let { label, percentComplete } = this.props;

    const classNames = getClassNames(getStyles, {
      theme: theme!,
      className,
      barHeight,
      smoothTransition: (percentComplete && percentComplete > ZERO_THRESHOLD) ? true : false,
      indeterminate: !percentComplete ? true : false,
    });

    // Handle deprecated value.
    if (title) {
      label = title;
    }

    if (this.props.percentComplete !== undefined) {
      percentComplete = Math.min(100, Math.max(0, percentComplete! * 100));
    }

    return (
      <div className={ classNames.root }>
        <div className={ classNames.itemName }>{ label }</div>
        <div className={ classNames.itemProgress }>
          <div className={ classNames.progressTrack } />
          <div
            className={ classNames.progressBar }
            style={ percentComplete !== undefined ? { width: percentComplete + '%' } : undefined }
            role='progressbar'
            aria-valuemin={ 0 }
            aria-valuemax={ 100 }
            aria-valuenow={ percentComplete }
            aria-valuetext={ ariaValueText }
          />
        </div>
        <div className={ classNames.itemDescription }>{ description }</div>
      </div>
    );
  }
}
