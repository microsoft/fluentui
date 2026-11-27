import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { ToggleButton } from '@fluentui/react-button';
import { Input } from '@fluentui/react-input';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { TextBoldRegular } from '@fluentui/react-icons';
import { TextBoldRegular as TextBoldFont } from '@fluentui/react-icons/lib/fonts';
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
  describe('Input last in a horizontal toolbar', () => {
    const InputToolbar = ({ controlled = false, dir = 'ltr' }: { controlled?: boolean; dir?: 'ltr' | 'rtl' }) => {
      const rootAttributes = useTabsterAttributes({ root: {} });
      const [value, setValue] = React.useState('abcdef');

      return (
        <div {...rootAttributes} dir={dir}>
          <button id="before">Before</button>
          <Toolbar aria-label="Input toolbar">
            <ToolbarButton id="first">First</ToolbarButton>
            <ToolbarButton id="second">Second</ToolbarButton>
            <Input
              aria-label="Filter"
              {...(controlled ? { value } : { defaultValue: value })}
              onChange={(_, data) => setValue(data.value)}
            />
          </Toolbar>
          <button id="after">After</button>
          {dir === 'rtl' && <input id="native" aria-label="Native editing baseline" defaultValue="abcdef" />}
        </div>
      );
    };

    const assertSelection = (start: number, end = start) => {
      cy.get<HTMLInputElement>('input')
        .should('be.focused')
        .should($input => {
          expect($input[0].selectionStart).to.equal(start);
          expect($input[0].selectionEnd).to.equal(end);
        });
    };

    it('enters once, navigates the buttons, exits in both directions and remembers input focus', () => {
      mount(<InputToolbar />);
      cy.get('#before').focus();
      cy.realPress('Tab');
      cy.get('#first').should('be.focused');
      cy.realPress('ArrowRight');
      cy.get('#second').should('be.focused');
      cy.realPress('ArrowLeft');
      cy.get('#first').should('be.focused');
      cy.realPress('End');
      cy.get('input').should('be.focused');
      cy.realPress('Home');
      assertSelection(0);
      cy.realPress('ArrowRight');
      assertSelection(1);
      cy.realPress('Tab');
      cy.get('#after').should('be.focused');
      cy.realPress(['Shift', 'Tab']);
      assertSelection(1);
      cy.realPress(['Shift', 'Tab']);
      cy.get('#before').should('be.focused');
      cy.realPress('Tab');
      assertSelection(1);
    });

    for (const controlled of [false, true]) {
      it(`preserves editing and selection in a ${controlled ? 'controlled' : 'uncontrolled'} input`, () => {
        mount(<InputToolbar controlled={controlled} />);
        cy.get('input').focus();
        cy.realPress('Home');
        assertSelection(0);
        cy.realPress('ArrowRight');
        cy.realPress('ArrowRight');
        cy.realPress('ArrowRight');
        assertSelection(3);
        cy.realType('X');
        cy.get('input').should('have.value', 'abcXdef');
        assertSelection(4);
        cy.realPress('ArrowLeft');
        assertSelection(3);
        cy.realPress(['Shift', 'ArrowRight']);
        assertSelection(3, 4);
        cy.realPress('End');
        assertSelection(7);
        cy.realPress(['Shift', 'ArrowLeft']);
        assertSelection(6, 7);
        cy.realPress('Home');
        assertSelection(0);
        cy.realPress(['Shift', 'ArrowRight']);
        assertSelection(0, 1);
      });
    }

    it('preserves existing focus transfer at unselected text boundaries', () => {
      mount(<InputToolbar />);
      cy.get('input').focus();
      cy.realPress('Home');
      assertSelection(0);
      cy.realPress('ArrowLeft');
      cy.get('#second').should('be.focused');
      cy.realPress('End');
      cy.realPress('End');
      assertSelection(6);
      cy.realPress('ArrowRight');
      cy.get('#first').should('be.focused');
      cy.realPress('End');
      cy.realPress('Home');
      assertSelection(0);
      cy.get('#second').focus();
      cy.realPress('Home');
      cy.get('#first').should('be.focused');
    });

    it('uses RTL button order without taking focus from text editing', () => {
      mount(<InputToolbar dir="rtl" />);
      cy.get('#native').focus();
      cy.realPress('Home');
      cy.realPress('ArrowRight');
      cy.realType('X');
      cy.get<HTMLInputElement>('#native').then($native => {
        const { value, selectionStart, selectionEnd } = $native[0];
        cy.get('#first').focus();
        cy.realPress('ArrowLeft');
        cy.get('#second').should('be.focused');
        cy.realPress('ArrowRight');
        cy.get('#first').should('be.focused');
        cy.realPress('End');
        cy.get('input[aria-label="Filter"]').should('be.focused');
        cy.realPress('Home');
        cy.realPress('ArrowRight');
        cy.realType('X');
        cy.get<HTMLInputElement>('input[aria-label="Filter"]')
          .should('be.focused')
          .should($input => {
            expect($input[0].value).to.equal(value);
            expect($input[0].selectionStart).to.equal(selectionStart);
            expect($input[0].selectionEnd).to.equal(selectionEnd);
          });
      });
    });
  });

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
  const assertIconContrast = ($button: JQuery<HTMLElement>) => {
    const foreground = $button.css('color');
    const $icon = $button.find('.fui-Button__icon');
    expect($icon.css('color')).to.equal(foreground);
    expect($icon.css('forced-color-adjust')).to.equal('none');
    expect($icon.children().css('color')).to.equal(foreground);
    expect($icon.children().css('forced-color-adjust')).to.equal('none');
    if ($icon.find('svg').length) {
      expect($icon.find('svg').css('fill')).to.equal(foreground);
    }
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

  afterEach(() => setForcedColors());

  for (const colorScheme of ['light', 'dark'] as const) {
    for (const appearance of ['primary', 'subtle', 'transparent'] as const) {
      for (const [iconType, Icon] of [
        ['SVG', TextBoldRegular],
        ['font', TextBoldFont],
      ] as const) {
        it(`preserves ${iconType} icon contrast with ${colorScheme} forced colors and ${appearance} appearance`, () => {
          setForcedColors(colorScheme);
          const props = { appearance, icon: <Icon /> };

          mount(
            <Toolbar checkedValues={{ radio: ['selected'], toggle: ['selected'] }}>
              <ToolbarRadioButton {...props} name="radio" value="selected" aria-label="Selected radio" />
              <ToolbarToggleButton {...props} name="toggle" value="selected" aria-label="Selected toggle" />
              <ToggleButton {...props} checked aria-label="Selected button" />
              <ToggleButton {...props} aria-label="Unselected" />
              <ToggleButton {...props} checked disabled aria-label="Disabled" />
              <ToggleButton {...props} checked disabledFocusable aria-label="Disabled focusable" />
            </Toolbar>,
          );

          if (iconType === 'font') {
            cy.get('[aria-label="Selected radio"] i').should('be.visible');
            cy.document().then(async doc => {
              const fonts = await doc.fonts.load('20px FluentSystemIcons');
              expect(fonts).to.have.length(1);
              expect(fonts[0].status).to.equal('loaded');
            });
          }

          for (const label of ['Selected radio', 'Selected toggle', 'Selected button']) {
            const selector = `[aria-label="${label}"]`;
            cy.get('body').realHover({ position: 'bottomRight' });
            cy.get(selector).should(assertIconContrast);
            cy.get(selector).realHover();
            cy.get(selector).should(assertIconContrast);
            cy.get(selector).realMouseDown();
            cy.get(selector).should(assertIconContrast);
            cy.get(selector).realMouseUp();
            cy.get('body').realHover({ position: 'bottomRight' });
            cy.get(selector).focus();
            cy.get(selector).should(assertIconContrast);
          }

          for (const label of ['Unselected', 'Disabled', 'Disabled focusable']) {
            cy.get(`[aria-label="${label}"] .fui-Button__icon`).should('have.css', 'forced-color-adjust', 'auto');
          }
        });
      }
    }
  }
});
