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

// TODO: document each of these cases (IStyle vs. IStyles interfaces) as to which work and why or why not:
//        is nesting styles from both component level and slot level possible?
//        styled component vs. foundation component limitations?
// {/* <Button
//   icon={{ styles: { background: "blue" } }} // adds the className with background: blue to className of component
//   //OR
//   icon={{
//     styles: {
//       root: { background: "blue" },
//       imageContainer: { border: "2px solid blue" }
//     }
//   }}
//   styles={{
//     icon: {
//       background: "blue" // className applied to icon root
//     },
//     // OR
//     icon: {
//       root: {
//         background: "blue"
//       },
//       imageContainer: {
//         border: "2px solid blue"
//       }
//     }
//   }}
// />; */}

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
                <Button icon="PeopleAdd" content="Button Styles Object: Red Text (root)" styles={{ root: { color: 'red' } }} />
                <Button icon="PeopleAdd" content="Button Styles Object: Red Text (stack)" styles={{ stack: { color: 'red' } }} />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content="Root Styles Object: Red Text"
                  // TODO: Callout: This line generates a TS error... by design. Intrinsic elements can't be passed styles props.
                  //        However this prevents mixing intrinsic elements and component props. This is done to ensure type safety.
                  //        Using 'style' or 'className' for intrinsic elements should be a good fallback for niche scenarios.
                  // root={{ styles: { color: 'red' } }}
                  root={{ style: { color: 'red' } }}
                />
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
                  renderTestButton
                  button={{
                    content: 'Nested Button Styles Function: Theme.warningHighlight Content',
                    styles: (props, theme) => ({ content: { color: theme.semanticColors.warningHighlight } })
                  }}
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
