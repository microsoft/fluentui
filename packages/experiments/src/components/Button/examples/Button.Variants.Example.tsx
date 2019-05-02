import * as React from 'react';
import {
  ActionButton,
  BaseButton,
  CommandBarButton,
  CompoundButton,
  DefaultButton,
  IconButton,
  MessageBarButton,
  PrimaryButton
} from '../index';
import { MenuButton } from '../MenuButton/index';
import { SplitButton, ISplitButtonProps } from '../SplitButton/index';
import { Stack, Text } from 'office-ui-fabric-react';

import {
  ActionButton as OldActionButton,
  BaseButton as OldBaseButton,
  CommandBarButton as OldCommandBarButton,
  CompoundButton as OldCompoundButton,
  DefaultButton as OldDefaultButton,
  IconButton as OldIconButton,
  MessageBarButton as OldMessageBarButton,
  PrimaryButton as OldPrimaryButton
} from 'office-ui-fabric-react';
import { css, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import {
  getStyles,
  IButtonBasicExampleStyleProps,
  IButtonBasicExampleStyles
} from 'office-ui-fabric-react/lib/components/Button/examples/Button.Basic.Example.styles';

const tokens = {
  sectionStack: {
    childrenGap: 32
  },
  buttonStack: {
    childrenGap: 12
  }
};

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal disableShrink tokens={tokens.buttonStack}>
    {props.children}
  </Stack>
);

// tslint:disable:jsx-no-lambda
export class ButtonVariantsExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const menuProps: ISplitButtonProps['menu'] = {
      items: [
        {
          key: 'a',
          name: 'Item a'
        },
        {
          key: 'b',
          name: 'Item b'
        }
      ]
    };

    const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
    const classNames = getClassNames(getStyles, {});

    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack tokens={tokens.buttonStack}>
          <ButtonStack>
            <OldDefaultButton text="Default button" />
            <OldDefaultButton text="Default button" iconProps={{ iconName: 'Upload' }} />
            <OldDefaultButton disabled text="Disabled default button" />
            <OldPrimaryButton text="Primary button" />
            <OldPrimaryButton disabled text="Disabled primary button" />
          </ButtonStack>
          <ButtonStack>
            <DefaultButton text="Default button" />
            <DefaultButton text="Default button" icon="Upload" />
            <DefaultButton disabled text="Disabled default button" />
            <PrimaryButton text="Primary button" />
            <PrimaryButton disabled text="Disabled primary button" />
          </ButtonStack>
          <ButtonStack>
            <BaseButton text="Base Button" />
            <BaseButton disabled text="Disabled Base Button" />
          </ButtonStack>
          <ButtonStack>
            <OldBaseButton text="Base Button" />
            <OldBaseButton disabled text="Disabled Base Button" />
          </ButtonStack>
          <ButtonStack>
            <OldActionButton text="Action button" />
            <OldActionButton disabled text="Disabled action button" />
          </ButtonStack>
          <ButtonStack>
            <ActionButton text="Action button" />
            <ActionButton disabled text="Disabled action button" />
          </ButtonStack>
          <ButtonStack>
            <OldCommandBarButton text="Command bar button" />
            <OldCommandBarButton disabled text="Disabled command bar button" />
          </ButtonStack>
          <ButtonStack>
            <CommandBarButton text="Command bar button" />
            <CommandBarButton disabled text="Disabled command bar button" />
          </ButtonStack>
          <ButtonStack>
            <OldCompoundButton text="Compound button" secondaryText="Enabled" />
            <OldCompoundButton primary text="Compound button" secondaryText="Primary Enabled" />
            <OldCompoundButton disabled text="Compound button" secondaryText="Disabled" />
            <OldCompoundButton primary disabled text="Compound button" secondaryText="Primary Disabled" />
          </ButtonStack>
          <ButtonStack>
            <CompoundButton text="Compound button" secondaryText="Enabled" />
            <CompoundButton primary text="Compound button" secondaryText="Primary Enabled" />
            <CompoundButton disabled text="Compound button" secondaryText="Disabled" />
            <CompoundButton primary disabled text="Compound button" secondaryText="Primary Disabled" />
          </ButtonStack>
          <ButtonStack>
            <Stack horizontal verticalAlign="center">
              <Text>Icon Button:</Text>
              <OldIconButton iconProps={{ iconName: 'Emoji2' }} />
              <OldIconButton disabled iconProps={{ iconName: 'Emoji2' }} />
            </Stack>
          </ButtonStack>
          <ButtonStack>
            <Stack horizontal verticalAlign="center">
              <Text>Icon Button:</Text>
              <IconButton iconProps={{ iconName: 'Emoji2' }} />
              <IconButton disabled iconProps={{ iconName: 'Emoji2' }} />
            </Stack>
          </ButtonStack>
          <ButtonStack>
            <OldMessageBarButton text="Message bar button" />
            <OldMessageBarButton disabled text="Disabled message bar button" />
          </ButtonStack>
          <ButtonStack>
            <MessageBarButton text="Message bar button" />
            <MessageBarButton disabled text="Disabled message bar button" />
          </ButtonStack>
          <ButtonStack>
            <OldDefaultButton text="Menu button" menuProps={menuProps} />
            <OldPrimaryButton primary text="Menu primary button" menuProps={menuProps} />
            <OldDefaultButton disabled text="Menu disabled button" menuProps={menuProps} />
          </ButtonStack>
          <ButtonStack>
            <MenuButton content="Menu button" menu={menuProps} />
            <MenuButton primary content="Menu primary button" menu={menuProps} />
            <MenuButton disabled content="Menu disabled button" menu={menuProps} />
          </ButtonStack>
          <ButtonStack>
            <div className={css(classNames.twoup)}>
              <div>
                <OldDefaultButton
                  data-automation-id="test"
                  text="Button"
                  split={true}
                  splitButtonAriaLabel={'See 2 sample options'}
                  aria-roledescription={'split button'}
                  styles={{ root: { height: '35px' } }}
                  onClick={undefined}
                  menuProps={{
                    items: [
                      {
                        key: 'emailMessage',
                        text: 'Email message',
                        iconProps: { iconName: 'Mail' }
                      },
                      {
                        key: 'calendarEvent',
                        text: 'Calendar event',
                        iconProps: { iconName: 'Calendar' }
                      }
                    ]
                  }}
                />
              </div>
            </div>
            <div className={css(classNames.twoup)}>
              <div>
                <OldDefaultButton
                  data-automation-id="test"
                  disabled={true}
                  allowDisabledFocus={true}
                  text="Button"
                  split={true}
                  aria-roledescription={'split button'}
                  styles={{ root: { height: '35px' } }}
                  onClick={undefined}
                  menuProps={{
                    items: [
                      {
                        key: 'emailMessage',
                        text: 'Email message',
                        iconProps: { iconName: 'Mail' }
                      },
                      {
                        key: 'calendarEvent',
                        text: 'Calendar event',
                        iconProps: { iconName: 'Calendar' }
                      }
                    ]
                  }}
                />
              </div>
            </div>
            <div className={css(classNames.twoup)}>
              <div>
                <OldDefaultButton
                  primary
                  data-automation-id="test"
                  text="Button"
                  split={true}
                  aria-roledescription={'split button'}
                  styles={{ root: { height: '35px' } }}
                  onClick={undefined}
                  menuProps={{
                    items: [
                      {
                        key: 'emailMessage',
                        text: 'Email message',
                        iconProps: { iconName: 'Mail' }
                      },
                      {
                        key: 'calendarEvent',
                        text: 'Calendar event',
                        iconProps: { iconName: 'Calendar' }
                      }
                    ]
                  }}
                />
              </div>
            </div>
            <div className={css(classNames.twoup)}>
              <div>
                <OldDefaultButton
                  primary
                  iconProps={{ iconName: 'Add' }}
                  data-automation-id="test"
                  disabled={true}
                  allowDisabledFocus={true}
                  text="Button"
                  split={true}
                  aria-roledescription={'split button'}
                  styles={{ root: { height: '35px' } }}
                  onClick={undefined}
                  menuProps={{
                    items: [
                      {
                        key: 'emailMessage',
                        text: 'Email message',
                        iconProps: { iconName: 'Mail' }
                      },
                      {
                        key: 'calendarEvent',
                        text: 'Calendar event',
                        iconProps: { iconName: 'Calendar' }
                      }
                    ]
                  }}
                />
              </div>
            </div>
            <div className={css(classNames.twoup)}>
              <div>
                <OldDefaultButton
                  data-automation-id="test"
                  primaryDisabled={true}
                  text="Button"
                  split={true}
                  aria-roledescription={'split button'}
                  styles={{ root: { height: '35px' } }}
                  onClick={undefined}
                  menuProps={{
                    items: [
                      {
                        key: 'emailMessage',
                        text: 'Email message',
                        iconProps: { iconName: 'Mail' }
                      },
                      {
                        key: 'calendarEvent',
                        text: 'Calendar event',
                        iconProps: { iconName: 'Calendar' }
                      }
                    ]
                  }}
                />
              </div>
            </div>
            <div className={css(classNames.twoup)}>
              <div>
                <OldDefaultButton
                  primary
                  data-automation-id="test"
                  primaryDisabled={true}
                  text="Button"
                  split={true}
                  aria-roledescription={'split button'}
                  styles={{ root: { height: '35px' } }}
                  onClick={undefined}
                  menuProps={{
                    items: [
                      {
                        key: 'emailMessage',
                        text: 'Email message',
                        iconProps: { iconName: 'Mail' }
                      },
                      {
                        key: 'calendarEvent',
                        text: 'Calendar event',
                        iconProps: { iconName: 'Calendar' }
                      }
                    ]
                  }}
                />
              </div>
            </div>
          </ButtonStack>
          <ButtonStack>
            <SplitButton content="Button" menu={menuProps} />
            <SplitButton disabled content="Button" menu={menuProps} />
            <SplitButton primary content="Button" menu={menuProps} />
            <SplitButton disabled primary icon="Add" content="Button" menu={menuProps} />
            <SplitButton primaryActionDisabled content="Button" menu={menuProps} />
            <SplitButton primaryActionDisabled primary content="Button" menu={menuProps} />
          </ButtonStack>
        </Stack>
      </Stack>
    );
  }
}
