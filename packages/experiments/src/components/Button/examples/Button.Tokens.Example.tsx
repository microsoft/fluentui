import * as React from 'react';
import { Button } from '@uifabric/experiments';
import { createTheme, Stack } from 'office-ui-fabric-react';

const tokens = {
  sectionStack: {
    childrenGap: 32
  },
  buttonStack: {
    childrenGap: 8
  }
};

const testTheme = createTheme({
  semanticColors: {
    buttonText: '#E20000'
  },
  fonts: {
    small: {
      color: 'purple'
    }
  }
});

// tslint:disable:jsx-no-lambda
export class ButtonTokensExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack disableShrink horizontal tokens={tokens.buttonStack}>
        <Button
          primary
          icon="PeopleAdd"
          content="Token Function: Red BG, White Text"
          tokens={(props, theme) =>
            props.primary && {
              backgroundColor: '#E20000',
              backgroundColorHovered: 'pink',
              color: 'white',
              colorHovered: '#595959',
              iconColor: 'white',
              iconColorHovered: '#595959'
            }
          }
        />
        <Button
          icon="PeopleAdd"
          content="Token Function: Red Icon (via theme), Purple Text"
          theme={testTheme}
          tokens={(props, theme) => ({
            color: theme.fonts.small.color
          })}
        />
      </Stack>
    );
  }
}
