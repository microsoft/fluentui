import * as React from 'react';
import { IProcessedStyleSet, mergeStyles } from '../../Styling';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { ISeparatorProps, ISeparatorStyles, ISeparatorStyleProps } from './Separator.types';

const getClassNames = classNamesFunction<ISeparatorStyleProps, ISeparatorStyles>();

export class SeparatorBase extends BaseComponent<ISeparatorProps, {}> {
  private _classNames: IProcessedStyleSet<ISeparatorStyles>;

  constructor(props: ISeparatorProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { text, styles, theme, className, vertical, alignText } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className
    });

    return vertical ? (
      <div className={mergeStyles(this._classNames.isVertical, alignText ? this._classNames[alignText] : null)}>
        <div className={this._classNames.text} role="heading">
          {text}
        </div>
      </div>
    ) : (
      <div className={mergeStyles(this._classNames.root, alignText ? this._classNames[alignText] : null)}>
        <div className={this._classNames.text} role="heading">
          {text}
        </div>
      </div>
    );
  }
}
