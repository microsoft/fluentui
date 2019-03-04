import * as React from 'react';
import { DelayedRender, classNamesFunction, getNativeProps, divProperties } from '../../Utilities';
import { IProcessedStyleSet } from '../../Styling';
import { IAnnouncedProps, IAnnouncedStyles } from './Announced.types';

const getClassNames = classNamesFunction<{}, IAnnouncedStyles>();

export class AnnouncedBase extends React.Component<IAnnouncedProps> {
  public static defaultProps: Partial<IAnnouncedProps> = {
    'aria-live': 'assertive'
  };

  private _classNames: IProcessedStyleSet<IAnnouncedStyles>;

  public render(): JSX.Element {
    const { message, styles } = this.props;

    this._classNames = getClassNames(styles);

    return (
      <div role="status" {...getNativeProps(this.props, divProperties)}>
        <DelayedRender>
          <div className={this._classNames.screenReaderText}>{message}</div>
        </DelayedRender>
      </div>
    );
  }
}
