import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { testDrawerBaseScenarios } from '../../e2e/DrawerShared';
import { Drawer } from './Drawer';
import { overlayDrawerClassNames } from '../OverlayDrawer';
import { inlineDrawerClassNames } from '../InlineDrawer';
import { fuiSelector } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

/*
 * Roots keep selecting by identity, but `…ClassNames.root` is now the group marker
 * (`group/fui-overlay-drawer`), and `'.' + marker` is an invalid SELECTOR — the `/` is legal
 * in a class TOKEN but terminates the name in selector position. `fuiSelector()` escapes it,
 * and is not optional here (DECISIONS.md D16.5).
 */
const overlayDrawerSelector = fuiSelector(overlayDrawerClassNames.root);
const inlineDrawerSelector = fuiSelector(inlineDrawerClassNames.root);

const mountFluent = (element: JSXElement) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

describe('Drawer', () => {
  testDrawerBaseScenarios(Drawer);

  describe('type prop', () => {
    it('should render OverlayDrawer by default', () => {
      mountFluent(<Drawer id="drawer" open />);

      cy.get(overlayDrawerSelector).should('exist');
    });

    it('should render InlineDrawer when type is `inline`', () => {
      mountFluent(<Drawer id="drawer" type="inline" open />);

      cy.get(inlineDrawerSelector).should('exist');
    });
  });
});
