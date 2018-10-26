import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
import { OverflowSet, IOverflowSetItemProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { IAction, IActionBarProps, IActionBarStyles, IActionOverflowData, IActionItem } from './ActionBar.types';
import { getStyles, overflowButtonStyles } from './ActionBar.styles';
import { getCustomActionBarButtonStyles } from './ActionBarButton.styles';

export class ActionBar extends React.Component<IActionBarProps, {}> {
  public render(): JSX.Element {
    const dataToRender = this._generateData();
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

  private _generateData(): IActionOverflowData {
    const dataItems: IAction[] = [];
    this.props.actions.map((action: IAction, index: number) => {
      const actionItem: IActionItem = {
        title: action.title,
        action: action.action,
        primary: action.primary,
        key: index
      };
      dataItems.push(actionItem);
    });

    const result: IActionOverflowData = {
      primary: dataItems,
      overflow: []
    };

    return result;
  }

  private _onRenderData = (data: IOverflowSetItemProps): JSX.Element => {
    return (
      <OverflowSet
        items={data.primary}
        overflowItems={data.overflow}
        onRenderItem={this._renderButton}
        onRenderOverflowButton={this._renderOverflowItems}
      />
    );
  };

  private _onReduceData = (currentdata: IOverflowSetItemProps): {} | void => {
    if (currentdata.primary.length === 0) {
      return;
    }

    const overflow = [...currentdata.primary.slice(-1), ...currentdata.overflow];
    const primary = currentdata.primary.slice(0, -1);

    return { primary, overflow };
  };

  private _onGrowData = (currentdata: IOverflowSetItemProps): {} | void => {
    if (currentdata.overflow.length === 0) {
      return;
    }

    const overflow = currentdata.overflow.slice(1);
    const primary = [...currentdata.primary, ...currentdata.overflow.slice(0, 1)];

    return { primary, overflow };
  };

  private _onClick = (): void => {
    return;
  };

  private _renderOverflowItems = (overflowItems: IAction[]) => {
    const items: IContextualMenuItem[] = [];
    overflowItems.forEach((action: IAction, i: number) => {
      items.push({ key: i.toString(), name: action.title, onClick: action.action });
    });
    return <DefaultButton menuProps={{ items: items! }} onClick={this._onClick} styles={overflowButtonStyles} />;
  };

  private _renderButton = (action: IOverflowSetItemProps) => {
    const customStyles = getCustomActionBarButtonStyles();
    return (
      <DefaultButton ariaLabel={action.title} primary={action.primary} text={action.title} onClick={action.action} styles={customStyles} />
    );
  };
}
