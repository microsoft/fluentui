import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import * as stylesImport from './IconGrid.module.scss';
const styles: any = stylesImport;

export interface IIconGridProps {
  /**
   * An array of icons.
   */
  icons: any[];
}

export interface IIconGridState {
  /**
   * The text we are filtering the icons by.
   */
  searchQuery: string;
}

export class IconGrid extends React.Component<IIconGridProps, IIconGridState> {
  constructor(props: IIconGridProps) {
    super(props);

    this.state = {
      searchQuery: ''
    };
  }

  public render() {
    let { icons } = this.props;
    let { searchQuery } = this.state;

    return (
      <div>
        <SearchBox labelText='Search icons' value={ searchQuery } onChange={ this._onSearchQueryChanged.bind(this) } className={ styles.searchBox } />
        <ul className={ styles.grid }>
          { icons
            .filter(icon => icon.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
            .map((icon, iconIndex) => (
              <li key={ iconIndex } aria-label={ icon.name + ' icon' }>
                <i className={ `ms-Icon ms-Icon--${icon.name}` } title={ `${icon.name}` } aria-hidden='true' />
                <span>{ icon.name }</span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

  private _onSearchQueryChanged(newValue) {
    this.setState({
      'searchQuery': newValue
    });
  }
}
