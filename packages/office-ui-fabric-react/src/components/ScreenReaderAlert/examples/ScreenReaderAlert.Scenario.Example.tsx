import * as React from 'react';
import { autobind, getRTLSafeKeyCode, KeyCodes } from '@uifabric/utilities';
import { ScreenReaderAlert, ReadingMode } from 'office-ui-fabric-react/lib/ScreenReaderAlert';
import { PrimaryButton, ButtonType, IconButton } from 'office-ui-fabric-react/lib/Button';
import { List } from 'office-ui-fabric-react/lib/List';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import styles = require('./ScreenReaderAlert.Scenario.scss');

export interface ICardItem {
  name: string;
}

export interface IScreenReaderAlertScenarioExampleState {
  items: ICardItem[];
  alertMessage: string;
  alertIndicator: number;
}

export class ScreenReaderAlertScenarioExample extends React.Component<void, IScreenReaderAlertScenarioExampleState> {
  private _currentMaximumItemIndex: number = 0;

  constructor(props: any) {
    super(props);

    this.state = {
      items: [],
      alertMessage: '',
      alertIndicator: 0
    };
  }

  public render() {
    return (
      <div className={ styles.wrapper }>
        <FocusZone
          direction={ FocusZoneDirection.vertical }
          isInnerZoneKeystroke={ event => event.which === getRTLSafeKeyCode(KeyCodes.right) }
        >
          <List
            items={ this.state.items }
            onRenderCell={ this._onRenderCell }
          />
        </FocusZone>
        <PrimaryButton onClick={ this._handleAddItem }>Add</PrimaryButton>
        <ScreenReaderAlert text={ this.state.alertMessage } indicator={ this.state.alertIndicator } />
        <p>Actions: Add new item or delete an existing item.</p>
        <p>Note: Screen Reader will read the notifications on the changes of the ui for blind people</p>
        {
          this.state.alertMessage &&
          <p>Alert message (usually hidden): <b>{ this.state.alertMessage }</b></p>
        }
      </div>
    );
  }

  @autobind
  private _onRenderCell(item: ICardItem, index: number): JSX.Element {
    return (
      <div className={ styles.card } data-is-focusable={ true }>
        <FocusZone direction={ FocusZoneDirection.horizontal }>
          <p>{ item.name }</p>
          <IconButton
            icon='Cancel'
            onClick={ this._handleDeleteItem.bind(this, index) }
            data-is-focusable={ true }
          />
        </FocusZone>
      </div>
    );
  }

  @autobind
  private _handleAddItem(): void {
    const newItem: ICardItem = {
      name: `Card ${++this._currentMaximumItemIndex}`
    };

    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      alertMessage: `New item ${newItem.name} added to the view, there are ${prevState.items.length + 1} items now`,
      alertIndicator: prevState.alertIndicator + 1
    }));
  }

  @autobind
  private _handleDeleteItem(index: number): void {
    this.setState(prevState => {
      const newItems: ICardItem[] = prevState.items.slice();
      newItems.splice(index, 1);

      return {
        items: newItems,
        alertMessage: `Item ${prevState.items[index].name} at position ${index + 1} is removed from the view`,
        alertIndicator: prevState.alertIndicator + 1
      }
    });
  }
}
