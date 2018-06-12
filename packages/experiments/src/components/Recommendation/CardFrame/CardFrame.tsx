import * as React from 'react';
import { ICardFrameProps, ICardFrameStyles } from './CardFrame.types';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { getStyles } from './CardFrame.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';

export class CardFrame extends React.Component<ICardFrameProps, {}> {
  constructor(props: ICardFrameProps) {
    super(props);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<ICardFrameProps, ICardFrameStyles>();
    const { fontFamily, fontSize, cardTitle, seperatorColor, titleTextColor } = this.props;
    const classNames = getClassNames(getStyles, { cardTitle, fontFamily, fontSize, seperatorColor, titleTextColor });
    /* tslint:disable:no-any */
    const overflowItems: any[] | undefined = this.props.cardDropDownOptions;
    return (
      <div className={classNames.root}>
        <div className={classNames.cardTitleBox}>
          <div className={classNames.cardTitleEllipsisButton}>
            <OverflowSet
              overflowItems={overflowItems}
              onRenderOverflowButton={this._onRenderOverflowButton}
              onRenderItem={this._onRenderItem}
            />
          </div>
          <div className={classNames.cardTitle}>{cardTitle}</div>
        </div>
        <hr className={classNames.seperator} />
        <div className={classNames.layout}>{this.props.children}</div>
      </div>
    );
  }

  private _onRenderItem(item: IOverflowSetItemProps): JSX.Element {
    return (
      <IconButton
        menuIconProps={{ iconName: item.icon }}
        onClick={item.onClick}
        title={item.title}
        ariaLabel={item.ariaLabel}
      />
    );
  }

  /* tslint:disable:no-any */
  private _onRenderOverflowButton(overflowItems: any[] | undefined): JSX.Element {
    return (
      <IconButton
        menuIconProps={{ iconName: 'More' }}
        menuProps={{ items: overflowItems! }}
        ariaLabel="Card options"
        title="Card options"
      />
    );
  }
}
