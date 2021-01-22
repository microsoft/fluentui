import * as React from 'react';
import { Icon, SearchBox } from 'office-ui-fabric-react';
import * as stylesImport from './IconGrid.module.scss';
const styles: any = stylesImport;

export interface IIconGridProps {
  /**
   * An array of icons.
   */
  icons: { name: string; value?: JSX.Element }[];

  /**
   * Determines which iconset should be rendered
   */
  useIconsType: string;
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
      searchQuery: '',
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

  private _getItems = (): { name: string }[] => {
    const { icons } = this.props;
    const { searchQuery } = this.state;

    return icons.filter(icon => icon && icon.name && icon.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
  };

  private _renderIcon = (icon: { name: string; value?: JSX.Element }, index?: number): JSX.Element => {
    const { useIconsType } = this.props;
    let iconClassName = `ms-Icon ms-Icon--${icon.name}`;
    const iconRef = this._iconRefs[icon.name];
    if (iconRef.current && iconRef.current.offsetWidth > 80) {
      iconClassName += ' hoverIcon';
    }
    switch (useIconsType) {
      case 'fabric-font':
        return (
          <li key={icon.name + index} title={icon.name} aria-label={icon.name + ' icon'}>
            <Icon iconName={icon.name} />
          </li>
        );
      case 'fabric-svg':
        return (
          <li key={icon.name + index} title={icon.name} aria-label={icon.name + ' icon'}>
            {icon.value}
          </li>
        );
      case 'fabric-core':
        return (
          <li key={icon.name + index} aria-label={icon.name + ' icon'}>
            <i ref={iconRef} className={iconClassName} title={icon.name} aria-hidden="true" />
          </li>
        );
    }
  };

  private _onSearchQueryChanged = (ev, newValue: string): void => {
    this.setState({
      searchQuery: newValue,
    });
  };
}
