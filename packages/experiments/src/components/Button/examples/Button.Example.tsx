import * as React from 'react';
import { Button, IButtonComponent, IButtonStyleVariables } from '../index';
import { HorizontalStack, Text, VerticalStack } from '@uifabric/experiments';
import {
  Customizer,
  ContextualMenu,
  IContextualMenuProps,
  Icon,
  createTheme,
  Dropdown,
  ITheme,
  ISchemeNames,
  CommandBar,
  IDropdownOption
} from 'office-ui-fabric-react';
import { getNeutralVariant, getSoftVariant, getStrongVariant } from '@uifabric/variants';

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu = (props: IContextualMenuProps) => <ContextualMenu {...props} items={menuItems} />;

const DefaultCustomizations = {
  settings: {
    theme: createTheme({})
  }
};

const WordCustomizations = {
  settings: {
    theme: createTheme({
      palette: {
        themePrimary: '#2b579a',
        themeSecondary: '#366ec2'
      },
      semanticColors: {
        buttonBackground: 'white',
        buttonBackgroundHovered: 'rgb(240, 240, 240)',
        buttonBackgroundPressed: 'rgb(240, 240, 240)',
        buttonText: 'rgb(43, 87, 154)',
        buttonBorder: 'rgb(237, 235, 233)'
      }
    })
  },

  scopedSettings: {
    Button: {
      styleVariables: {
        baseVariant: {
          baseState: {
            borderWidth: 1,
            minHeight: 26,
            textSize: 13.5,
            lineHeight: 13.5,
            textWeight: 600,
            iconSize: 12,
            contentPadding: '0px 6px'
          }
        }
      } as IButtonStyleVariables
    }
  }
};

const TeamsCustomizations = {
  settings: {
    theme: createTheme({
      palette: {
        themePrimary: '#6061aa',
        themeLighterAlt: '#f7f7fc',
        themeLighter: '#e1e1f2',
        themeLight: '#c7c8e6',
        themeTertiary: '#9797cd',
        themeSecondary: '#6f70b5',
        themeDarkAlt: '#56579a',
        themeDark: '#494a82',
        themeDarker: '#363660',
        neutralLighterAlt: '#f8f8f8',
        neutralLighter: '#f4f4f4',
        neutralLight: '#eaeaea',
        neutralQuaternaryAlt: '#dadada',
        neutralQuaternary: '#d0d0d0',
        neutralTertiaryAlt: '#c8c8c8',
        neutralTertiary: '#b6b0b0',
        neutralSecondary: '#9f9797',
        neutralPrimaryAlt: '#877f7f',
        neutralPrimary: '#282424',
        neutralDark: '#585151',
        black: '#403b3b',
        white: '#fff'
      },
      semanticColors: {
        buttonBackground: 'transparent',
        buttonBackgroundHovered: '#bdbdbd',
        buttonBackgroundPressed: '#a7a7a7',

        buttonText: '#252424',
        buttonTextPressed: '#252424',
        buttonTextHovered: '#252424',

        buttonBorder: '#bdbdbd',

        primaryBorder: 'transparent'
      }
    })
  },

  scopedSettings: {
    Button: {
      styleVariables: {
        baseVariant: {
          baseState: {
            borderRadius: 3,
            borderWidth: 2,
            iconSize: 16,
            iconWeight: 700,
            textWeight: 400,
            contentPadding: '4px 32px'
          },
          enabled: {
            iconColor: '#252424',
            borderColorHovered: 'transparent',
            borderColorPressed: 'transparent'
          },
          expanded: {
            borderColor: 'transparent'
          }
        },
        circular: {
          baseState: {
            borderWidth: 1
          },
          enabled: {
            backgroundColorHovered: '#464775',
            backgroundColorPressed: '#464775',

            textColorHovered: '#fff',
            textColorPressed: '#fff',

            iconColorHovered: '#fff',
            iconColorPressed: '#fff'
          }
        },
        primary: {
          enabled: {
            // borderColor: 'transparent',
            // borderColorHovered: 'transparent',
            // borderColorPressed: 'transparent',
            iconColor: 'white'
          }
        }
      }
    }
  }
};

const _themes = [
  { title: 'Default styling', customizations: DefaultCustomizations },
  { title: 'Word styling', customizations: WordCustomizations },
  { title: 'Teams styling', customizations: TeamsCustomizations }
];

const _schemes: ISchemeNames[] = ['default', 'strong', 'soft', 'neutral'];

// tslint:disable-next-line:typedef
_themes.forEach(theme => {
  _updateSchemes(theme.customizations.settings.theme);
});

const sectionGap = 32;
const headingGap = 16;
const buttonGap = 12;

const regionStyles: IButtonComponent['styles'] = props => ({
  root: {
    backgroundColor: props.theme.semanticColors.bodyBackground,
    color: props.theme.semanticColors.bodyText
  }
});

const ButtonStack = (props: { children: JSX.Element[] }) => <HorizontalStack gap={buttonGap}>{props.children}</HorizontalStack>;

const ButtonSet = (props: { scheme: ISchemeNames; className?: string; customizations?: {}; title: string }) => (
  <Customizer {...props.customizations}>
    <VerticalStack styles={regionStyles} scheme={props.scheme} className={props.className} gap={headingGap}>
      <Text variant="h3">
        {props.title} - {props.scheme}
      </Text>
      <div>
        <VerticalStack gap={buttonGap}>
          <ButtonStack>
            <Button text="Default button" />
            <Button disabled text="Disabled default button" />
            <Button primary text="Primary button" />
            <Button disabled primary text="Primary disabled button" />
          </ButtonStack>
          <ButtonStack>
            <Button icon="PeopleAdd" circular />
            <Button icon="Phone" circular disabled />
            <Button icon="FontSize" circular primary />
            <Button icon="Attach" circular primary disabled />
          </ButtonStack>
          <ButtonStack>
            <Button icon="Upload" text="Button with string icon" />
            <Button icon={{ iconName: 'Share' }} text="Button with iconProps" />
            <Button icon={<Icon iconName="Download" />} text="Button with custom icon" />
          </ButtonStack>
          <ButtonStack>
            <Button>
              <Icon iconName="Upload" />
              <Text>With custom text/icon</Text>
            </Button>
            <Button primary>
              <Text>With custom text/icon right aligned</Text>
              <Icon iconName="Upload" />
            </Button>
          </ButtonStack>
          <ButtonStack>
            <Button text="Menu button" menu={buttonMenu} />
            <Button disabled text="Menu disabled button" menu={buttonMenu} />
            <Button expanded text="Menu expanded button" />
            <Button expanded primary text="Menu expanded primary button" />
          </ButtonStack>
          <ButtonStack>
            <Button icon="Share" menu={buttonMenu}>
              <VerticalStack padding="8px 0" as="span" gap={4} horizontalAlign="left">
                <Text>I am a compound multiline button.</Text>
                <Text variant="caption">I can have a caption.</Text>
              </VerticalStack>
            </Button>
            <Button disabled text="Menu disabled button" />
            <Button expanded text="Menu expanded button" />
          </ButtonStack>
          <CommandBar items={[{ key: '0', text: 'Button 1', iconProps: { iconName: 'Upload' } }]} />
        </VerticalStack>
      </div>
    </VerticalStack>
  </Customizer>
);

export class ButtonExample extends React.Component<{}, { customizations: {}; scheme: ISchemeNames }> {
  public state = {
    customizations: _themes[0],
    scheme: _schemes[0]
  };

  public render(): JSX.Element {
    return (
      <VerticalStack gap={sectionGap}>
        <ButtonStack>
          <Dropdown
            // tslint:disable-next-line:jsx-ban-props
            style={{ width: 300 }}
            label="Theme:"
            defaultSelectedKey={0}
            // tslint:disable-next-line:no-any
            options={_themes.map((item: any, index: number) => ({
              key: index,
              text: item.title
            }))}
            onChange={this._onThemeChange}
          />

          <Dropdown
            // tslint:disable-next-line:jsx-ban-props
            style={{ width: 300 }}
            label="Scheme:"
            defaultSelectedKey={0}
            // tslint:disable-next-line:no-any
            options={_schemes.map((item: any, index: number) => ({
              key: index,
              text: item
            }))}
            onChange={this._onSchemeChange}
          />
        </ButtonStack>
        <ButtonSet
          scheme={this.state.scheme}
          title={this.state.customizations.title}
          customizations={this.state.customizations.customizations}
        />
      </VerticalStack>
    );
  }

  private _onThemeChange = (ev: React.MouseEvent<HTMLDivElement>, value: IDropdownOption) => {
    // tslint:disable-next-line:no-any
    this.setState({ customizations: _themes[value.key as any] });
  };

  private _onSchemeChange = (ev: React.MouseEvent<HTMLDivElement>, value: IDropdownOption) => {
    // tslint:disable-next-line:no-any
    this.setState({ scheme: _schemes[value!.key as any] });
  };
}

function _updateSchemes(theme: ITheme): void {
  theme.schemes = {
    strong: getStrongVariant(theme),
    soft: getSoftVariant(theme),
    neutral: getNeutralVariant(theme)
  };
}
