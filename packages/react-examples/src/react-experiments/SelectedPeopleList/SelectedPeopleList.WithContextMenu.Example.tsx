import * as React from 'react';

import { PrimaryButton } from '@fluentui/react/lib/Button';
import { IPersonaProps, IPersona } from '@fluentui/react/lib/Persona';
import { people } from '@fluentui/example-data';
import {
  SelectedPeopleList,
  SelectedPersona,
  ItemWithContextMenu,
  TriggerOnContextMenu,
} from '@fluentui/react-experiments/lib/SelectedItemsList';

export interface IPeopleSelectedItemsListExampleState {
  currentSelectedItems: IPersonaProps[];
}

export class SelectedPeopleListWithContextMenuExample extends React.Component<
  {},
  IPeopleSelectedItemsListExampleState
> {
  /**
   * Build a custom selected item capable of being edited with a dropdown and
   * capable of editing
   */
  private SelectedItem = ItemWithContextMenu<IPersona>({
    menuItems: item => [
      {
        key: 'remove',
        text: 'Remove',
        onClick: () => {
          this._onItemsRemoved([item]);
        },
      },
      {
        key: 'copy',
        text: 'Copy',
        onClick: () => {
          this._copyToClipboard(this._getCopyItemsText([item]));
        },
      },
    ],
    itemComponent: TriggerOnContextMenu(SelectedPersona),
  });

  constructor(props: {}) {
    super(props);

    this.state = {
      currentSelectedItems: [people[40]],
    };
  }

  public render(): JSX.Element {
    return (
      <div className={'ms-BasePicker-text'}>
        Right click any persona to open the context menu
        <br />
        <PrimaryButton text="Add another item" onClick={this._onAddItemButtonClicked} />
        {this._renderExtendedPicker()}
      </div>
    );
  }
  private _renderExtendedPicker(): JSX.Element {
    return (
      <div>
        <SelectedPeopleList
          key={'normal'}
          removeButtonAriaLabel={'Remove'}
          selectedItems={[...this.state.currentSelectedItems]}
          onRenderItem={this.SelectedItem}
          onItemsRemoved={this._onItemsRemoved}
        />
      </div>
    );
  }

  private _onAddItemButtonClicked = (): void => {
    const randomPerson = people[Math.floor(Math.random() * (people.length - 1))];
    this.setState({ currentSelectedItems: [...this.state.currentSelectedItems, randomPerson] });
  };

  private _onItemsRemoved = (items: IPersona[]): void => {
    const currentSelectedItemsCopy = [...this.state.currentSelectedItems];
    items.forEach(item => {
      const indexToRemove = currentSelectedItemsCopy.indexOf(item);
      currentSelectedItemsCopy.splice(indexToRemove, 1);
      this.setState({ currentSelectedItems: [...currentSelectedItemsCopy] });
    });
  };

  private _copyToClipboard = (copyString: string): void => {
    navigator.clipboard.writeText(copyString).then(
      () => {
        /* clipboard successfully set */
      },
      () => {
        /* clipboard write failed */
        throw new Error();
      },
    );
  };

  private _getCopyItemsText(items: IPersonaProps[]): string {
    let copyText = '';
    items.forEach((item: IPersonaProps, index: number) => {
      copyText += item.text;

      if (index < items.length - 1) {
        copyText += ', ';
      }
    });

    return copyText;
  }
}
