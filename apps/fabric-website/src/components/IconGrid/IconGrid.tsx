import * as React from 'react';
import { Icon, SearchBox } from 'office-ui-fabric-react';
import * as stylesImport from './IconGrid.module.scss';
const styles: any = stylesImport;

export interface IIconGridProps {
  /**
   * An array of icons.
   */
  icons: { name: string }[];

  /**
   * If we should render using `Icon` from Fabric
   */
  useFabricIcons?: boolean;
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
    let { searchQuery } = this.state;

    const icons = this._getItems();

    return (
      <div>
        <SearchBox placeholder="Search icons" value={searchQuery} onChange={this._onSearchQueryChanged} className={styles.searchBox} />
        <ul className={styles.grid}>{icons.map(this._renderIcon)}</ul>
      </div>
    );
  }

  private _getItems = (): { name: string }[] => {
    const { icons } = this.props;
    const { searchQuery } = this.state;

    return icons.filter(icon => icon && icon.name && icon.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
  };

  private _renderIcon = (icon: { name: string }, index?: number): JSX.Element => {
    const { useFabricIcons } = this.props;
    let iconClassName = `ms-Icon ms-Icon--${icon.name}`;
    const iconRef = this._iconRefs[icon.name];
    if (iconRef.current && iconRef.current.offsetWidth > 80) {
      iconClassName += ' hoverIcon';
    }

    return (
      <li key={icon.name + index} aria-label={icon.name + ' icon'}>
        {useFabricIcons ? (
          <Icon iconName={icon.name} />
        ) : (
          <i ref={iconRef} className={iconClassName} title={icon.name} aria-hidden="true" />
        )}
        <span>{icon.name}</span>
      </li>
    );
  };

  private _onSearchQueryChanged = (ev, newValue: string): void => {
    this.setState({
      searchQuery: newValue
    });
  };
}
