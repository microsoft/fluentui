import * as React from 'react';
import { PrimaryButton, DefaultButton, FocusZone } from 'office-ui-fabric-react';

export class FocusZoneRemovalExample extends React.Component {
  public state = this._getDefaultState();

  public render() {
    const { items } = this.state;
    return (
      <div>
        <DefaultButton text="I am a button outside FocusZone" />
        <FocusZone>
          {items.map(item => (
            <PrimaryButton {...item} />
          ))}
        </FocusZone>
        <DefaultButton text="I am a button outside FocusZone" />
      </div>
    );
  }

  private _getDefaultState() {
    const items = [];

    for (let i = 0; i < 5; i++) {
      const index = i;
      items.push({
        key: index,
        text: `Item ${index}`,
        'data-key': index,
        onClick: () => {
          console.log(`Removing ${index}`);
          this._removeItem(index);
        }
      });
    }

    return { items };
  }

  private _removeItem = (key: number): void => {
    const index = this.state.items.findIndex(item => item.key === key);
    const items = [...this.state.items];

    items.splice(index, 2);
    console.log(items);
    if (items.length === 0) {
      setTimeout(() => {
        this.setState(this._getDefaultState());
      }, 2000);
    }
    this.setState({ items });
  };
}
