import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { Provider } from '@fluentui/react-headless-components-preview/provider';

import { testDrawerBaseScenarios } from '../../../../../../react-drawer/library/src/e2e/DrawerShared';
import { Drawer } from './index';
import { inlineDrawerClassNames } from '../InlineDrawer';
import { overlayDrawerClassNames } from '../OverlayDrawer';
import type { JSXElement } from '@fluentui/react-utilities';

const mountFluent = (element: JSXElement) => {
  mount(<Provider>{element}</Provider>);
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
