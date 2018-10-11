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
  TComponent,
  TProps extends ICardProps<TComponent, TStyles, TStyleProps>,
  TStyles extends ICardStyles,
  TStyleProps extends ICardStyleProps,
  TState
> extends BaseComponent<TProps, TState> {
  // Common default props across all hover card types.
  public static defaultProps = {
    directionalHint: DirectionalHint.bottomLeftEdge,
    gapSpace: 0
  };

  protected _finalHeight: number;
  protected _content: JSX.Element;
  protected _classNames: { [key in keyof TStyles]: string };
  protected _directionalHintFixed: boolean;

  public render(): JSX.Element {
    const {
      targetElement,
      directionalHintFixed = this._directionalHintFixed,
      directionalHint,
      firstFocus,
      trapFocus,
      gapSpace,
      onLeave
    } = this.props;

    this.setStyles();

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
            {this.renderContent()}
          </FocusTrapZone>
        ) : (
          this.renderContent()
        )}
      </Callout>
    );
  }

  /**
   * Method that returns the content of the HoverCard
   */
  protected abstract renderContent(): JSX.Element;

  /**
   * Method that sets the styles for a specific card.
   */
  protected abstract setStyles(): void;

  protected onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.escape) {
      this.props.onLeave && this.props.onLeave(ev);
    }
  };
}
