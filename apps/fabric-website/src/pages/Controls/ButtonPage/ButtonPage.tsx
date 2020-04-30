import * as React from 'react';
import { Toggle, IToggleStyles } from 'office-ui-fabric-react/lib/Toggle';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ButtonPageProps } from './ButtonPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { ImplementationSection } from '@uifabric/example-app-base/lib/index2';

const toggleStyles: Partial<IToggleStyles> = {
  root: { margin: '10px 0' },
};
const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/ButtonPage/';

export class ButtonPage extends React.Component<
  IControlsPageProps,
  {
    areButtonsDisabled: boolean;
    areButtonsChecked: boolean;
  }
> {
  public constructor(props: IControlsPageProps) {
    super(props);
    this.state = {
      areButtonsDisabled: false,
      areButtonsChecked: false,
    };
  }

  public renderKnobs() {
    const { areButtonsDisabled, areButtonsChecked } = this.state;
    return (
      <>
        <Toggle
          styles={toggleStyles}
          label="Disable buttons"
          inlineLabel
          checked={areButtonsDisabled}
          onChange={this._onDisabledChanged}
        />
        <Toggle
          styles={toggleStyles}
          label="Mark as checked"
          inlineLabel
          checked={areButtonsChecked}
          onChange={this._onToggledChanged}
        />
      </>
    );
  }

  public render() {
    console.log(this.props.platform);
    const { areButtonsDisabled, areButtonsChecked } = this.state;
    const buttonPageProps = ButtonPageProps(areButtonsDisabled, areButtonsChecked);
    return (
      <ControlsAreaPage
        {...this.props}
        title="Button"
        {...buttonPageProps[this.props.platform]}
        exampleKnobs={this.renderKnobs()}
        otherSections={this._otherSections(this.props.platform) as IPageSectionProps[]}
      />
    );
  }

  private _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
    switch (platform) {
      case 'ios':
        return [
          {
            sectionName: 'Implementation',
            editUrl: baseUrl + 'docs/ios/ButtonImplementation.md',
            content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ButtonPage/docs/ios/ButtonImplementation.md') as string,
          },
        ];

      case 'android':
        return [
          {
            sectionName: 'Implementation',
            editUrl: baseUrl + 'docs/android/ButtonImplementation.md',
            content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ButtonPage/docs/android/ButtonImplementation.md') as string,
          },
        ];
      case 'mac':
        return [
          {
            sectionName: 'Swift Implementation',
            editUrl: baseUrl + 'docs/mac/ButtonImplementation.md',
            content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ButtonPage/docs/mac/ButtonImplementation.md') as string,
          },
          {
            sectionName: 'Fluent UI React Native Implementation',
            editUrl: baseUrl + 'docs/mac/ButtonImplementation.md',
            content: (
              <ImplementationSection
                jsonDocs={{
                  tables: [
                    {
                      kind: 'interface',
                      name: 'IButtonProps',
                      description: '\n',
                      members: [
                        {
                          name: 'componentRef',
                          typeTokens: [
                            {
                              text: 'React.RefObject<IFocusable>',
                            },
                          ],
                          kind: 'property',
                          description:
                            'A RefObject to access the IButton interface. Use this to access the public methods and properties of the component.\n',
                        },
                        {
                          name: 'content',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'Text to show on the Button\n',
                        },
                        {
                          name: 'icon',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'Source URL or name of the icon to show on the Button\n',
                        },
                        {
                          name: 'onClick',
                          typeTokens: [
                            {
                              text: 'void',
                            },
                          ],
                          kind: 'property',
                          description: 'A callback to call on button click event\n',
                        },
                      ],
                    },
                    {
                      kind: 'interface',
                      name: 'IButtonTokens',
                      description: '\n',
                      extendsTokens: [
                        {
                          text: 'ITextTokens, ',
                        },
                        {
                          text: 'IForegroundColorTokens, ',
                        },
                        {
                          text: 'IBackgroundColorTokens, ',
                        },
                        {
                          text: 'IBorderTokens',
                        },
                      ],
                      members: [
                        {
                          name: 'contentPadding',
                          typeTokens: [
                            {
                              text: 'number | string',
                            },
                          ],
                          kind: 'property',
                          description: 'The amount of padding between the border and the contents\n',
                        },
                        {
                          name: 'contentPaddingFocused',
                          typeTokens: [
                            {
                              text: 'number | string',
                            },
                          ],
                          kind: 'property',
                          description:
                            'The amount of padding between the border and the contents when the Button has focus\n',
                        },
                        {
                          name: 'iconColor',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'The icon color\n',
                        },
                        {
                          name: 'iconColorHovered',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'The icon color when hovering over the Button.\n',
                        },
                        {
                          name: 'iconColorPressed',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'The icon color when the Button is being pressed\n',
                        },
                        {
                          name: 'iconSize',
                          typeTokens: [
                            {
                              text: 'number | string',
                            },
                          ],
                          kind: 'property',
                          description: 'The size of the icon\n',
                        },
                        {
                          name: 'iconWeight',
                          typeTokens: [
                            {
                              text: 'number',
                            },
                          ],
                          kind: 'property',
                          description: 'The weight of the lines used when drawing the icon\n',
                        },
                        {
                          name: 'content',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'Text to show on the Button\n',
                        },
                        {
                          name: 'icon',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'Source URL or name of the icon to show on the Button\n',
                        },
                      ],
                    },
                  ],
                }}
              />
            ),
          },
        ];
      case 'windows':
        return [
          {
            sectionName: 'Implementation',
            editUrl: baseUrl + 'docs/windows/ButtonImplementation.md',
            content: (
              <ImplementationSection
                jsonDocs={{
                  tables: [
                    {
                      kind: 'interface',
                      name: 'IButtonProps',
                      description: '\n',
                      members: [
                        {
                          name: 'componentRef',
                          typeTokens: [
                            {
                              text: 'React.RefObject<IFocusable>',
                            },
                          ],
                          kind: 'property',
                          description:
                            'A RefObject to access the IButton interface. Use this to access the public methods and properties of the component.\n',
                        },
                        {
                          name: 'content',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'Text to show on the Button\n',
                        },
                        {
                          name: 'icon',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'Source URL or name of the icon to show on the Button\n',
                        },
                        {
                          name: 'onClick',
                          typeTokens: [
                            {
                              text: 'void',
                            },
                          ],
                          kind: 'property',
                          description: 'A callback to call on button click event\n',
                        },
                      ],
                    },
                    {
                      kind: 'interface',
                      name: 'IButtonTokens',
                      description: '\n',
                      extendsTokens: [
                        {
                          text: 'ITextTokens, ',
                        },
                        {
                          text: 'IForegroundColorTokens, ',
                        },
                        {
                          text: 'IBackgroundColorTokens, ',
                        },
                        {
                          text: 'IBorderTokens',
                        },
                      ],
                      members: [
                        {
                          name: 'contentPadding',
                          typeTokens: [
                            {
                              text: 'number | string',
                            },
                          ],
                          kind: 'property',
                          description: 'The amount of padding between the border and the contents\n',
                        },
                        {
                          name: 'contentPaddingFocused',
                          typeTokens: [
                            {
                              text: 'number | string',
                            },
                          ],
                          kind: 'property',
                          description:
                            'The amount of padding between the border and the contents when the Button has focus\n',
                        },
                        {
                          name: 'iconColor',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'The icon color\n',
                        },
                        {
                          name: 'iconColorHovered',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'The icon color when hovering over the Button.\n',
                        },
                        {
                          name: 'iconColorPressed',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'The icon color when the Button is being pressed\n',
                        },
                        {
                          name: 'iconSize',
                          typeTokens: [
                            {
                              text: 'number | string',
                            },
                          ],
                          kind: 'property',
                          description: 'The size of the icon\n',
                        },
                        {
                          name: 'iconWeight',
                          typeTokens: [
                            {
                              text: 'number',
                            },
                          ],
                          kind: 'property',
                          description: 'The weight of the lines used when drawing the icon\n',
                        },
                        {
                          name: 'content',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'Text to show on the Button\n',
                        },
                        {
                          name: 'icon',
                          typeTokens: [
                            {
                              text: 'string',
                            },
                          ],
                          kind: 'property',
                          description: 'Source URL or name of the icon to show on the Button\n',
                        },
                      ],
                    },
                  ],
                }}
              />
            ),
          },
        ];
    }
  }

  private _onDisabledChanged = (ev: React.MouseEvent<HTMLElement>, disabled: boolean): void => {
    this.setState({
      areButtonsDisabled: disabled,
    });
  };

  private _onToggledChanged = (ev: React.MouseEvent<HTMLElement>, toggled: boolean): void => {
    this.setState({
      areButtonsChecked: toggled,
    });
  };
}
