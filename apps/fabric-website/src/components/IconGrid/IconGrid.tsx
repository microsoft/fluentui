import * as React from 'react';
import { Icon, SearchBox } from 'office-ui-fabric-react';
import * as stylesImport from './IconGrid.module.scss';
const styles: any = stylesImport;

export interface IIconGridProps {
  /**
   * Determines which iconset should be rendered
   */
  iconType: 'font' | 'svg' | 'core';
}

export interface IIconInfo {
  name: string;
  icon?: React.ComponentType;
}

export interface IIconGridState {
  /**
   * The text we are filtering the icons by.
   */
  searchQuery: string;

  /**
   * An array of icons.
   */
  icons?: IIconInfo[];
}

export class IconGrid extends React.Component<IIconGridProps, IIconGridState> {
  private _iconRefs: { [iconName: string]: React.RefObject<HTMLElement> };

  constructor(props: IIconGridProps) {
    super(props);

    this.state = {
      searchQuery: '',
    };

    this._iconRefs = {};
  }

  public render(): JSX.Element {
    let { searchQuery } = this.state;

    const icons = this._getItems();

    return (
      <div>
        <SearchBox
          placeholder="Search icons"
          value={searchQuery}
          onChange={this._onSearchQueryChanged}
          className={styles.searchBox}
        />
        <ul className={styles.grid}>{icons.map(this._renderIcon)}</ul>
      </div>
    );
  }

  public async componentDidMount() {
    // Load the icons async after mount to avoid them being bundled and parsed with the page,
    // due to their large bundle size.
    switch (this.props.iconType) {
      case 'font':
        const fontIcons = (await import('@uifabric/icons/lib/data/AllIconNames.json')) as IIconInfo[];
        // There's a metadata entry in this file which doesn't have a name
        this.setState({ icons: fontIcons.filter(icon => !!icon.name) });
        break;

      case 'core':
        const coreIcons = (await import('office-ui-fabric-core/src/data/icons.json')) as IIconInfo[];
        this.setState({ icons: coreIcons });
        break;

      case 'svg':
        const MDL2Icons = await import('@fluentui/react-icons');
        this.setState({
          icons: Object.keys(MDL2Icons)
            .map((name): IIconInfo | undefined => {
              const IconComponent = MDL2Icons[name];
              if (typeof IconComponent === 'function' && /^[A-Z].*Icon$/.test(name)) {
                return { name, icon: IconComponent };
              }
              return undefined;
            })
            .filter(icon => !!icon),
        });
        break;
    }
  }

  private _getItems = (): { name: string }[] => {
    const { icons, searchQuery } = this.state;
    const query = searchQuery.toLowerCase();

    return icons ? (query ? icons.filter(icon => icon.name?.toLowerCase().indexOf(query) !== -1) : icons) : [];
  };

  private _renderIcon = (icon: IIconInfo): JSX.Element => {
    const { iconType } = this.props;
    let iconClassName = `ms-Icon ms-Icon--${icon.name}`;

    switch (iconType) {
      case 'font':
        return (
          <li key={icon.name} title={icon.name} aria-label={icon.name + ' icon'}>
            <Icon iconName={icon.name} />
            <span className={styles.iconName}>{icon.name}</span>
          </li>
        );
      case 'svg':
        const IconComponent = icon.icon;
        return (
          <li key={icon.name} title={icon.name} aria-label={icon.name + ' icon'}>
            <IconComponent />
            <span className={styles.iconName}>{icon.name}</span>
          </li>
        );
      case 'core':
        if (!this._iconRefs[icon.name]) {
          this._iconRefs[icon.name] = React.createRef();
        }
        const iconRef = this._iconRefs[icon.name];
        if (iconRef.current && iconRef.current.offsetWidth > 80) {
          iconClassName += ' hoverIcon';
        }
        return (
          <li key={icon.name} aria-label={icon.name + ' icon'}>
            <i ref={iconRef} className={iconClassName} title={icon.name} aria-hidden="true" />
            <span className={styles.iconName}>{icon.name}</span>
          </li>
        );
    }
  };

  private _onSearchQueryChanged = (ev: unknown, newValue: string): void => {
    this.setState({
      searchQuery: newValue || '',
    });
  };
}
