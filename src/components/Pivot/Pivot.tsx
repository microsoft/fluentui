import * as React from 'react';
import { PivotHeader } from './PivotHeader';
import { IPivotItem, IPivotProps, PivotLinkFormat, PivotLinkSize } from './Pivot.Props';
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
      onRenderPivotTitle,
      linkSize,
      linkFormat,
      items,
      className
    } = this.props;
    let { selectedIndex } = this.state;
    let selected = items[Math.min(items.length - 1, Math.max(0, selectedIndex))];

    return (
      <div className={ css('ms-Pivot', className) }>
        <PivotHeader
          pivotId={ this._id }
          items={ items }
          linkFormat={ linkFormat }
          linkSize={ linkSize }
          selected={ selected }
          onRenderPivotTitle={ onRenderPivotTitle }
          onSelectTab={ this.setSelected }
          />

        { selected && (
          selected.children
        ) }

      </div >
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

}
