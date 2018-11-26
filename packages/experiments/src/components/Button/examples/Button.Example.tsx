import * as React from 'react';
import { Button, IButtonComponent } from '../index';
import { HorizontalStack, Text, VerticalStack } from '@uifabric/experiments';
import { ContextualMenu, Customizer, IContextualMenuProps, Icon, CommandBar, Spinner } from 'office-ui-fabric-react';

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu = (props: IContextualMenuProps) => <ContextualMenu {...props} items={menuItems} />;

const sectionGap = 32;
const headingGap = 16;
const buttonGap = 12;

const ButtonStack = (props: { children: JSX.Element | JSX.Element[] }) => (
  <HorizontalStack gap={buttonGap}>{props.children}</HorizontalStack>
);

const ButtonTheme = {
  scopedSettings: {
    Icon: {
      styles: {
        root: {
          fontSize: 24,
          color: 'purple'
        }
      }
    },
    HorizontalStack: {
      styles: {
        root: {
          background: 'lightblue'
        }
      }
    },
    Text: {
      styles: {
        root: {
          color: 'purple'
        }
      }
    }
  }
};

const getButtonStyles: IButtonComponent['styles'] = {
  icon: ButtonTheme.scopedSettings.Icon.styles.root,
  stack: ButtonTheme.scopedSettings.HorizontalStack.styles.root,
  text: ButtonTheme.scopedSettings.Text.styles.root
};

// tslint:disable:jsx-no-lambda
const ButtonSet = () => (
  <VerticalStack gap={headingGap} padding={8}>
    <div>
      <VerticalStack gap={buttonGap} maxWidth={400}>
        {/* <ButtonStack>
          <Button text="Default button" />
          <Button disabled text="Disabled default button" />
          <Button primary text="Primary button" />
          <Button disabled primary text="Primary disabled button" styles={{}} />
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
        </ButtonStack> */}

        <VerticalStack gap={buttonGap}>
          <h2>Icon Slot</h2>
          <Button icon="share" text="Icon: String" />
          <Button
            icon={(IconType, iconProps) => (
              <b>
                Icon: <IconType {...iconProps} iconName="upload" />
              </b>
            )}
            text="Icon: Function"
          />
          <Button icon={<Spinner />} text="Icon: JSX Element" />
          <Button icon={{ iconName: 'share' }} text="Icon: Props" />
        </VerticalStack>

        <VerticalStack gap={buttonGap}>
          <h2>Text Slot</h2>
          <Button icon="share" text={true}>
            <p>Text: Boolean</p>
          </Button>
          <Button icon="share" text={1}>
            <p>Text: Integer</p>
          </Button>
          <Button
            icon="share"
            text={(TextType, textProps) => (
              <b>
                Text: <TextType {...textProps}>TextType</TextType>
              </b>
            )}
          />
          <Button icon="share" text="Text: String" />
          <Button icon="share" text={<Text>Text: JSX Element</Text>} />
          <Button icon="share" text="Text: String">
            <p>Button Child 1</p>
            <p>Button Child 2</p>
          </Button>
        </VerticalStack>

        <VerticalStack gap={buttonGap}>
          <h2>Styled Buttons</h2>
          <Button
            icon={{ iconName: 'share' }}
            stack={{ styles: ButtonTheme.scopedSettings.HorizontalStack.styles }}
            text="Stack as IStackProps with styles"
          />
          <Button icon={{ iconName: 'share', styles: ButtonTheme.scopedSettings.Icon.styles }} text="Icon as IIconProps with styles" />
          {/* <Button
            icon={{ iconName: 'share' }}
            text={{ content: 'Text as ITextProps with styles', styles: ButtonTheme.scopedSettings.Text.styles }}
          /> */}
          <Button icon={{ iconName: 'share' }} styles={getButtonStyles} text="Button styles prop" />
          <Customizer {...ButtonTheme}>
            <Button icon={{ iconName: 'share' }} text="Button scopedSettings" />
          </Customizer>
        </VerticalStack>
        {/* <ButtonStack>
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
        <CommandBar items={[{ key: '0', text: 'Button 1', iconProps: { iconName: 'Upload' } }]} /> */}
      </VerticalStack>
    </div>
  </VerticalStack>
);

export class ButtonExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <VerticalStack gap={sectionGap}>
        <ButtonSet />
      </VerticalStack>
    );
  }
}
