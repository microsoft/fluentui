import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { testDrawerBaseScenarios } from '../../../../../react-drawer/library/src/e2e/DrawerShared';
import { Drawer, inlineDrawerClassNames, overlayDrawerClassNames } from './index';
import type { JSXElement } from '@fluentui/react-utilities';

const mountFluent = (element: JSXElement) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

describe('Drawer', () => {
  testDrawerBaseScenarios(Drawer);

  describe('type prop', () => {
    it('should render OverlayDrawer by default', () => {
      mountFluent(<Drawer id="drawer" open />);

      cy.get(`.${overlayDrawerClassNames.root}`).should('exist');
    });

    it('should render InlineDrawer when type is `inline`', () => {
      mountFluent(<Drawer id="drawer" type="inline" open />);

      cy.get(`.${inlineDrawerClassNames.root}`).should('exist');
    });
  });
});
