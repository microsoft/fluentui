import * as React from 'react';
import { BaseComponent, DelayedRender, classNamesFunction } from '../../Utilities';
import { IProcessedStyleSet } from '../../Styling';
import { IAnnouncedProps, IAnnouncedStyles } from './Announced.types';

const getClassNames = classNamesFunction<{}, IAnnouncedStyles>();

export class AnnouncedBase extends BaseComponent<IAnnouncedProps, {}> {
  public static defaultProps: Partial<IAnnouncedProps> = {
    ariaLive: 'assertive'
  };

  private _classNames: IProcessedStyleSet<IAnnouncedStyles>;

  public render(): JSX.Element {
    const { message, styles, id, ariaLive } = this.props;

    this._classNames = getClassNames(styles);

    return (
      <div role="status" aria-live={ariaLive} id={id}>
        <DelayedRender>
          <div className={this._classNames.screenReaderText}>{message}</div>
        </DelayedRender>
      </div>
    );
  }
}
