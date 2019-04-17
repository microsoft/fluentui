import * as React from 'react';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import * as styles from './List.Basic.Example.scss';

export type IExampleItem = { name: string; thumbnail: string; description: string };

export interface IListBasicExampleProps {
  items: IExampleItem[];
}

export interface IListBasicExampleState {
  filterText?: string;
  items?: IExampleItem[];
}

export class ListBasicExample extends React.Component<IListBasicExampleProps, IListBasicExampleState> {
  constructor(props: IListBasicExampleProps) {
    super(props);

    this._onFilterChanged = this._onFilterChanged.bind(this);

    this.state = {
      filterText: '',
      items: props.items
    };
  }

  public render(): JSX.Element {
    const { items: originalItems } = this.props;
    const { items = [] } = this.state;
    const resultCountText = items.length === originalItems.length ? '' : ` (${items.length} of ${originalItems.length} shown)`;

    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <TextField label={'Filter by name' + resultCountText} onChange={this._onFilterChanged} />
        <List items={items} onRenderCell={this._onRenderCell} />
      </FocusZone>
    );
  }

  private _onFilterChanged(_: any, text: string): void {
    const { items } = this.props;

    this.setState({
      filterText: text,
      items: text ? items.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0) : items
    });
  }

  private _onRenderCell(item: IExampleItem, index: number | undefined): JSX.Element {
    return (
      <div className={styles.itemCell} data-is-focusable={true}>
        <Image className={styles.itemImage} src={item.thumbnail} width={50} height={50} imageFit={ImageFit.cover} />
        <div className={styles.itemContent}>
          <div className={styles.itemName}>{item.name}</div>
          <div className={styles.itemIndex}>{`Item ${index}`}</div>
          <div>{item.description}</div>
        </div>
        <Icon className={styles.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} />
      </div>
    );
  }
}
