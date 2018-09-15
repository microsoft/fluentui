import * as React from 'react';

import { BaseComponent, divProperties, getNativeProps, KeyCodes } from '../../Utilities';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { FocusTrapZone } from '../../FocusTrapZone';
import { ICardProps, ICardStyles, ICardStyleProps } from './Card.types';

export abstract class Card<
  TCard,
  TCardProps extends ICardProps<TCard, TCardStyles, TCardStyleProps>,
  TCardStyles extends ICardStyles,
  TCardStyleProps extends ICardStyleProps,
  TCardState
> extends BaseComponent<TCardProps, TCardState> {
  public static defaultProps = {
    directionalHint: DirectionalHint.bottomLeftEdge,
    directionalHintFixed: true,
    gapSpace: 0
  };

  protected _finalHeight: number;
  protected _content: JSX.Element;
  protected _classNames: { [key in keyof TCardStyles]: string };

  constructor(props: TCardProps) {
    super(props);
  }

  protected renderCard(): JSX.Element {
    const { targetElement, directionalHintFixed, directionalHint, firstFocus, trapFocus, gapSpace, onLeave } = this.props;

    return (
      <Callout
        {...getNativeProps(this.props, divProperties)}
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

  protected onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.escape) {
      this.props.onLeave && this.props.onLeave(ev);
    }
  };
}
