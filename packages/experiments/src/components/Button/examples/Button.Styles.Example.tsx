import * as React from 'react';
import { Button, MenuButton, IMenuButtonProps } from '@uifabric/experiments';
import { createTheme, mergeStyles, Stack } from 'office-ui-fabric-react';

const testTheme = createTheme({
  semanticColors: {
    buttonText: '#E20000'
  },
  fonts: {
    medium: {
      color: 'purple'
    }
  }
});

const tokens = {
  sectionStack: {
    childrenGap: 32
  },
  headingStack: {
    childrenGap: 16,
    padding: 8
  },
  buttonStack: {
    childrenGap: 12
  }
};

const menuProps: IMenuButtonProps['menu'] = {
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

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal disableShrink tokens={tokens.buttonStack}>
    {props.children}
  </Stack>
);

// tslint:disable:jsx-no-lambda
export class ButtonStylesExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const testClassName = mergeStyles({ color: 'blue' });

    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack tokens={tokens.headingStack}>
          <div>
            <Stack tokens={tokens.buttonStack}>
              <ButtonStack>
                <Button icon="PeopleAdd" content="Button Theme: Red Icon and Text" theme={testTheme} />
                <Button icon="PeopleAdd" content={{ children: 'Slot Theme: Purple Text', theme: testTheme }} />
              </ButtonStack>
              <ButtonStack>
                <Button icon="PeopleAdd" content="Button Styles Object: Red Text (root)" styles={{ root: { color: '#E20000' } }} />
                <Button icon="PeopleAdd" content="Button Styles Object: Red Text (content)" styles={{ content: { color: '#E20000' } }} />
              </ButtonStack>
              <ButtonStack>
                <Button icon="PeopleAdd" content="Button Styles Object: Pink Icon" styles={{ icon: { color: 'pink ' } }} />
                <Button icon={{ iconName: 'PeopleAdd', style: { color: 'pink ' } }} content="Icon Style Object: Pink Icon" />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content="Button Styles Function: Golden Brown Content"
                  styles={(props, theme) => ({ content: { color: '#8F6800' } })}
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
                    children: 'Content Styles Function: Golden Brown Text',
                    styles: (props, theme) => ({ root: { color: '#8F6800' } })
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
                <MenuButton
                  content="All Classnames"
                  icon="PeopleAdd"
                  menu={menuProps}
                  styles={{
                    root: 'root-classname',
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
                      color: '#E20000'
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
                    styles: { root: { color: '#E20000' } },
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
                  content="Icon Style Overrides ClassName: Red Icon"
                  icon={{
                    iconName: 'PeopleAdd',
                    style: { color: '#E20000' },
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
