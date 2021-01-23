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

export interface IIconGridState {
  /**
   * The text we are filtering the icons by.
   */
  searchQuery: string;

  /**
   * An array of icons.
   */
  icons?: { name: string; value?: JSX.Element }[];
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

  public componentDidMount() {
    // Load the icons async after mount to avoid them being bundled and parsed with the page,
    // due to their large bundle size.
    switch (this.props.iconType) {
      case 'font':
        require.ensure([], require => {
          this.setState({ icons: require('@uifabric/icons/lib/data/AllIconNames.json') });
        });
        break;

      case 'svg':
        require.ensure([], require => {
          const MDL2Icons = require('@fluentui/react-icons');
          const icons: IIconGridState['icons'] = Object.keys(MDL2Icons)
            .map(key => {
              const IconComponent = MDL2Icons[key];
              if (
                typeof IconComponent === 'function' &&
                key !== 'createSvgIcon' &&
                String(IconComponent).indexOf('return React.createElement') !== -1
              ) {
                IconComponent.key = 'key';
                return { name: key, value: <IconComponent /> };
              }
              return undefined;
            })
            .filter(icon => !!icon);

          this.setState({ icons });
        });
        break;

      case 'core':
        require.ensure([], require => {
          this.setState({ icons: require('office-ui-fabric-core/src/data/icons.json') });
        });
        break;
    }
  }

  private _getItems = (): { name: string }[] => {
    const { icons, searchQuery } = this.state;
    const query = searchQuery.toLowerCase();

    return icons ? (query ? icons.filter(icon => icon.name?.toLowerCase().indexOf(query) !== -1) : icons) : [];
  };

  private _renderIcon = (icon: { name: string; value?: JSX.Element }, index?: number): JSX.Element => {
    const { iconType } = this.props;
    let iconClassName = `ms-Icon ms-Icon--${icon.name}`;

    switch (iconType) {
      case 'font':
        return (
          <li key={icon.name} title={icon.name} aria-label={icon.name + ' icon'}>
            <Icon iconName={icon.name} />
          </li>
        );
      case 'svg':
        return (
          <li key={icon.name} title={icon.name} aria-label={icon.name + ' icon'}>
            {icon.value}
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
