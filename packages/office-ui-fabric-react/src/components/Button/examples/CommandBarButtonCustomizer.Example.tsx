import * as React from 'react';
import { Customizer, customizable } from 'office-ui-fabric-react/lib/Utilities';
import { ITheme } from '@uifabric/styling';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { mergeStyles } from '@uifabric/styling';

export interface IExampleProps {
  theme?: ITheme;
}

@customizable('CommandBarButtonCustomizerExample', ['theme', 'styles'])
export class CommandBarButtonCustomizerExample extends React.Component<IExampleProps, {}> {
  public render(): JSX.Element {
    const { theme } = this.props;

    const settings = {
      theme: {
        ...theme,
        palette: {
          ...theme!.palette,
          themePrimary: 'red'
        }
      },
      styles: {
        root: {
          color: 'green',
          background: '#e7e7e7'
        }
      }
    };

    const scopedSettings = {
      CommandBarButton: {
        styles: {
          root: {
            background: 'yellow',
            padding: 10,
            margin: '0px 5px',
            selectors: {
              ':hover': {
                background: 'cyan !important'
              }
            }
          }
        }
      },
      Icon: {
        styles: {
          root: {
            background: 'transparent'
          }
        }
      }
    };

    const buttonClass = mergeStyles({
      border: '2px solid blue',
      color: 'purple'
    });

    const buttonStyles = {
      root: {
        border: '2px solid red',
        background: 'orange'
      }
    };

    const items = [
      {
        key: 'newItem',
        name: 'Only Customizer styles',
        cacheKey: 'myCacheKey',
        iconProps: {
          iconName: 'Add'
        },
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        ['data-automation-id']: 'newItemMenu',
        subMenuProps: {
          items: [
            {
              key: 'emailMessage',
              name: 'Email message',
              iconProps: {
                iconName: 'Mail'
              },
              ['data-automation-id']: 'newEmailButton'
            },
            {
              key: 'calendarEvent',
              name: 'Calendar event',
              iconProps: {
                iconName: 'Calendar'
              }
            }
          ]
        }
      },
      {
        key: 'upload',
        name: 'Customizer and buttonStyles',
        iconProps: {
          iconName: 'Upload'
        },
        href: 'https://dev.office.com/fabric',
        ['data-automation-id']: 'uploadButton',
        buttonStyles: buttonStyles
      },
      {
        key: 'share',
        name: 'Customizer and className',
        iconProps: {
          iconName: 'Share'
        },
        onClick: () => console.log('Share'),
        className: buttonClass
      },
      {
        key: 'download',
        name: 'Customizer, buttonStyles, and className',
        iconProps: {
          iconName: 'Download'
        },
        onClick: () => console.log('Download'),
        className: buttonClass, // for some reason this overrides the buttonStyles - shouldn't it be the other way around?
        buttonStyles: buttonStyles
      }
    ];

    return (
      <Customizer settings={settings} scopedSettings={scopedSettings}>
        <div>
          <CommandBar items={items} />
          <CommandBarButton
            text="Command bar button"
            className={mergeStyles({ color: 'red' })}
            styles={{ root: { color: 'blue' } }}
          />
          <div className={mergeStyles({ color: 'red' })} style={{ color: 'blue' }}>
            Testing precedence
          </div>
        </div>
      </Customizer>
    );
  }
}
