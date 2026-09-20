/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { DrawerProvider } from '@fluentui/react-headless-components-preview/drawer';
import type { DrawerContextValue } from '@fluentui/react-headless-components-preview/drawer';
import { MotionRefForwarder } from '@fluentui/react-motion';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  renderDrawer as renderDrawerBase,
  renderDrawerBody as renderDrawerBodyBase,
  renderDrawerFooter as renderDrawerFooterBase,
  renderDrawerHeader as renderDrawerHeaderBase,
  renderDrawerHeaderNavigation as renderDrawerHeaderNavigationBase,
  renderDrawerHeaderTitle as renderDrawerHeaderTitleBase,
} from '@fluentui/react-headless-components-preview/drawer';
import type {
  DrawerBodyState,
  DrawerFooterState,
  DrawerHeaderNavigationState,
  DrawerHeaderState,
  DrawerHeaderTitleState,
  DrawerState,
  InlineDrawerInternalSlots,
  InlineDrawerState,
  OverlayDrawerInternalSlots,
  OverlayDrawerState,
} from './Drawer.types';

export const renderDrawer = renderDrawerBase as (state: DrawerState) => JSXElement;

export const renderOverlayDrawer = (state: OverlayDrawerState, contextValue: DrawerContextValue): JSXElement => {
  assertSlots<OverlayDrawerInternalSlots>(state);

  return (
    <DrawerProvider value={contextValue}>
      <state.dialog>
        <state.surfaceMotion>
          <MotionRefForwarder>
            <state.root />
          </MotionRefForwarder>
        </state.surfaceMotion>
      </state.dialog>
    </DrawerProvider>
  );
};

export const renderInlineDrawer = (state: InlineDrawerState, contextValue: DrawerContextValue): JSXElement => {
  assertSlots<InlineDrawerInternalSlots>(state);

  return (
    <DrawerProvider value={contextValue}>
      <state.surfaceMotion>
        <state.root />
      </state.surfaceMotion>
    </DrawerProvider>
  );
};

export const renderDrawerBody = renderDrawerBodyBase as (state: DrawerBodyState) => JSXElement;
export const renderDrawerHeader = renderDrawerHeaderBase as (state: DrawerHeaderState) => JSXElement;
export const renderDrawerHeaderTitle = renderDrawerHeaderTitleBase as (state: DrawerHeaderTitleState) => JSXElement;
export const renderDrawerHeaderNavigation = renderDrawerHeaderNavigationBase as (
  state: DrawerHeaderNavigationState,
) => JSXElement;
export const renderDrawerFooter = renderDrawerFooterBase as (state: DrawerFooterState) => JSXElement;
