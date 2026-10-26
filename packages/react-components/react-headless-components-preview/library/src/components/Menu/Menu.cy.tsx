import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Menu, MenuPopover, MenuList, MenuItem, MenuTrigger } from './';
import { Tooltip } from '../Tooltip';
import type { JSXElement } from '@fluentui/react-utilities';
import type { MenuProps } from './Menu.types';

const mount = (element: JSXElement) => mountBase(element);

describe('Menu', () => {
  describe('covering-state styling contract', () => {
    let originalDir: string | null;
    beforeEach(() => {
      cy.document().then(doc => {
        originalDir = doc.documentElement.getAttribute('dir');
      });
    });
    afterEach(() => {
      cy.document().then(doc => {
        if (originalDir === null) {
          doc.documentElement.removeAttribute('dir');
        } else {
          doc.documentElement.setAttribute('dir', originalDir);
        }
      });
    });

    (['ltr', 'rtl'] as const).forEach(dir => {
      (['above', 'below', 'before', 'after'] as const).forEach(position => {
        it(`preserves ${position} geometry and offsets in ${dir}`, () => {
          cy.document().then(doc => doc.documentElement.setAttribute('dir', dir));
          const offset = position === 'above' || position === 'below' ? 8 : { mainAxis: 8, crossAxis: 4 };
          const positioning: MenuProps['positioning'] = {
            position,
            align: 'center',
            pinned: true,
            offset,
            fallbackPositions: ['below', 'above'],
          };
          mount(
            <div dir={dir} style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
              <Menu positioning={positioning}>
                <MenuTrigger>
                  <button data-testid="geometry-trigger">Actions</button>
                </MenuTrigger>
                <MenuPopover data-testid="geometry-surface">
                  <MenuList>
                    <MenuItem>First action</MenuItem>
                    <MenuItem>Second action</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </div>,
          );
          cy.get('[data-testid=geometry-trigger]').focus().realPress('Enter');
          cy.get('[data-testid=geometry-surface]').should('be.visible').and('not.have.attr', 'data-cover-target');
          cy.get('[data-testid=geometry-trigger]').then(trigger => {
            const target = trigger[0].getBoundingClientRect();
            cy.get('[data-testid=geometry-surface]').should(surface => {
              const element = surface[0];
              const rect = element.getBoundingClientRect();
              expect(element.style.getPropertyValue('position-try-fallbacks')).to.equal('');
              expect(element.style.getPropertyValue('margin-block-start')).to.equal(
                position === 'above' || position === 'below' ? '8px' : '4px',
              );
              if (position === 'above') {
                expect(target.top - rect.bottom).to.be.closeTo(8, 1);
              } else if (position === 'below') {
                expect(rect.top - target.bottom).to.be.closeTo(8, 1);
              } else if ((position === 'before') === (dir === 'ltr')) {
                expect(target.left - rect.right).to.be.closeTo(8, 1);
              } else {
                expect(rect.left - target.right).to.be.closeTo(8, 1);
              }
            });
          });
        });
      });
    });

    ([false, true] as const).forEach(coverTarget => {
      (['Enter', 'Space'] as const).forEach(key => {
        it(`preserves keyboard lifecycle with coverTarget=${coverTarget}, opening with ${key}`, () => {
          mount(
            <Menu positioning={{ coverTarget, position: key === 'Space' ? 'above' : 'below' }}>
              <MenuTrigger>
                <button data-testid="cover-trigger">Actions</button>
              </MenuTrigger>
              <MenuPopover data-testid="cover-surface">
                <MenuList>
                  <MenuItem data-testid="first-item">First action</MenuItem>
                  <MenuItem data-testid="second-item">Second action</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>,
          );

          cy.get('[data-testid=cover-trigger]').focus().realPress(key);
          cy.get('[data-testid=cover-surface]').should('be.visible');
          cy.get('[data-testid=cover-surface]').should(
            coverTarget ? 'have.attr' : 'not.have.attr',
            'data-cover-target',
          );
          if (coverTarget) {
            cy.get('[data-testid=cover-trigger]').then(trigger => {
              cy.get('[data-testid=cover-surface]').should(surface => {
                expect(surface[0].style.getPropertyValue('position-area')).to.equal('center');
                expect(surface[0].getBoundingClientRect().height).to.be.greaterThan(
                  trigger[0].getBoundingClientRect().height,
                );
              });
            });
          }
          cy.get('[data-testid=cover-trigger]').should('have.attr', 'aria-expanded', 'true');
          cy.get('[role=menu]').should('have.attr', 'aria-labelledby');
          cy.get('[data-testid=first-item]').should('have.focus');
          cy.realPress('ArrowDown');
          cy.get('[data-testid=second-item]').should('have.focus');
          cy.realPress('Escape');
          cy.get('[data-testid=cover-surface]').should('not.be.visible');
          cy.get('[data-testid=cover-trigger]').should('have.focus').realPress(key);
          cy.get('[data-testid=cover-surface]').should('be.visible');
          cy.get('[data-testid=first-item]').should('have.focus');
          cy.realPress('Tab');
          cy.get('[data-testid=cover-surface]').should('not.be.visible');
          cy.get('[data-testid=cover-trigger]').should('not.have.attr', 'aria-expanded');
        });
      });
    });
  });

  describe('with Tooltip wrapping MenuTrigger', () => {
    const TooltipWrappedMenuExample = () => (
      <Menu>
        <Tooltip hideDelay={0} showDelay={0} content="Click to open menu options" relationship="label">
          <MenuTrigger>
            <button id="tooltip-wrapped-trigger">Options</button>
          </MenuTrigger>
        </Tooltip>
        <MenuPopover>
          <MenuList>
            <MenuItem id="menu-item-1">New</MenuItem>
            <MenuItem id="menu-item-2">Open</MenuItem>
            <MenuItem id="menu-item-3">Save</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );

    it('should open menu when tooltip-wrapped trigger is clicked', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').should('exist');
      cy.get('#menu-item-1').should('not.be.visible');
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#menu-item-1').should('be.visible');
      cy.get('#menu-item-2').should('be.visible');
      cy.get('#menu-item-3').should('be.visible');
    });

    it('should have tooltip accessible on the trigger', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-label', 'Click to open menu options');
    });

    it('should have proper ARIA haspopup and expanded attributes', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-haspopup', 'menu');
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should handle keyboard interaction (Enter) with tooltip-wrapped trigger', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').focus().realPress('Enter');
      cy.get('#menu-item-1').should('be.visible');
    });

    it('should allow menu item selection and close menu', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#menu-item-2').should('be.visible');
      cy.get('#menu-item-2').click();
      cy.get('#menu-item-1').should('not.be.visible');
    });

    it('should dismiss on Escape even with tooltip wrapper', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#menu-item-1').should('be.visible');
      cy.focused().realPress('Escape');
      cy.get('#menu-item-1').should('not.be.visible');
    });

    it('should show tooltip on hover without opening menu', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').trigger('pointerover');
      cy.get('[role="tooltip"]').should('be.visible');
      cy.get('[role="tooltip"]').should('contain.text', 'Click to open menu options');
      cy.get('#menu-item-1').should('not.be.visible');
    });
  });
});
