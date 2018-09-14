import * as React from 'react';

import { BaseComponent, getNativeProps, divProperties, KeyCodes, createRef } from '../../Utilities';
import { Callout, ICallout } from '../../Callout';
// import { DirectionalHint } from '../../common/DirectionalHint';
import { FocusTrapZone } from '../../FocusTrapZone';
import { IBaseCardProps, IBaseCardStyles } from './BaseCard.types';

export abstract class BaseCard<
  TCard,
  TCardProps extends IBaseCardProps<TCard>,
  TCardStyles extends IBaseCardStyles,
  TCardState extends {}
> extends BaseComponent<TCardProps, TCardState> {
  // tslint:disable-next-line:no-unused-variable
  protected _callout = createRef<ICallout>();

  protected _finalHeight: number;
  protected _content: JSX.Element;
  protected _classNames: { [key in keyof TCardStyles]: string };

  constructor(props: TCardProps) {
    super(props);
  }

  public renderCard(): JSX.Element {
    const { targetElement, directionalHintFixed, directionalHint, firstFocus, trapFocus, gapSpace, onLeave } = this.props;
    console.log(gapSpace);
    return (
      <Callout
        {...getNativeProps(this.props, divProperties)}
        componentRef={this._callout}
        className={this._classNames.root}
        target={targetElement}
        isBeakVisible={false}
        directionalHint={directionalHint}
        directionalHintFixed={directionalHintFixed}
        finalHeight={this._finalHeight}
        minPagePadding={24}
        onDismiss={onLeave}
        gapSpace={gapSpace}
      >
        {trapFocus ? (
          <FocusTrapZone forceFocusInsideTrap={false} isClickableOutsideFocusTrap={true} disableFirstFocus={!firstFocus}>
            {this._content}
          </FocusTrapZone>
        ) : (
          this._content
        )}
      </Callout>
    );
  }

  public onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.escape) {
      this.props.onLeave && this.props.onLeave(ev);
    }
  };
}
