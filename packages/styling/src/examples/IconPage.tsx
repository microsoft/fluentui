import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { CSSProperties, iconCodes } from '@uifabric/styling';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Page, PageHeader } from './components';
import { IconTile } from './IconTile';
import { getStyles } from './IconPage.styles';

export interface IIconPageState {
  iconNames: string[];
}

export class IconPage extends BaseComponent<{}, IIconPageState> {
  constructor() {
    super();

    this.state = {
      iconNames: Object.keys(iconCodes)
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
          <div className={ styles.container }>
            { iconNames.map((iconName: string) => (
              <IconTile key={ iconName } iconName={ iconName } data-is-focusable={ true } />
            )) }
          </div>
        </FocusZone>
      </Page>
    );
  }

  private _onSearchChange = (value: string): void => {
    let iconNames: string[] = Object.keys(iconCodes);

    value = value.toLocaleLowerCase();

    if (value) {
      iconNames = iconNames.filter((name: string) => name.toLocaleLowerCase().indexOf(value) >= 0);
    }
    this.setState({ iconNames });
  }
}
