import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import * as stylesImport from './IconGrid.module.scss';
const styles: any = stylesImport;

export interface IIconGridProps {
  /**
   * An array of icons.
   */
  icons: Array<{ name: string }>;
}

export interface IIconGridState {
  /**
   * The text we are filtering the icons by.
   */
  searchQuery: string;
}

export class IconGrid extends React.Component<IIconGridProps, IIconGridState> {
  private _iconRefs: { [iconName: string]: React.RefObject<HTMLElement> };

  constructor(props: IIconGridProps) {
    super(props);

    this.state = {
      searchQuery: ''
    };

    this._iconRefs = {};
    for (const icon of props.icons) {
      this._iconRefs[icon.name] = React.createRef();
    }
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
              let iconClassName = `ms-Icon ms-Icon--${icon.name}`;
              const iconRef = this._iconRefs[icon.name];
              if (iconRef.current && iconRef.current.offsetWidth > 80) {
                iconClassName += ' hoverIcon';
              }

              return (
                <li key={iconIndex} aria-label={icon.name + ' icon'}>
                  <i ref={iconRef} className={iconClassName} title={icon.name} aria-hidden="true" />
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
