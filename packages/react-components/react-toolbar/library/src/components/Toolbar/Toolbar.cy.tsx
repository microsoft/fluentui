import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { ToggleButton } from '@fluentui/react-button';
import { TextBoldRegular } from '@fluentui/react-icons';
import { readability } from '@ctrl/tinycolor';
import type { JSXElement } from '@fluentui/react-utilities';

import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarToggleButton,
  ToolbarRadioButton,
} from '@fluentui/react-toolbar';

const button = "[type='button']";

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('Toolbar', () => {
  describe('Navigation', () => {
    it('should navigate with arrows', () => {
      mount(
        <Toolbar>
          <ToolbarButton>First</ToolbarButton>
          <ToolbarButton>Second</ToolbarButton>
          <ToolbarButton>Third</ToolbarButton>
          <ToolbarButton>Fourth</ToolbarButton>
        </Toolbar>,
      );

      cy.get(button).eq(0).click();
      cy.get(button).eq(0).should('be.focused');

      cy.get(button).eq(0).type('{rightArrow}');
      cy.get(button).eq(1).should('be.focused');

      cy.get(button).eq(1).type('{downArrow}');
      cy.get(button).eq(2).should('be.focused');

      cy.get(button).eq(2).type('{upArrow}');
      cy.get(button).eq(1).should('be.focused');

      cy.get(button).eq(1).type('{leftArrow}');
      cy.get(button).eq(0).should('be.focused');
    });

    it('should have circular navigation', () => {
      mount(
        <Toolbar>
          <ToolbarButton>First</ToolbarButton>
          <ToolbarButton>Second</ToolbarButton>
          <ToolbarButton>Third</ToolbarButton>
          <ToolbarButton>Fourth</ToolbarButton>
        </Toolbar>,
      );

      cy.get(button).eq(3).click();
      cy.get(button).eq(3).should('be.focused');

      cy.get(button).eq(3).type('{rightArrow}');
      cy.get(button).eq(0).should('be.focused');

      cy.get(button).eq(0).type('{leftArrow}');
      cy.get(button).eq(3).should('be.focused');
    });
  });

  describe('Toggle Button', () => {
    it('should toggle button state on click', () => {
      mount(
        <Toolbar>
          <ToolbarToggleButton name="group" value="first">
            First
          </ToolbarToggleButton>
        </Toolbar>,
      );

      cy.get(button).eq(0).should('have.attr', 'aria-pressed', 'false');

      cy.get(button).eq(0).click();
      cy.get(button).eq(0).should('have.attr', 'aria-pressed', 'true');

      cy.get(button).eq(0).click();
      cy.get(button).eq(0).should('have.attr', 'aria-pressed', 'false');
    });

    it('should set default checked values', () => {
      mount(
        <Toolbar
          defaultCheckedValues={{
            group: ['first'],
          }}
        >
          <ToolbarToggleButton name="group" value="first">
            First
          </ToolbarToggleButton>
        </Toolbar>,
      );

      cy.get(button).eq(0).should('have.attr', 'aria-pressed', 'true');
    });
  });

  describe('Radio Button', () => {
    it('should toggle button state on click', () => {
      mount(
        <Toolbar>
          <ToolbarRadioButton name="group" value="first">
            First
          </ToolbarRadioButton>
        </Toolbar>,
      );

      cy.get(button).eq(0).should('have.attr', 'aria-checked', 'false');

      cy.get(button).eq(0).click();
      cy.get(button).eq(0).should('have.attr', 'aria-checked', 'true');

      cy.get(button).eq(0).click();
      cy.get(button).eq(0).should('have.attr', 'aria-checked', 'true');
    });

    it('should set default checked values', () => {
      mount(
        <Toolbar
          defaultCheckedValues={{
            group: ['first'],
          }}
        >
          <ToolbarRadioButton name="group" value="first">
            First
          </ToolbarRadioButton>
        </Toolbar>,
      );

      cy.get(button).eq(0).should('have.attr', 'aria-checked', 'true');
    });

    it('should check new value and uncheck previously checked', () => {
      mount(
        <Toolbar
          defaultCheckedValues={{
            group: ['first'],
          }}
        >
          <ToolbarRadioButton name="group" value="first">
            First
          </ToolbarRadioButton>
          <ToolbarRadioButton name="group" value="second">
            Second
          </ToolbarRadioButton>
        </Toolbar>,
      );

      cy.get(button).eq(0).should('have.attr', 'aria-checked', 'true');
      cy.get(button).eq(1).click();

      cy.get(button).eq(1).should('have.attr', 'aria-checked', 'true');
      cy.get(button).eq(0).should('have.attr', 'aria-checked', 'false');
    });
  });
});

describe('ToolbarDivider', () => {
  it('should focus first element', () => {
    mount(
      <Toolbar>
        <ToolbarButton>Item 1</ToolbarButton>
        <ToolbarButton>Item 2</ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton>Item 3</ToolbarButton>
      </Toolbar>,
    );

    cy.get('html').type('Tab').type('{rightarrow}');
    cy.get(button).eq(0).should('be.focused');
  });

  it('should navigate with arrow key', () => {
    mount(
      <Toolbar>
        <ToolbarButton>Item 1</ToolbarButton>
        <ToolbarButton>Item 2</ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton>Item 3</ToolbarButton>
      </Toolbar>,
    );

    cy.get(button).eq(0).click();

    cy.get(button).eq(0).type('{rightarrow}');
    cy.get(button).eq(1).should('be.focused');
  });

  it('should have circular navigation', () => {
    mount(
      <Toolbar>
        <ToolbarButton>Item 1</ToolbarButton>
        <ToolbarButton>Item 2</ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton>Item 3</ToolbarButton>
      </Toolbar>,
    );

    cy.get(button).eq(0).click();

    cy.get(button).eq(0).type('{leftarrow}');
    cy.get(button).eq(2).should('be.focused');
  });
});

describe('Toolbar checked icon contrast', () => {
  const restoredStyles: Array<{ style: CSSStyleDeclaration; cssText: string }> = [];
  const assertIconContrast = ($button: JQuery<HTMLElement>) => {
    const foreground = $button.css('color');
    expect($button.find('.fui-Button__icon').css('color')).to.equal(foreground);
    expect($button.find('svg').css('color')).to.equal(foreground);
    expect($button.find('svg').css('fill')).to.equal(foreground);
    expect($button.find('.fui-Button__icon').css('forced-color-adjust')).to.equal('none');
    expect(foreground).not.to.equal($button.css('background-color'));
  };

  const setForcedColors = (colorScheme?: 'light' | 'dark') =>
    cy.then(() =>
      Cypress.automation('remote:debugger:protocol', {
        command: 'Emulation.setEmulatedMedia',
        params: {
          features: colorScheme
            ? [
                { name: 'forced-colors', value: 'active' },
                { name: 'prefers-color-scheme', value: colorScheme },
                { name: 'prefers-reduced-motion', value: 'reduce' },
              ]
            : [],
        },
      }),
    );

  afterEach(() => {
    cy.then(() => {
      for (const { style, cssText } of restoredStyles) {
        style.cssText = cssText;
      }
      restoredStyles.length = 0;
    });
    setForcedColors();
  });

  for (const colorScheme of ['light', 'dark'] as const) {
    for (const appearance of ['primary', 'subtle', 'transparent'] as const) {
      for (const disabledState of ['enabled', 'disabled', 'disabledFocusable'] as const) {
        it(`preserves checked icon contrast with ${colorScheme} forced colors, ${appearance}, ${disabledState}`, () => {
          setForcedColors(colorScheme);
          const props = {
            appearance,
            disabled: disabledState === 'disabled',
            disabledFocusable: disabledState === 'disabledFocusable',
            icon: <TextBoldRegular />,
          };

          mount(
            <Toolbar checkedValues={{ radio: ['selected'], toggle: ['selected'] }}>
              <ToolbarRadioButton {...props} name="radio" value="selected" aria-label="Selected radio" />
              <ToolbarToggleButton {...props} name="toggle" value="selected" aria-label="Selected toggle" />
              <ToggleButton {...props} checked aria-label="Selected button" />
              <ToolbarRadioButton {...props} name="radio" value="unselected" aria-label="Unselected radio" />
              <ToolbarToggleButton {...props} name="toggle" value="unselected" aria-label="Unselected toggle" />
            </Toolbar>,
          );

          for (const label of ['Selected radio', 'Selected toggle', 'Selected button']) {
            const selector = `[aria-label="${label}"]`;
            if (disabledState === 'enabled') {
              cy.get(selector).should(assertIconContrast);
              cy.get(selector).realHover();
              cy.get(selector).should(assertIconContrast);
              cy.get(selector).realMouseDown();
              cy.get(selector).should(assertIconContrast);
              cy.get(selector).realMouseUp();
              cy.get(selector).focus();
              cy.get(selector).should(assertIconContrast);
            } else {
              cy.get(`[aria-label="${label}"] .fui-Button__icon`).should('have.css', 'forced-color-adjust', 'auto');
            }
          }

          for (const label of ['Unselected radio', 'Unselected toggle']) {
            cy.get(`[aria-label="${label}"] .fui-Button__icon`).should('have.css', 'forced-color-adjust', 'auto');
          }
        });
      }
    }
  }

  it('preserves icon contrast with the Microsoft-published Aquatic selected-color reference', () => {
    // Reference swatches, not native Windows emulation:
    // https://learn.microsoft.com/windows/apps/design/accessibility/high-contrast-themes#contrast-colors
    const aquatic = {
      highlight: 'rgb(142, 227, 240)',
      highlightText: 'rgb(38, 59, 80)',
    };

    setForcedColors('dark');
    mount(
      <Toolbar checkedValues={{ radio: ['selected'], toggle: ['selected'] }}>
        <ToolbarRadioButton name="radio" value="selected" icon={<TextBoldRegular />} aria-label="Selected radio" />
        <ToolbarToggleButton name="toggle" value="selected" icon={<TextBoldRegular />} aria-label="Selected toggle" />
        <ToggleButton checked appearance="subtle" icon={<TextBoldRegular />} aria-label="Selected button" />
      </Toolbar>,
    );
    cy.get('body').realHover({ position: 'bottomRight' });

    // Substitute only the system-color references, preserving the component's cascade and adjustment policy.
    cy.window().then(win => {
      const replaceSystemColors = (rules: CSSRuleList) => {
        for (const rule of Array.from(rules)) {
          if (rule instanceof win.CSSStyleRule) {
            const cssText = rule.style.cssText;
            const replaced = cssText.replace(/\bHighlight(?:Text)?\b/gi, color =>
              color.toLowerCase() === 'highlight' ? aquatic.highlight : aquatic.highlightText,
            );
            if (replaced !== cssText) {
              restoredStyles.push({ style: rule.style, cssText });
              rule.style.cssText = replaced;
            }
          } else if (rule instanceof win.CSSGroupingRule) {
            replaceSystemColors(rule.cssRules);
          }
        }
      };
      for (const sheet of Array.from(win.document.styleSheets)) {
        replaceSystemColors(sheet.cssRules);
      }
      expect(restoredStyles.length).to.be.greaterThan(0);
    });

    const assertPaletteContrast = (foreground: string, background: string) => ($button: JQuery<HTMLElement>) => {
      assertIconContrast($button);
      expect($button.css('color')).to.equal(foreground);
      expect($button.css('background-color')).to.equal(background);
      expect(readability($button.find('svg').css('fill'), background)).to.be.at.least(3);
    };

    cy.get('button').each($button => {
      cy.wrap($button).should(assertPaletteContrast(aquatic.highlightText, aquatic.highlight));
    });
    for (const label of ['Selected radio', 'Selected toggle', 'Selected button']) {
      const selector = `[aria-label="${label}"]`;
      cy.get(selector).realHover();
      cy.get(selector).should(assertPaletteContrast(aquatic.highlight, aquatic.highlightText));
      cy.get(selector).realMouseDown();
      cy.get(selector).should(assertPaletteContrast(aquatic.highlight, aquatic.highlightText));
      cy.get(selector).realMouseUp();
    }

    cy.get('body').realHover({ position: 'bottomRight' });
    cy.get('[role="toolbar"]').screenshot('Aquatic-reference-selected');
  });
});
