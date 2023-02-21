import * as React from 'react';
import { FontIcon, ISearchBoxProps, SearchBox, Spinner, SpinnerSize } from '@fluentui/react';
import * as stylesImport from './IconGrid.module.scss';
const styles: any = stylesImport;

export interface IFontIconGridProps {
  /**
   * An array of font-based icon names.
   */
  icons: { name: string }[];

  /**
   * Type of icons:
   * - `core-font` is Fabric Core font icons, rendered in an `<i>` tag with classes
   * - `react-font` is Fluent UI React font icons, rendered using `<FontIcon>`
   * - `react-svg` is SVG icon components, rendered directly
   */
  iconType: 'core-font' | 'react-font';
}

export interface ISvgIconGridProps {
  /**
   * A promise loading a package of SVG icon components.
   */
  icons: Promise<{ [exportName: string]: any }>;

  iconType: 'react-svg';
}

export type IIconGridProps = IFontIconGridProps | ISvgIconGridProps;

interface IFontIconDefinition {
  name: string;
  ref: React.RefObject<HTMLElement>;
  iconType: 'core-font' | 'react-font';
}

interface ISvgIconDefinition {
  name: string;
  component: React.ComponentType;
  iconType: 'react-svg';
}

type IIconDefinition = IFontIconDefinition | ISvgIconDefinition;

interface IIconGridState {
  /**
   * The text we are filtering the icons by.
   */
  searchQuery: string;

  /**
   * The actual icons to show. This is generated immediately for a static list of font-based icons,
   * or generated on load for a list of SVG icon components.
   */
  resolvedIcons?: IIconDefinition[];
}

export class IconGrid extends React.Component<IIconGridProps, IIconGridState> {
  constructor(props: IIconGridProps) {
    super(props);

    const state: IIconGridState = {
      searchQuery: '',
    };

    if (props.iconType !== 'react-svg') {
      state.resolvedIcons = props.icons
        // filter out any json meta properties or whatever
        .filter(icon => !!icon?.name)
        .map(icon => ({
          name: icon.name,
          ref: React.createRef(),
          // this is duplicated in each icon as a type discriminant
          iconType: props.iconType,
        }));
    }

    this.state = state;
  }

  public componentDidMount() {
    if (this.props.iconType === 'react-svg') {
      this.props.icons.then(iconExports => {
        this.setState({
          resolvedIcons: Object.keys(iconExports)
            // Remove any exports that aren't react components
            .filter(exportName => !!iconExports[exportName]?.displayName)
            .map(exportName => ({
              component: iconExports[exportName],
              name: exportName.replace(/Icon$/, ''),
              iconType: 'react-svg',
            })),
        });
      });
    }
  }

  public render(): JSX.Element {
    const areIconsLoaded = !!this.state.resolvedIcons;
    const icons = this._getItems();

    return (
      <div className={styles.root}>
        {areIconsLoaded ? (
          <>
            <SearchBox
              placeholder="Search icons"
              value={this.state.searchQuery}
              onChange={this._onSearchQueryChanged}
              className={styles.searchBox}
            />
            {icons.length ? <ul className={styles.grid}>{icons.map(this._renderIcon)}</ul> : <div>No results</div>}
          </>
        ) : (
          <Spinner label="Loading icons..." className={styles.loading} size={SpinnerSize.large} />
        )}
      </div>
    );
  }

  private _getItems = (): IIconDefinition[] => {
    const { searchQuery, resolvedIcons } = this.state;

    if (!resolvedIcons) {
      return [];
    }
    if (!searchQuery) {
      return resolvedIcons;
    }

    return resolvedIcons.filter(icon => icon.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
  };

  private _renderIcon = (icon: IIconDefinition, index?: number): JSX.Element => {
    let renderedIcon: JSX.Element;
    switch (icon.iconType) {
      case 'core-font':
        let iconClassName = `ms-Icon ms-Icon--${icon.name}`;
        if (icon.ref.current && icon.ref.current.offsetWidth > 80) {
          iconClassName += ' hoverIcon';
        }
        renderedIcon = <i ref={icon.ref} className={iconClassName} title={icon.name} aria-hidden="true" />;
        break;
      case 'react-font':
        renderedIcon = <FontIcon iconName={icon.name} />;
        break;
      case 'react-svg':
        const IconComponent = (icon as ISvgIconDefinition).component;
        renderedIcon = <IconComponent />;
        break;
    }

    return (
      <li key={icon.name + index} aria-label={icon.name + ' icon'}>
        {renderedIcon}
        <span className={styles.iconName}>{icon.name}</span>
      </li>
    );
  };

  private _onSearchQueryChanged: ISearchBoxProps['onChange'] = (ev, newValue) => {
    this.setState({
      searchQuery: newValue!,
    });
  };
}
