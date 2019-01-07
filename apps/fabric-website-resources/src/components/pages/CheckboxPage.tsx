import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { CheckboxPageProps } from 'office-ui-fabric-react/lib/components/Checkbox/Checkbox.doc';
import { loadTheme, IPartialTheme } from 'office-ui-fabric-react/lib/Styling';

const myTheme: IPartialTheme = {
  fonts: {
    medium: {
      fontSize: '30px'
    }
  },
  defaultFontStyle: {
    fontFamily: 'Segoe UI'
  }
};

loadTheme(myTheme, false);

export const CheckboxPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...CheckboxPageProps, ...props }} />;
