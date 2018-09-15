import * as React from 'react';

import { BaseComponent, divProperties, getNativeProps, KeyCodes } from '../../Utilities';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { FocusTrapZone } from '../../FocusTrapZone';
import { ICardProps, ICardStyles, ICardStyleProps } from './Card.types';

/**
 * Basic class for all types of hover cards providing the callout in which to render the content.
 */
export abstract class Card<
  T,
  TProps extends ICardProps<T, TStyles, TStyleProps>,
  TStyles extends ICardStyles,
  TStyleProps extends ICardStyleProps,
  TState
> extends BaseComponent<TProps, TState> {
  // Common default props across all hover card types.
  public static defaultProps = {
    directionalHint: DirectionalHint.bottomLeftEdge,
    directionalHintFixed: true,
    gapSpace: 0
  };

  protected _finalHeight: number;
  protected _content: JSX.Element;
  protected _classNames: { [key in keyof TStyles]: string };

  constructor(props: TProps) {
    super(props);
  }

  // Method to be called as a return in the render of each type of the hover card.
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
