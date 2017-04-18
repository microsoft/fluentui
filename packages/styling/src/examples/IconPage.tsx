import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { CSSProperties } from 'glamor';
import * as icons from '../styles/icons';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Page, PageHeader } from './components';
import { getStyles } from './IconPage.styles';
import { IconTile } from './IconTile';

export interface IIconPageState {
  iconNames: string[];
}

export class IconPage extends BaseComponent<{}, IIconPageState> {
  constructor() {
    super();

    this.state = {
      iconNames: Object.keys(icons)
    };
  }

  public render(): JSX.Element {
    const { iconNames }: IIconPageState = this.state;
    const styles: CSSProperties = getStyles();
    return (
      <Page>
        <PageHeader text='Icons' />
        <SearchBox labelText='Filter icons...' onChange={ this._onSearchChange } />
        <FocusZone>
          <div { ...styles.container }>
            { iconNames.map((iconName: string) => (
              <IconTile key={ iconName } iconName={ iconName } data-is-focusable={ true } />
            )) }
          </div>
        </FocusZone>
      </Page>
    );
  }

  private _onSearchChange = (value: string): void => {
    let iconNames: string[] = Object.keys(icons);

    value = value.toLocaleLowerCase();

    if (value) {
      iconNames = iconNames.filter((name: string) => name.toLocaleLowerCase().indexOf(value) >= 0);
    }
    this.setState({ iconNames });
  }
}
