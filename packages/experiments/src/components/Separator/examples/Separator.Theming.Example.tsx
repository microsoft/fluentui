import * as React from 'react';
import { Separator } from '../Separator';
import { createTheme, ITheme } from 'office-ui-fabric-react';

const theme: ITheme = createTheme({
  fonts: {
    medium: {
      fontFamily: 'Monaco, Menlo, Consolas',
      fontSize: '30px'
    }
  }
});

export class SeparatorThemingExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const message = 'Today';

    return (
      <div>
        <p>Horizontal center aligned with custom theme</p>
        <Separator text={message} alignText="center" theme={theme} />
      </div>
    );
  }
}
