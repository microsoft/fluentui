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

  public render(): JSX.Element {
    let { icons } = this.props;
    let { searchQuery } = this.state;

    return (
      <div>
        <SearchBox
          placeholder="Search icons"
          value={searchQuery}
          onChange={this._onSearchQueryChanged.bind(this)}
          className={styles.searchBox}
        />
        <ul className={styles.grid}>
          {icons
            .filter(icon => icon.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
            .map((icon, iconIndex) => {
              let iconJsxElement = (
                <i
                  ref={`${icon.name}`}
                  className={`ms-Icon ms-Icon--${icon.name}`}
                  title={`${icon.name}`}
                  aria-hidden="true"
                />
              );
              let iconRefElement = this.refs[icon.name] as HTMLElement;

              if (iconRefElement && iconRefElement.offsetWidth > 80) {
                iconJsxElement = (
                  <i
                    ref={`${icon.name}`}
                    className={`ms-Icon ms-Icon--${icon.name} hoverIcon`}
                    title={`${icon.name}`}
                    aria-hidden="true"
                  />
                );
              }

              return (
                <li key={iconIndex} aria-label={icon.name + ' icon'}>
                  {iconJsxElement}
                  <span>{icon.name}</span>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }

  private _onSearchQueryChanged(newValue): void {
    this.setState({
      searchQuery: newValue
    });
  }
}
