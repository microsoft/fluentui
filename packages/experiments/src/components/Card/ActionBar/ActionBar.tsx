import * as React from 'react';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
import { OverflowSet, IOverflowSetItemProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { IAction, IActionBarProps, IActionBarStyles, IActionOverflowData } from './ActionBar.types';
import { getStyles } from './ActionBar.styles';
import { getCustomActionBarButtonStyles } from './ActionBarButton.styles';

export default class ActionBar extends React.Component<IActionBarProps, {}> {
  index: number = 0;
  render(): JSX.Element {
    const dataToRender = this.generateData();
    const getClassNames = classNamesFunction<IActionBarProps, IActionBarStyles>();
    const classNames = getClassNames(getStyles!);
    return (
      <div className={classNames.root}>
        <ResizeGroup
          data={dataToRender}
          onReduceData={this._onReduceData}
          onRenderData={this._onRenderData}
          onGrowData={this._onGrowData}
        />
      </div>
    );
  }

  private generateData(): IActionOverflowData {
    var dataItems = new Array();
    this.props.actions.map((action: IAction, index) => {
      dataItems.push(action);
    });

    let result: IActionOverflowData = {
      primary: dataItems,
      overflow: []
    };

    return result;
  }

  private _onRenderData = (data: any): any => {
    return (
      <OverflowSet
        key={this.index++}
        items={data.primary}
        overflowItems={data.overflow.length ? data.overflow : null}
        onRenderItem={this._renderButton}
        onRenderOverflowButton={this._renderOverflowItems}
      />
    );
  };

  private _onReduceData = (currentdata: any): any => {
    if (currentdata.primary.length === 0) {
      return;
    }

    const overflow = [...currentdata.primary.slice(-1), ...currentdata.overflow];
    const primary = currentdata.primary.slice(0, -1);

    return { primary, overflow };
  };

  private _onGrowData = (currentdata: any): any => {
    if (currentdata.overflow.length === 0) {
      return;
    }

    const overflow = currentdata.overflow.slice(1);
    const primary = [...currentdata.primary, ...currentdata.overflow.slice(0, 1)];

    return { primary, overflow };
  };

  private _renderOverflowItems = (overflowItems: any[]) => {
    var items = new Array();

    overflowItems.map((action: IAction, i: number) => {
      items.push({ key: i, name: action.title, onClick: action.action });
    });
    return <IconButton split={true} menuProps={{ items: items! }} />;
  };

  private _renderButton = (action: IOverflowSetItemProps) => {
    const customStyles = getCustomActionBarButtonStyles();
    return (
      <DefaultButton
        key={this.index++}
        ariaLabel={action.title}
        primary={action.primary}
        text={action.title}
        onClick={action.action}
        styles={customStyles}
      />
    );
  };
}
