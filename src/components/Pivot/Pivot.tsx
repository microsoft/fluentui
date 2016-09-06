import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { PivotTab } from './PivotTab';
import { PivotTitle } from './PivotTitle';
import { IPivotItem, IPivotProps, PivotLinkFormat, PivotLinkSize, IPivotTitleProps } from './Pivot.Props';
import { autobind, css, getId } from '../../Utilities';
import './Pivot.scss';

export interface IPivotState {
  selectedIndex: number;
}

export class Pivot extends React.Component<IPivotProps, IPivotState> {
  public static defaultProps = {
    linkFormat: PivotLinkFormat.links,
    linkSize: PivotLinkSize.normal,
    defaultSelectedIndex: 0
  };

  private _id: string;

  constructor(props: IPivotProps) {
    super(props);

    this.state = {
      selectedIndex: props.defaultSelectedIndex
    };

    this._id = getId('Pivot');
  }

  public render() {
    let {
      onRenderPivotTitle = this._onRenderPivotTitle,
      linkSize,
      linkFormat,
      items,
      className
    } = this.props;
    let { selectedIndex } = this.state;
    let selected = items[Math.min(items.length - 1, Math.max(0, selectedIndex))];

    return (
      <FocusZone
        className={ css('ms-Pivot', className) }
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
              }) }
              >
              <PivotTab
                pivotId={ this._id }
                item={ item }
                isSelected={ selected === item }
                onSelectTab={ this.setSelected }
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

  @autobind
  public setSelected(item: IPivotItem) {
    let { items, onChange } = this.props;
    let selectedIndex = items.indexOf(item);

    if (selectedIndex !== this.state.selectedIndex) {
      this.setState({ selectedIndex });

      if (onChange) {
        onChange(item, selectedIndex);
      }
    }
  }

  private _onRenderPivotTitle(props: IPivotTitleProps, defaultRender?: (props: IPivotTitleProps) => JSX.Element): JSX.Element {
    return (<PivotTitle { ...props } />) as JSX.Element;
  }

}
