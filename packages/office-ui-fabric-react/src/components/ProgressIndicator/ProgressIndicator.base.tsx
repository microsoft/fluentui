import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
  IClassNames,
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

  private _classNames: IClassNames<IProgressIndicatorStyles>;

  constructor(props: IProgressIndicatorProps) {
    super(props);

    this._warnDeprecations({
      title: 'label'
    });

    this._classNames = getClassNames(this.props.getStyles, {
      theme: this.props.theme!,
      className: this.props.className,
      barHeight: this.props.barHeight,
      indeterminate: this.props.percentComplete === undefined ? true : false,
    });
  }

  public render() {
    const {
      ariaValueText,
      description,
      title,
    } = this.props;

    let { label, percentComplete } = this.props;

    // Handle deprecated value.
    if (title) {
      label = title;
    }

    if (this.props.percentComplete !== undefined) {
      percentComplete = Math.min(100, Math.max(0, percentComplete! * 100));
    }

    const progressBarStyles = {
      width: percentComplete !== undefined ? percentComplete + '%' : undefined,
      transition: (percentComplete !== undefined && percentComplete < ZERO_THRESHOLD) ? 'none' : undefined,
    };

    return (
      <div className={ this._classNames.root }>
        <div className={ this._classNames.itemName }>{ label }</div>
        <div className={ this._classNames.itemProgress }>
          <div className={ this._classNames.progressTrack } />
          <div
            className={ this._classNames.progressBar }
            style={ progressBarStyles }
            role='progressbar'
            aria-valuemin={ 0 }
            aria-valuemax={ 100 }
            aria-valuenow={ Math.floor(percentComplete!) }
            aria-valuetext={ ariaValueText }
          />
        </div>
        <div className={ this._classNames.itemDescription }>{ description }</div>
      </div>
    );
  }
}
