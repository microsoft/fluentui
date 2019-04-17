import * as React from 'react';

import { classNamesFunction, BaseComponent, KeyCodes } from '../../../Utilities';
import { IPlainCardProps, IPlainCardStyles, IPlainCardStyleProps } from './PlainCard.types';
import { CardCallout } from '../CardCallout/CardCallout';

const getClassNames = classNamesFunction<IPlainCardStyleProps, IPlainCardStyles>();

export class PlainCardBase extends BaseComponent<IPlainCardProps, {}> {
  private _classNames: { [key in keyof IPlainCardStyles]: string };

  public render(): JSX.Element {
    const { styles, theme, className } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className
    });

    const content: JSX.Element = (
      <div onMouseEnter={this.props.onEnter} onMouseLeave={this.props.onLeave} onKeyDown={this._onKeyDown}>
        {this.props.onRenderPlainCard!(this.props.renderData)}
      </div>
    );

    return <CardCallout {...this.props} content={content} className={this._classNames.root} />;
  }

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.escape) {
      this.props.onLeave && this.props.onLeave(ev);
    }
  };
}
