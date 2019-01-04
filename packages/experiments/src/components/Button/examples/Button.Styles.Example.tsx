import * as React from 'react';
import { Button } from '../index';
import { Stack } from '@uifabric/experiments';
import { createTheme, ContextualMenu, IContextualMenuProps } from 'office-ui-fabric-react';

const testTheme = createTheme({
  semanticColors: {
    buttonText: 'red'
  },
  fonts: {
    medium: {
      color: 'purple'
    }
  }
});

const sectionGap = 32;
const headingGap = 16;
const buttonGap = 12;

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu = (props: IContextualMenuProps) => <ContextualMenu {...props} items={menuItems} />;

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal gap={buttonGap}>
    {props.children}
  </Stack>
);

// tslint:disable:jsx-no-lambda
export class ButtonStylesExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack gap={sectionGap}>
        <Stack gap={headingGap} padding={8}>
          <div>
            <Stack gap={buttonGap}>
              <ButtonStack>
                <Button icon="PeopleAdd" content="Button Theme: Red Icon and Text" theme={testTheme} />
                <Button icon="PeopleAdd" content={{ children: 'Slot Theme: Purple Text', theme: testTheme }} />
              </ButtonStack>
              <ButtonStack>
                <Button icon="PeopleAdd" content="Button Styles Object: Pink Icon" styles={{ icon: { color: 'pink ' } }} />
                <Button icon={{ iconName: 'PeopleAdd', styles: { root: { color: 'pink ' } } }} content="Icon Styles Object: Pink Icon" />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content="Button Styles Function: Theme.warningHighlight Content"
                  styles={(props, theme) => {
                    console.log('Button styles function called');
                    return { content: { color: theme.semanticColors.warningHighlight } };
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content="Button Styles Function: Purple Icon via Button Theme"
                  styles={(props, theme) => ({ icon: { color: theme.fonts.medium.color } })}
                  theme={testTheme}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  renderTestButton
                  button={{
                    content: 'Nested Button Styles Function: Theme.warningHighlight Content',
                    styles: (props, theme) => {
                      console.log('Nested button styles function called');
                      return { content: { color: theme.semanticColors.warningHighlight } };
                    }
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content={{
                    children: 'Content Styles Function: Theme.warningHighlight Text',
                    styles: (props, theme) => {
                      console.log('Text styles function called');
                      return { root: { color: theme.semanticColors.warningHighlight } };
                    }
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content={{
                    children: 'Content Styles Function: Red Text via Content Theme',
                    styles: (props, theme) => {
                      console.log('Text styles function with custom theme called');
                      return { root: { color: theme.semanticColors.buttonText } };
                    },
                    theme: testTheme
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon={{
                    iconName: 'PeopleAdd',
                    styles: props => {
                      console.log('Icon styles function called');
                      return { root: { color: props.theme!.semanticColors.warningHighlight } };
                    }
                  }}
                  content="Icon Styles Function: Theme.warningHighlight Icon"
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon={{
                    iconName: 'PeopleAdd',
                    styles: props => {
                      console.log('Icon styles function with custom theme called');
                      return { root: { color: props.theme!.semanticColors.buttonText } };
                    },
                    theme: testTheme
                  }}
                  content="Icon Styles Function: Red Icon via Icon Theme"
                />
              </ButtonStack>
              <ButtonStack>
                <Button content="Button Classname" className="button-classname" />
                <Button
                  content="Icon Classname"
                  icon={{
                    iconName: 'PeopleAdd',
                    className: 'icon-classname'
                  }}
                />
                <Button
                  content={{
                    children: 'Content Classname',
                    className: 'content-classname'
                  }}
                />
                <Button
                  content="All Classnames"
                  icon="PeopleAdd"
                  menu={buttonMenu}
                  styles={{
                    root: 'root-classname',
                    stack: 'stack-classname',
                    content: 'content-classname',
                    icon: 'image-classname',
                    menu: 'menu-classname',
                    menuIcon: 'menu-classname'
                  }}
                />
              </ButtonStack>
            </Stack>
          </div>
        </Stack>
      </Stack>
    );
  }
}
