import * as React from 'react';
import { Button, IButtonProps, Stack } from '@uifabric/experiments';
import { createTheme, Spinner } from 'office-ui-fabric-react';

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu: IButtonProps['menu'] = render => render((MenuType, props) => <MenuType {...props} items={menuItems} />);

const sectionGap = 32;

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

// tslint:disable:jsx-no-lambda
export class ButtonTokensExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const ButtonSet = (props: IButtonProps) => (
      <Stack horizontal preventShrink verticalAlign="center" gap={8}>
        <Button {...props} />
        <Button {...props} primary />
        <Button {...props} disabled />
        <Button
          {...props}
          tokens={{
            backgroundColor: 'red',
            backgroundColorHovered: 'pink',
            color: 'white',
            colorHovered: 'white',
            iconColor: 'white',
            iconColorHovered: 'white'
          }}
        />
      </Stack>
    );

    return (
      <Stack gap={sectionGap}>
        <ButtonSet />
        <ButtonSet content="No Icon" />
        <ButtonSet content={<Spinner />} />
        <ButtonSet icon="upload" content="Button with Icon" />
        <ButtonSet icon="upload" href="http://www.microsoft.com" content="Button with href" />
        <ButtonSet circular />
        <ButtonSet circular icon="share" />
        <ButtonSet
          icon={render => render((IconType, iconProps) => <IconType {...iconProps} iconName="upload" />)}
          content="Menu button with icon"
          menu={buttonMenu}
        />
        <Stack horizontal preventShrink verticalAlign="center" gap={8}>
          <Button
            primary
            icon="PeopleAdd"
            content="Token Function: Red BG, White Text"
            tokens={(props, theme) =>
              props.primary && {
                backgroundColor: 'red',
                backgroundColorHovered: 'pink',
                color: 'white',
                colorHovered: 'white',
                iconColor: 'white',
                iconColorHovered: 'white'
              }
            }
          />
          <Button
            icon="PeopleAdd"
            content="Token Function: Red Icon (via theme), Purple Text"
            theme={testTheme}
            tokens={(props, theme) => ({
              color: theme.fonts.medium.color
            })}
          />
        </Stack>
      </Stack>
    );
  }
}
