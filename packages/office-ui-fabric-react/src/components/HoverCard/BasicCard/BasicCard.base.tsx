import * as React from 'react';

import { Card } from '../Card';
import { classNamesFunction } from '../../../Utilities';
import { IBasicCardProps, IBasicCardStyles, IBasicCardStyleProps, IBasicCard } from './BasicCard.types';

const getClassNames = classNamesFunction<IBasicCardStyleProps, IBasicCardStyles>();

export class BasicCardBase extends Card<IBasicCard, IBasicCardProps, IBasicCardStyles, IBasicCardStyleProps, {}> {
  constructor(props: IBasicCardProps) {
    super(props);
  }

  protected setStyles(): void {
    const { styles, theme, className } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className
    });
  }

  protected renderContent(): JSX.Element {
    const { className } = this.props;

    return (
      <div onMouseEnter={this.props.onEnter} onMouseLeave={this.props.onLeave} onKeyDown={this.onKeyDown} className={className}>
        {this.props.onRenderBasicCard!(this.props.renderData)}
      </div>
    );
  }
}
