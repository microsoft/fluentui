import * as React from 'react';
import { Button, IButtonProps, Stack } from '@uifabric/experiments';
import { createTheme, mergeStyles } from 'office-ui-fabric-react';

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
const buttonMenu: IButtonProps['menu'] = render => render((MenuType, props) => <MenuType {...props} items={menuItems} />);

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal preventShrink gap={buttonGap}>
    {props.children}
  </Stack>
);

// tslint:disable:jsx-no-lambda
export class ButtonStylesExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const testClassName = mergeStyles({ color: 'blue' });

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
                <Button icon="PeopleAdd" content="Button Styles Object: Red Text (root)" styles={{ root: { color: 'red' } }} />
                <Button icon="PeopleAdd" content="Button Styles Object: Red Text (stack)" styles={{ stack: { color: 'red' } }} />
              </ButtonStack>
              <ButtonStack>
                <Button icon="PeopleAdd" content="Stack Styles Object: Red Text" stack={{ styles: { root: { color: 'red' } } }} />
              </ButtonStack>
              <ButtonStack>
                <Button icon="PeopleAdd" content="Button Styles Object: Pink Icon" styles={{ icon: { color: 'pink ' } }} />
                <Button icon={{ iconName: 'PeopleAdd', styles: { root: { color: 'pink ' } } }} content="Icon Styles Object: Pink Icon" />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content="Button Styles Function: Theme.warningHighlight Content"
                  styles={(props, theme) => ({ content: { color: theme.semanticColors.warningHighlight } })}
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
                  content={{
                    children: 'Content Styles Function: Theme.warningHighlight Text',
                    styles: (props, theme) => ({ root: { color: theme.semanticColors.warningHighlight } })
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content={{
                    children: 'Content Styles Function: Red Text via Content Theme',
                    styles: (props, theme) => ({ root: { color: theme.semanticColors.buttonText } }),
                    theme: testTheme
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon={{
                    iconName: 'PeopleAdd',
                    styles: props => ({ root: { color: props.theme!.semanticColors.warningHighlight } })
                  }}
                  content="Icon Styles Function: Theme.warningHighlight Icon"
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon={{
                    iconName: 'PeopleAdd',
                    styles: props => ({ root: { color: props.theme!.semanticColors.buttonText } }),
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
                    icon: 'icon-classname',
                    menu: 'menu-classname',
                    menuIcon: 'menuIcon-classname'
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  content="Icon ClassName Overrides Button Styles: Blue Icon"
                  styles={{
                    icon: {
                      color: 'red'
                    }
                  }}
                  icon={{
                    iconName: 'PeopleAdd',
                    className: testClassName
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content={{
                    children: 'Text ClassName: Blue Text',
                    className: testClassName
                  }}
                />
                <Button
                  icon="PeopleAdd"
                  content={{
                    children: 'Text Styles Overrides ClassName: Red Text',
                    styles: { root: { color: 'red' } },
                    className: testClassName
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  content="Icon ClassName: Blue Icon"
                  icon={{
                    iconName: 'PeopleAdd',
                    className: testClassName
                  }}
                />
                <Button
                  content="Icon Styles Overrides ClassName: Red Icon"
                  icon={{
                    iconName: 'PeopleAdd',
                    styles: { root: { color: 'red' } },
                    className: testClassName
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
