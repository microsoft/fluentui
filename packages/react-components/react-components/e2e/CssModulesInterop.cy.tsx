import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { createDOMRenderer, RendererProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import type { Theme } from '@fluentui/react-components';
import buttonCss from '../../react-button/library/src/components/Button/Button.module.css';
import { InteropApp } from './fixtures/InteropApp';
import type { InteropAppProps } from './fixtures/InteropApp';

const nonce = 'css-modules-interop';
const subject = '[data-testid="subject"]';
const wrapped = '[data-testid="wrapped"]';

function expectCssModulesButton(selector: string) {
  cy.get(selector)
    .should('have.class', 'fui-Button')
    .and('have.class', buttonCss.root)
    .and('have.class', buttonCss.primary);
}

function mountApp(props: Omit<InteropAppProps, 'targetDocument'> = {}, explicitRenderer = true) {
  return cy.document().then(targetDocument => {
    const app = <InteropApp {...props} targetDocument={targetDocument} />;
    if (!explicitRenderer) {
      return mount(app);
    }

    const renderer = createDOMRenderer(targetDocument, { styleElementAttributes: { nonce } });
    return mount(
      <RendererProvider renderer={renderer} targetDocument={targetDocument}>
        {app}
      </RendererProvider>,
    );
  });
}

function expectColor(
  selector: string,
  property: 'color' | 'background-color' | 'border-top-color',
  token: keyof Theme,
  theme: Theme = webLightTheme,
) {
  cy.get<HTMLElement>(selector).should($elements => {
    const element = $elements[0];
    const targetDocument = element.ownerDocument;
    const view = targetDocument.defaultView;
    if (!view) {
      throw new Error('The component document has no window.');
    }
    const tokenValue = theme[token];
    if (typeof tokenValue !== 'string') {
      throw new Error(`Expected a string color value for theme token ${token}.`);
    }
    const computed = view.getComputedStyle(element);
    expect(computed.getPropertyValue(`--${token}`).trim(), `${selector}: --${token}`).to.equal(tokenValue);

    const probe = targetDocument.createElement('span');
    probe.style.color = tokenValue;
    targetDocument.body.appendChild(probe);
    const expected = view.getComputedStyle(probe).color;
    probe.remove();
    expect(computed.getPropertyValue(property), `${selector}: ${property}`).to.equal(expected);
  });
}

function setMotion(value?: 'reduce' | 'no-preference') {
  return cy.then(() =>
    Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: { features: value ? [{ name: 'prefers-reduced-motion', value }] : [] },
    }),
  );
}

describe('CSS Modules components in a Griffel application', () => {
  beforeEach(() => {
    setMotion('no-preference');
    cy.get('body').realHover({ position: 'bottomRight' });
  });

  afterEach(() => {
    cy.get('body').realMouseUp({ position: 'bottomRight' });
    setMotion();
  });

  it('renders components with their CSS Modules styles', () => {
    mountApp();
    expectCssModulesButton(subject);
    expectColor(subject, 'background-color', 'colorBrandBackground');
    expectColor(subject, 'color', 'colorNeutralForegroundOnBrand');
    cy.get(subject).realHover();
    expectColor(subject, 'background-color', 'colorBrandBackgroundHover');
  });

  for (const override of ['griffel', 'class-name'] as const) {
    it(`applies ${override} overrides at rest, hover, pressed and keyboard focus`, () => {
      mountApp({ override });
      expectCssModulesButton(subject);
      expectColor(subject, 'background-color', 'colorPaletteBerryBackground2');
      expectColor(subject, 'color', 'colorPaletteBerryForeground2');
      cy.get(`${subject} .fui-Button__icon`)
        .should('have.css', 'font-size', webLightTheme.fontSizeBase600)
        .and('have.css', 'margin-inline-start', webLightTheme.spacingHorizontalL);

      cy.get(subject).realHover();
      expectColor(subject, 'background-color', 'colorPaletteBlueBackground2');
      cy.get(subject).realMouseDown();
      expectColor(subject, 'background-color', 'colorPaletteGreenBackground2');
      cy.get(subject).realMouseUp();
      cy.get('body').realHover({ position: 'bottomRight' });

      cy.get('[data-testid="keyboard-start"]').focus();
      cy.realPress('Tab');
      cy.get(subject).should('be.focused').and('have.attr', 'data-fui-focus-visible');
      expectColor(subject, 'border-top-color', 'colorBrandStroke1');
      cy.get(subject).should('not.have.css', 'outline-style', 'none');
    });
  }

  it('runs inherited Griffel custom style hooks without dropping component classes', () => {
    mountApp({ customHook: true });
    expectCssModulesButton(subject);
    expectCssModulesButton('[data-testid="nested-button"]');
    expectColor(subject, 'background-color', 'colorPaletteRedBackground2');
    cy.get(`${subject} .fui-Button__icon`).should('have.css', 'font-weight', String(webLightTheme.fontWeightBold));
    expectColor('[data-testid="nested-button"]', 'background-color', 'colorPaletteRedBackground2');
    cy.get('[data-testid="open-popover"]').realClick();
    cy.get('[data-testid="surface"]').should('be.visible');
    expectColor('[data-testid="surface"]', 'background-color', 'colorPaletteBerryBackground2');
    expectColor('[data-testid="portal-button"]', 'background-color', 'colorPaletteRedBackground2');
    cy.get('[data-testid="nested"]').find('[data-testid="surface"]').should('not.exist');
  });

  it('lets a Griffel caller className win over a Griffel custom style hook', () => {
    mountApp({ customHook: true, callerOverride: 'griffel' });
    expectColor(subject, 'background-color', 'colorPaletteGreenBackground2');
  });

  it('characterizes a plain CSS caller className losing to a later-inserted Griffel hook', () => {
    mountApp({ customHook: true, callerOverride: 'plain-css' });
    expectColor(subject, 'background-color', 'colorPaletteRedBackground2');
  });

  it('lets a plain CSS caller className win over component styles of equal specificity', () => {
    mountApp({ callerOverride: 'plain-css' });
    expectColor(subject, 'background-color', 'colorPaletteGreenBackground2');
  });

  it('applies app wrapper Griffel styles and custom class names on top of component styles', () => {
    mountApp();
    expectCssModulesButton(wrapped);
    expectColor(wrapped, 'background-color', 'colorPaletteBerryBackground2');
    cy.get(wrapped).should('have.css', 'font-weight', String(webLightTheme.fontWeightBold));
    // As with Griffel components, a base-only app override loses to the component's more specific hover state.
    cy.get(wrapped).realHover();
    expectColor(wrapped, 'background-color', 'colorBrandBackgroundHover');
  });

  for (const dir of ['ltr', 'rtl'] as const) {
    it(`updates nested themes and portaled app overrides in ${dir}`, () => {
      mountApp({ dir });
      expectColor('[data-testid="nested-button"]', 'background-color', 'colorBrandBackground');
      cy.get('[data-testid="open-popover"]').realClick();
      expectColor('[data-testid="surface"]', 'background-color', 'colorPaletteBerryBackground2');
      expectColor('[data-testid="portal-button"]', 'background-color', 'colorBrandBackground');
      cy.get('[data-testid="surface"]').should('have.css', 'direction', dir);

      cy.get('[data-testid="toggle-theme"]').click();
      cy.get('[data-testid="open-popover"]').realClick();
      expectColor('[data-testid="nested-button"]', 'background-color', 'colorBrandBackground', webDarkTheme);
      expectColor('[data-testid="surface"]', 'background-color', 'colorPaletteBerryBackground2', webDarkTheme);
      expectColor('[data-testid="portal-button"]', 'background-color', 'colorBrandBackground', webDarkTheme);
      expectColor(subject, 'background-color', 'colorBrandBackground');
    });
  }

  it('keeps native-disabled and focusable-disabled controls non-activating', () => {
    mountApp({ onActivate: cy.stub().as('activate') });
    cy.get('[data-testid="disabled"]').should('be.disabled').realClick();
    cy.get('[data-testid="disabled-focusable"]').focus().should('have.attr', 'aria-disabled', 'true');
    cy.realPress('Enter');
    cy.get('@activate').should('not.have.been.called');
  });

  it('propagates the renderer nonce to runtime styles and cleans up theme tags on unmount', () => {
    mountApp({ override: 'griffel' });
    cy.get(`head style[data-make-styles-bucket][nonce="${nonce}"]`).should('exist');
    cy.get<HTMLStyleElement>(`head style[nonce="${nonce}"]:not([data-make-styles-bucket])`).then($styles => {
      expect($styles.length).to.be.greaterThan(0);
      const ids = [...$styles].map(style => style.id);
      cy.get('[data-testid="toggle-theme"]').click().click();
      cy.get(`head style[nonce="${nonce}"]:not([data-make-styles-bucket])`).should('have.length', ids.length);
      cy.then(() => mount(<div>Unmounted</div>));
      cy.document().should(targetDocument => {
        for (const id of ids) {
          expect(targetDocument.getElementById(id), `removed theme tag ${id}`).to.equal(null);
        }
      });
    });
  });

  it('also supports the default renderer when the app has no explicit RendererProvider', () => {
    mountApp({ override: 'griffel' }, false);
    expectColor(subject, 'background-color', 'colorPaletteBerryBackground2');
  });

  it('keeps caller hover overrides under reduced motion', () => {
    setMotion('reduce');
    mountApp({ override: 'griffel' });
    cy.get(subject).realHover();
    expectColor(subject, 'background-color', 'colorPaletteBlueBackground2');
  });
});
