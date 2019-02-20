import FluentTheme from '../FluentTheme';
import { getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

// TODO: "any" is used here to get around "is using xxx but cannot be named" TS error. Should be able to remove
//        this 'any' once we upgrade to TS3.1+
// tslint:disable-next-line:no-any
export const CommandBarButtonStyles: Partial<IButtonStyles> = {
  root: {
    ...getFocusStyle(FluentTheme, 2)
  }
};
