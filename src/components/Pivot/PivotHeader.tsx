import * as React from 'react';
import { PivotTab } from './PivotTab';
import { PivotTitle } from './PivotTitle';
import { PivotLinkSize, PivotLinkFormat, IPivotTitleProps, IPivotItem } from './Pivot.Props';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { css } from '../../Utilities';

export interface IPivotHeaderProps {
  pivotId: string;
  linkSize: PivotLinkSize;
  linkFormat: PivotLinkFormat;
  items: IPivotItem[];
  selected: IPivotItem;
  onSelectTab: (item: IPivotItem) => void;
  onRenderPivotTitle?: (props: IPivotTitleProps, defaultRender?: (props?: IPivotTitleProps) => JSX.Element) => JSX.Element;
}

export class PivotHeader<T extends IPivotItem> extends React.Component<IPivotHeaderProps, {}> {
  public render() {
    let {
      items,
      linkFormat,
      linkSize,
      onRenderPivotTitle = this._onRenderPivotTitle,
      onSelectTab,
      pivotId,
      selected
    } = this.props;

    return (
    <FocusZone
      direction={ FocusZoneDirection.horizontal }
      >
      <ul
        className={ css('ms-Pivot-header',
          { 'ms-Pivot--large': linkSize === PivotLinkSize.large },
          { 'ms-Pivot--tabs': linkFormat === PivotLinkFormat.tabs }) }
        role='tablist'>
        { items.map((item, index) => (
          <li
            key={ item.key }
            className={css('ms-Pivot-tab', {
              'is-selected': selected === item
            })}
            >
            <PivotTab
              pivotId={ pivotId }
              item={ item }
              isSelected={ selected === item }
              onSelectTab={ onSelectTab }
              >
            {
              onRenderPivotTitle({
                item,
                index,
                isSelected: selected === item
              }, this._onRenderPivotTitle)
            }
            </PivotTab>
          </li>

        )) }
      </ul>
    </FocusZone>
    );
  }

  private _onRenderPivotTitle(props: IPivotTitleProps, defaultRender?: (props: IPivotTitleProps) => JSX.Element): JSX.Element {
    return (<PivotTitle { ...props } />) as JSX.Element;
  }
}
