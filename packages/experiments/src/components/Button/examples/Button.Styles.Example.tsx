import * as React from 'react';
import { Button } from '../index';
import { Stack } from '@uifabric/experiments';
import { createTheme } from 'office-ui-fabric-react';

const testTheme = createTheme({
  semanticColors: {
    buttonText: 'red'
  }
});

const sectionGap = 32;
const headingGap = 16;
const buttonGap = 12;

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal gap={buttonGap}>
    {props.children}
  </Stack>
);

export class ButtonStylesExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack gap={sectionGap}>
        <Stack gap={headingGap} padding={8}>
          <div>
            <Stack gap={buttonGap}>
              <ButtonStack>
                <Button icon="share" content="Button Theme: Red Icon and Text" theme={testTheme} />
              </ButtonStack>
              <ButtonStack>
                {/* TODO: Should these work? TBD. They won't work with current approach since styles are resolved
                            with theme in createComponent before themes in slot props are available. */}
                <Button icon={{ iconName: "share", theme: testTheme }} content="Slot Theme: Red Icon" />
                <Button icon="share" content={{ children: "Slot Theme: Red Text", theme: testTheme }} />
              </ButtonStack>
              <ButtonStack>
                <Button icon="PeopleAdd" content="Button Styles Object: Pink Icon" styles={{ icon: { color: 'pink ' } }} />
                <Button icon={{ iconName: "PeopleAdd", styles: { root: { color: 'pink ' } } }} content="Icon Styles Object: Pink Icon" />
              </ButtonStack>
              <ButtonStack>
                <Button
                  content="Button Styles Function: Theme.warningHighlight Content"
                  // styles={(props, theme) => ({ content: { color: theme.semanticColors.warningHighlight } })}
                  styles={(props, theme) => {
                    console.log('Button styles function called');
                    return { content: { color: theme.semanticColors.warningHighlight } };
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  renderTestButton
                  button={{
                    content: "Nested Button Styles Function: Theme.warningHighlight Content",
                    styles: (props, theme) => {
                      console.log('Nested button styles function called');
                      return { content: { color: theme.semanticColors.warningHighlight } };
                    }
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  content={{
                    children: "Content Styles Function: Theme.warningHighlight Text",
                    // styles: (props, theme) => ({ root: { color: theme.semanticColors.warningHighlight } })
                    // TODO: This styles generates a console error "Invalid styles prop on span tag".
                    //         Some props not getting removed somewhere.
                    styles: (props, theme) => {
                      console.log('Text styles function called');
                      return { root: { color: theme.semanticColors.warningHighlight } };
                    }
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon={{
                    iconName: "PeopleAdd",
                    // TODO: why is this not working? theme is not available in Icon styles function
                    // TODO: this function also gets called twice.. seems like it should only be called once.
                    // styles: (props) => ({ root: { color: props.theme.semanticColors.warningHighlight } })
                    styles: (props, themeArg) => {
                      const theme = themeArg || props.theme;
                      console.log('Icon styles function called');
                      // console.log('styles function theme: ' + JSON.stringify(theme));
                      // return { root: { color: theme.semanticColors.warningHighlight } };
                      return {};
                    }
                  }}
                  content="Icon Styles Function: Theme.warningHighlight Icon"
                />
              </ButtonStack>
            </Stack>
          </div>
        </Stack>
      </Stack>
    );
  }
}
