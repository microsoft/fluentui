import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { css, CSSProperties } from 'glamor';
import { icons } from '../styles/icons';
import { fonts, iconFont } from '../styles/fonts';
import { defaultPalette } from '../styles/colors';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';

const styles = {
  root: css({
    padding: '20px'
  }),

  header: css(
    fonts.xLarge,
    {
      paddingBottom: '20px'
    }
  ),

  row: css({
    paddingBottom: '10px',
    borderBottom: '1px solid #aaa',
    userSelect: 'none'
  }),
  cell: css(
    fonts.medium,
    { margin: '0 4px' }
  ),

  iconTile: css(
    fonts.xSmall,
    {
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '5px',
      width: 150,
      height: 80,
      opacity: .6,
      cursor: 'default',
      outline: 'none',
      position: 'relative',

      ':focus:after': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        border: '1px solid ' + defaultPalette.themePrimary
      },
      ':focus': {
        opacity: 1,
        background: defaultPalette.themeLighterAlt
      },
      ':hover': {
        opacity: 1,
        background: defaultPalette.themeLighterAlt
      },
      ':focus:hover': {
        background: defaultPalette.themeLight
      }
    }),

  icon: css(
    iconFont,
    {
      fontSize: '36px',
      paddingBottom: '8px'
    }),

  container: css({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  })

};

export function IconTile(props) {
  let { iconName, ...divProps } = props;
  return (
    <div { ...styles.iconTile } { ...divProps }>
      <i { ...fonts.icon } { ...styles.icon } dangerouslySetInnerHTML={ { __html: icons[iconName] } } />
      <div>{ iconName }</div>
    </div>
  );
}

export class IconPage extends BaseComponent<{}, any> {
  constructor() {
    super();

    this.state = {
      iconNames: Object.keys(icons)
    };
  }

  public render(): JSX.Element {
    let { iconNames } = this.state;
    return (
      <div { ...styles.root }>
        <div { ...styles.header }>Icons</div>
        <SearchBox labelText='Filter icons...' onChange={ this._onSearchChange } />
        <FocusZone>
          <div { ...styles.container }>
            { iconNames.map(iconName => (
              <IconTile key={ iconName } iconName={ iconName } data-is-focusable={ true } />
            )) }
          </div>
        </FocusZone>
      </div>
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
