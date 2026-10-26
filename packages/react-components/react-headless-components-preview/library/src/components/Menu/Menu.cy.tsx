import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Menu, MenuPopover, MenuList, MenuItem, MenuTrigger } from './';
import { Tooltip } from '../Tooltip';
import type { JSXElement } from '@fluentui/react-utilities';
import type { MenuProps } from './Menu.types';
import { polyfillBodyAndObserve, supportsFocusGroup } from '@microsoft/focusgroup-polyfill';

polyfillBodyAndObserve();
const mount = (element: JSXElement) => mountBase(element);

describe('Menu', () => {
  before(() => {
    if (Cypress.env('nativeFocusgroup')) {
      expect(supportsFocusGroup(), 'native focusgroup support with no polyfill').to.be.true;
    }
  });

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

    ([320, 640] as const).forEach(width => {
      (['ltr', 'rtl'] as const).forEach(dir => {
        it(`scrolls focused long-menu items internally at ${width}x240 in ${dir}`, () => {
          cy.viewport(width, 240);
          cy.document().then(doc => doc.documentElement.setAttribute('dir', dir));
          mount(
            <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
              <Menu positioning={{ offset: { mainAxis: 24, crossAxis: 4 } }}>
                <MenuTrigger>
                  <button data-testid="long-trigger">Actions</button>
                </MenuTrigger>
                <MenuPopover data-testid="long-surface">
                  <MenuList>
                    {Array.from({ length: 40 }, (_, index) => (
                      <MenuItem key={index} data-testid={`long-item-${index + 1}`}>
                        Item {index + 1}
                      </MenuItem>
                    ))}
                  </MenuList>
                </MenuPopover>
              </Menu>
            </div>,
          );
          cy.get('[data-testid=long-trigger]').focus().realPress('Enter');
          cy.get('[data-testid=long-surface]').should(surface => {
            const rect = surface[0].getBoundingClientRect();
            expect(rect.top).to.be.at.least(0);
            expect(rect.bottom).to.be.at.most(240);
            expect(surface[0].scrollHeight).to.be.greaterThan(surface[0].clientHeight);
          });
          cy.window().then(win => {
            const pageScroll = win.scrollY;
            for (let index = 1; index < 40; index++) {
              cy.realPress('ArrowDown');
            }
            cy.get('[data-testid=long-item-40]')
              .should('have.focus')
              .then(item => {
                cy.get('[data-testid=long-surface]').should(surface => {
                  const itemRect = item[0].getBoundingClientRect();
                  const surfaceRect = surface[0].getBoundingClientRect();
                  expect(surface[0].scrollTop).to.be.greaterThan(0);
                  expect(itemRect.top).to.be.at.least(surfaceRect.top);
                  expect(itemRect.bottom).to.be.at.most(surfaceRect.bottom);
                  expect(win.scrollY).to.equal(pageScroll);
                });
              });
          });
          cy.realPress('Home');
          cy.get('[data-testid=long-item-1]').should('have.focus');
          cy.realPress('End');
          cy.get('[data-testid=long-item-40]').should('have.focus');
          cy.viewport(width, 180);
          cy.get('[data-testid=long-item-40]').should(item => {
            const rect = item[0].getBoundingClientRect();
            expect(item[0]).to.equal(item[0].ownerDocument.activeElement);
            expect(rect.top).to.be.at.least(0);
            expect(rect.bottom).to.be.at.most(180);
          });
          cy.realPress('Escape');
          cy.get('[data-testid=long-trigger]').should('have.focus').realPress('Space');
          cy.get('[data-testid=long-surface]').should('be.visible');
        });
      });
    });

    it('preserves native fallback to the larger above area for a long menu', () => {
      cy.viewport(320, 240);
      mount(
        <div style={{ position: 'fixed', bottom: '16px' }}>
          <Menu positioning={{ position: 'below', offset: 8 }}>
            <MenuTrigger>
              <button data-testid="fallback-trigger">Actions</button>
            </MenuTrigger>
            <MenuPopover data-testid="fallback-surface">
              <MenuList>
                {Array.from({ length: 40 }, (_, index) => (
                  <MenuItem key={index}>Item {index + 1}</MenuItem>
                ))}
              </MenuList>
            </MenuPopover>
          </Menu>
        </div>,
      );
      cy.get('[data-testid=fallback-trigger]').focus().realPress('Enter');
      cy.get('[data-testid=fallback-trigger]').then(trigger => {
        cy.get('[data-testid=fallback-surface]').should(surface => {
          const rect = surface[0].getBoundingClientRect();
          expect(rect.bottom).to.be.at.most(trigger[0].getBoundingClientRect().top);
          expect(rect.top).to.be.at.least(0);
          expect(rect.height).to.be.greaterThan(100);
          expect(surface[0].scrollHeight).to.be.greaterThan(surface[0].clientHeight);
        });
      });
    });

    it('does not size from a fallback that cannot fit the surface width', () => {
      cy.viewport(320, 240);
      mount(
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
          <Menu positioning={{ position: 'below', align: 'center', fallbackPositions: ['after'] }}>
            <MenuTrigger>
              <button data-testid="wide-trigger">Actions</button>
            </MenuTrigger>
            <MenuPopover data-testid="wide-surface" style={{ width: '240px' }}>
              <MenuList>
                {Array.from({ length: 40 }, (_, index) => (
                  <MenuItem key={index}>Item {index + 1}</MenuItem>
                ))}
              </MenuList>
            </MenuPopover>
          </Menu>
        </div>,
      );
      cy.get('[data-testid=wide-trigger]').focus().realPress('Enter');
      cy.get('[data-testid=wide-surface]').should(surface => {
        const rect = surface[0].getBoundingClientRect();
        expect(rect.top).to.be.at.least(0);
        expect(rect.bottom).to.be.at.most(240);
        expect(rect.height).to.be.greaterThan(50);
        expect(surface[0].scrollHeight).to.be.greaterThan(surface[0].clientHeight);
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
