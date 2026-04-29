import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import type { JSXElement } from '@fluentui/react-utilities';

import { Provider } from '../Provider';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderNavigation,
  DrawerHeaderTitle,
  InlineDrawer,
  OverlayDrawer,
} from '.';
import type { DrawerProps, InlineDrawerProps, OverlayDrawerProps } from '.';

const drawerSelector = '#drawer';
const drawerBodySelector = '#drawer-body';
const drawerHeaderSelector = '#drawer-header';
const drawerFooterSelector = '#drawer-footer';
const drawerTitleSelector = '#drawer-title';
const drawerNavigationSelector = '#drawer-navigation';

const mount = (element: JSXElement) => mountBase(<Provider>{element}</Provider>);

const overlayDrawerClassName =
  'fixed bottom-0 right-0 top-0 m-0 w-80 border-0 border-l border-zinc-200 bg-white p-0 shadow-xl backdrop:bg-black/40';
const inlineDrawerClassName = 'w-80 border-r border-zinc-200 bg-white';

type DrawerComponent = typeof Drawer | typeof OverlayDrawer | typeof InlineDrawer;

type DrawerComponentProps = Pick<DrawerProps, 'open' | 'position' | 'unmountOnClose'> &
  Pick<InlineDrawerProps, 'separator'> &
  Pick<OverlayDrawerProps, 'modalType' | 'onOpenChange'>;

const getClassName = (Component: DrawerComponent) =>
  Component === InlineDrawer ? inlineDrawerClassName : overlayDrawerClassName;

const isInlineDrawerComponent = (Component: DrawerComponent) => Component === InlineDrawer;

const renderDrawer = (Component: DrawerComponent, props: DrawerComponentProps = {}) => (
  <Component
    id="drawer"
    className={getClassName(Component)}
    {...(props as DrawerProps & OverlayDrawerProps & InlineDrawerProps)}
  >
    Drawer content
  </Component>
);

function testDrawerBaseScenarios(Component: DrawerComponent): void {
  describe('basic functionality', () => {
    it('should not render any element when closed', () => {
      mount(renderDrawer(Component));

      cy.get(drawerSelector).should('not.exist');
    });

    it('should render an element when opened', () => {
      mount(renderDrawer(Component, { open: true }));

      cy.get(drawerSelector).should('exist');
    });

    it('should render children content', () => {
      mount(renderDrawer(Component, { open: true }));

      cy.get(drawerSelector).contains('Drawer content');
    });

    it('should toggle visibility on open prop change', () => {
      const ExampleDrawer = () => {
        const [open, setOpen] = React.useState(false);

        return (
          <>
            {renderDrawer(Component, { open })}
            <button id="button" onClick={() => setOpen(true)}>
              Open
            </button>
          </>
        );
      };

      mount(<ExampleDrawer />);

      cy.get(drawerSelector).should('not.exist');
      cy.get('#button').realClick();
      cy.get(drawerSelector).should('exist');
    });

    it('should remain mounted after close when unmountOnClose is false', () => {
      mount(renderDrawer(Component, { unmountOnClose: false }));

      cy.get(drawerSelector).should('exist');
      if (isInlineDrawerComponent(Component)) {
        cy.get(drawerSelector).should('have.attr', 'aria-hidden', 'true');
      } else {
        cy.get(drawerSelector).should('not.have.attr', 'open');
      }
    });
  });

  describe('data attributes', () => {
    it('should set default drawer data attributes', () => {
      mount(renderDrawer(Component, { open: true }));

      cy.get(drawerSelector).should('have.attr', 'data-open');
      cy.get(drawerSelector).should('have.attr', 'data-position', 'start');
    });

    it('should set position data attribute', () => {
      mount(renderDrawer(Component, { open: true, position: 'end' }));

      cy.get(drawerSelector).should('have.attr', 'data-position', 'end');
    });
  });
}

function assertScrollPosition(element: HTMLElement, position: number) {
  expect(element.scrollTop).to.equal(position);
}

describe('Drawer', () => {
  testDrawerBaseScenarios(Drawer);

  describe('type prop', () => {
    it('should render OverlayDrawer by default', () => {
      mount(renderDrawer(Drawer, { open: true }));

      cy.get(drawerSelector).should('match', 'dialog');
      cy.get(drawerSelector).should('have.attr', 'aria-modal', 'true');
    });

    it('should render InlineDrawer when type is `inline`', () => {
      mount(<Drawer id="drawer" type="inline" className={inlineDrawerClassName} open />);

      cy.get(drawerSelector).should('match', 'div');
      cy.get(drawerSelector).should('not.have.attr', 'aria-modal');
    });
  });
});

describe('OverlayDrawer', () => {
  testDrawerBaseScenarios(OverlayDrawer);

  describe('modalType prop', () => {
    it('should render modal drawer by default', () => {
      mount(renderDrawer(OverlayDrawer, { open: true }));

      cy.get(drawerSelector).should('have.attr', 'aria-modal', 'true');
      cy.get(drawerSelector).should('have.attr', 'data-modal-type', 'modal');
    });

    it('should render alert drawer', () => {
      mount(renderDrawer(OverlayDrawer, { open: true, modalType: 'alert' }));

      cy.get(drawerSelector).should('have.attr', 'role', 'alertdialog');
      cy.get(drawerSelector).should('have.attr', 'data-modal-type', 'alert');
    });

    it('should render non-modal drawer without aria-modal', () => {
      mount(renderDrawer(OverlayDrawer, { open: true, modalType: 'non-modal' }));

      cy.get(drawerSelector).should('not.have.attr', 'aria-modal');
      cy.get(drawerSelector).should('have.attr', 'data-modal-type', 'non-modal');
    });

    it('should close with escape keydown', () => {
      const ExampleDrawer = () => {
        const [open, setOpen] = React.useState(true);

        return (
          <OverlayDrawer
            id="drawer"
            className={overlayDrawerClassName}
            open={open}
            onOpenChange={(_, data) => setOpen(data.open)}
            unmountOnClose
          >
            <button id="focus-target">Focusable content</button>
          </OverlayDrawer>
        );
      };

      mount(<ExampleDrawer />);

      cy.get(drawerSelector).should('exist');
      cy.get('#focus-target').focus().realType('{esc}');
      cy.get(drawerSelector).should('not.exist');
    });
  });
});

describe('DrawerBody', () => {
  it('should render drawer body and be scrollable', () => {
    mount(
      <DrawerBody id="drawer-body" style={{ display: 'block', height: '100px', overflow: 'auto' }}>
        {Array.from({ length: 30 }, (_, index) => (
          <p key={index}>Scrollable drawer content</p>
        ))}
      </DrawerBody>,
    );

    cy.get(drawerBodySelector).should('exist');
    cy.get(drawerBodySelector)
      .scrollTo('bottom')
      .should($element => assertScrollPosition($element[0], $element[0].scrollHeight - $element[0].clientHeight));

    cy.get(drawerBodySelector)
      .scrollTo('top')
      .should($element => assertScrollPosition($element[0], 0));
  });

  it('updates scrollState when body is scrolled', () => {
    mount(
      <InlineDrawer id="drawer" className="block" open>
        <DrawerHeader id="drawer-header">Header</DrawerHeader>
        <DrawerBody id="drawer-body" style={{ display: 'block', height: '100px', overflow: 'auto' }}>
          {Array.from({ length: 30 }, (_, index) => (
            <p key={index}>Scrollable drawer content</p>
          ))}
        </DrawerBody>
        <DrawerFooter id="drawer-footer">Footer</DrawerFooter>
      </InlineDrawer>,
    );

    cy.get(drawerHeaderSelector).should('have.attr', 'data-scroll-state', 'top');
    cy.get(drawerFooterSelector).should('have.attr', 'data-scroll-state', 'top');
    cy.get(drawerBodySelector).scrollTo('bottom');
    cy.get(drawerHeaderSelector).should('have.attr', 'data-scroll-state', 'bottom');
    cy.get(drawerFooterSelector).should('have.attr', 'data-scroll-state', 'bottom');
  });
});

describe('DrawerHeader', () => {
  it('should render drawer header with correct tag name and content', () => {
    mount(<DrawerHeader id="drawer-header">Content</DrawerHeader>);

    cy.get(drawerHeaderSelector).should('exist');
    cy.get(drawerHeaderSelector).should('match', 'header');
    cy.get(drawerHeaderSelector).should('have.html', 'Content');
  });
});

describe('DrawerFooter', () => {
  it('should render drawer footer with correct tag name and content', () => {
    mount(<DrawerFooter id="drawer-footer">Content</DrawerFooter>);

    cy.get(drawerFooterSelector).should('exist');
    cy.get(drawerFooterSelector).should('match', 'footer');
    cy.get(drawerFooterSelector).should('have.html', 'Content');
  });
});

describe('DrawerHeaderTitle', () => {
  it('should render drawer title with correct tag name', () => {
    mount(<DrawerHeaderTitle id="drawer-title">Content</DrawerHeaderTitle>);

    cy.get(drawerTitleSelector).should('exist');
    cy.get(drawerTitleSelector).should('match', 'div');
  });

  it('should render children H2 tag by default', () => {
    mount(<DrawerHeaderTitle id="drawer-title">Content</DrawerHeaderTitle>);

    cy.get(drawerTitleSelector).contains('h2', 'Content');
  });

  it('should render different heading when provided', () => {
    mount(
      <DrawerHeaderTitle id="drawer-title" heading={{ as: 'h1' }}>
        Content
      </DrawerHeaderTitle>,
    );

    cy.get(drawerTitleSelector).contains('h1', 'Content');
  });

  it('should render action when provided', () => {
    mount(
      <DrawerHeaderTitle id="drawer-title" action={<button>Action</button>}>
        Content
      </DrawerHeaderTitle>,
    );

    cy.get(drawerTitleSelector).contains('h2', 'Content');
    cy.get(drawerTitleSelector).contains('button', 'Action');
  });

  it('should label overlay drawer through headless dialog context', () => {
    mount(
      <OverlayDrawer id="drawer" className={overlayDrawerClassName} open>
        <DrawerHeaderTitle id="drawer-title">Drawer title</DrawerHeaderTitle>
      </OverlayDrawer>,
    );

    cy.get(drawerSelector).should('have.attr', 'aria-labelledby');
    cy.get(drawerTitleSelector)
      .find('h2')
      .invoke('attr', 'id')
      .then(titleId => {
        cy.get(drawerSelector).should('have.attr', 'aria-labelledby', titleId);
      });
  });
});

describe('DrawerHeaderNavigation', () => {
  it('should render drawer nav with correct tag name and content', () => {
    mount(<DrawerHeaderNavigation id="drawer-navigation">Content</DrawerHeaderNavigation>);

    cy.get(drawerNavigationSelector).should('exist');
    cy.get(drawerNavigationSelector).should('match', 'nav');
    cy.get(drawerNavigationSelector).should('have.html', 'Content');
  });
});
