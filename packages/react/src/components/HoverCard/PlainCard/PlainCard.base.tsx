import * as React from 'react';

import { classNamesFunction, initializeComponentRef, KeyCodes } from '../../../Utilities';
import { CardCallout } from '../CardCallout/CardCallout';
import type { IPlainCardProps, IPlainCardStyles, IPlainCardStyleProps } from './PlainCard.types';

const getClassNames = classNamesFunction<IPlainCardStyleProps, IPlainCardStyles>();

export class PlainCardBase extends React.Component<IPlainCardProps, {}> {
  private _classNames: { [key in keyof IPlainCardStyles]: string };

  constructor(props: IPlainCardProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render(): JSX.Element {
    const { styles, theme, className } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
    });

    const content: JSX.Element = (
      <div onMouseEnter={this.props.onEnter} onMouseLeave={this.props.onLeave} onKeyDown={this._onKeyDown}>
        {this.props.onRenderPlainCard!(this.props.renderData)}
      </div>
    );

    return <CardCallout {...this.props} content={content} className={this._classNames.root} />;
  }

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    // eslint-disable-next-line deprecation/deprecation
    if (ev.which === KeyCodes.escape) {
      this.props.onLeave && this.props.onLeave(ev);
    }
  };
}
