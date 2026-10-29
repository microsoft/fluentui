import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { useMergedRefs } from '@fluentui/react-utilities';
import { usePositioning as useV9Positioning } from '@fluentui/react-positioning';
import { polyfill } from '@microsoft/focusgroup-polyfill';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '../../components/Menu';
import { Provider } from '../../components/Provider';
import { usePositioning } from './usePositioning';
import type { PositioningProps } from './types';

type FixtureProps = PositioningProps & {
  engine: 'headless' | 'v9';
  triggerTop?: number;
};

const Fixture = ({ engine, triggerTop = 16, ...options }: FixtureProps) => {
  const useEngine = engine === 'headless' ? usePositioning : useV9Positioning;
  const refs = useEngine({ position: 'below', align: 'start', strategy: 'fixed', ...options });
  const [surface, setSurface] = React.useState<HTMLDivElement | null>(null);
  const surfaceRef = useMergedRefs(refs.containerRef, setSurface);

  React.useEffect(() => {
    if (surface) {
      polyfill(surface);
      surface.showPopover();
    }
  }, [surface]);

  return (
    <>
      <button ref={refs.targetRef} style={{ position: 'fixed', top: triggerTop, left: 16 }}>
        Trigger
      </button>
      <div
        ref={surfaceRef}
        popover="manual"
        role="menu"
        focusgroup="menu block wrap"
        data-testid="surface"
        style={{ inset: 'auto', width: options.matchTargetSize ? undefined : 700, overflow: 'hidden' }}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <button key={index} role="menuitem" data-item={index} style={{ display: 'block', height: 40 }}>
            Item {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

const expectFocusedItemVisible = () => {
  cy.focused().should(item => {
    const rect = item[0].getBoundingClientRect();
    const surface = item[0].closest('[data-testid=surface]')!;
    const bounds = surface.getBoundingClientRect();
    expect(rect.top).to.be.at.least(Math.max(0, bounds.top));
    expect(rect.bottom).to.be.at.most(Math.min(256, bounds.bottom));
  });
};

(['headless', 'v9'] as const).forEach(engine => {
  describe(`${engine} autoSize parity`, () => {
    beforeEach(() => cy.viewport(320, 256));

    ([true, 'always', 'height', 'height-always', 'width', 'width-always'] as const).forEach(autoSize => {
      it(`constrains the requested axes for ${autoSize}`, () => {
        mount(<Fixture engine={engine} autoSize={autoSize} />);
        cy.get('[data-testid=surface]').should(surface => {
          const rect = surface[0].getBoundingClientRect();
          if (autoSize !== 'width' && autoSize !== 'width-always') {
            expect(rect.height).to.be.at.most(256);
            expect(rect.height).to.be.greaterThan(40);
          } else {
            expect(rect.height).to.be.greaterThan(256);
          }
          if (autoSize !== 'height' && autoSize !== 'height-always') {
            expect(rect.width).to.be.at.most(320);
          } else {
            expect(rect.width).to.be.greaterThan(320);
          }
        });
      });
    });

    ([undefined, false] as const).forEach(autoSize => {
      it(`does not constrain dimensions with autoSize=${autoSize}`, () => {
        mount(<Fixture engine={engine} autoSize={autoSize} />);
        cy.get('[data-testid=surface]').should(surface => {
          expect(surface[0].style.maxHeight).to.equal('');
          expect(surface[0].style.maxWidth).to.equal('');
          expect(surface[0].getBoundingClientRect().height).to.be.greaterThan(256);
        });
      });
    });

    it('flips before sizing near the bottom of the viewport', () => {
      mount(<Fixture engine={engine} autoSize="height" triggerTop={220} />);
      cy.get('[data-testid=surface]').should(surface => {
        const rect = surface[0].getBoundingClientRect();
        expect(rect.top).to.be.at.least(0);
        expect(rect.bottom).to.be.at.most(220);
        expect(rect.height).to.be.greaterThan(160);
      });
    });

    it('reveals keyboard focus after shrinking an open popup', () => {
      cy.viewport(640, 640);
      mount(<Fixture engine={engine} autoSize="height" />);
      cy.get('[data-item=0]').focus();
      cy.viewport(320, 256);
      cy.get('[data-testid=surface]').should(surface => {
        expect(surface[0].getBoundingClientRect().height).to.be.at.most(256);
      });
      cy.focused().realPress('End');
      cy.focused().should('have.attr', 'data-item', '9');
      expectFocusedItemVisible();
      cy.focused().realPress('ArrowDown');
      cy.focused().should('have.attr', 'data-item', '0');
      expectFocusedItemVisible();
      cy.focused().realPress('ArrowUp');
      cy.focused().should('have.attr', 'data-item', '9');
      expectFocusedItemVisible();
      cy.focused().realPress('Home');
      cy.focused().should('have.attr', 'data-item', '0');
      expectFocusedItemVisible();
      cy.viewport(640, 640);
      cy.get('[data-testid=surface]').should(surface => {
        expect(surface[0].getBoundingClientRect().height).to.be.greaterThan(256);
      });
    });

    it('preserves pinned placement and applies offsets before sizing', () => {
      mount(<Fixture engine={engine} autoSize="height" pinned triggerTop={220} offset={4} />);
      cy.get('[data-testid=surface]').should(surface => {
        const trigger = surface[0].ownerDocument.querySelector('button')!;
        const rect = surface[0].getBoundingClientRect();
        expect(rect.top).to.be.closeTo(trigger.getBoundingClientRect().bottom + 4, 1);
        const devicePixel = 1 / surface[0].ownerDocument.defaultView!.devicePixelRatio;
        expect(rect.bottom).to.be.at.most(256 + devicePixel);
      });
    });

    it('preserves target-width matching', () => {
      mount(<Fixture engine={engine} autoSize="height" matchTargetSize="width" />);
      cy.get('[data-testid=surface]').should(surface => {
        const trigger = surface[0].ownerDocument.querySelector('button')!;
        expect(surface[0].getBoundingClientRect().width).to.equal(trigger.getBoundingClientRect().width);
      });
    });

    it('uses custom fallback positions before constraining the popup', () => {
      mount(<Fixture engine={engine} autoSize triggerTop={220} fallbackPositions={['above-end']} />);
      cy.get('[data-testid=surface]').should('have.attr', 'data-popper-placement', 'top-end');
    });

    it('preserves coverTarget', () => {
      mount(<Fixture engine={engine} autoSize coverTarget />);
      cy.get('[data-testid=surface]').should(surface => {
        const trigger = surface[0].ownerDocument.querySelector('button')!.getBoundingClientRect();
        const rect = surface[0].getBoundingClientRect();
        expect(rect.top).to.be.at.most(trigger.bottom);
        expect(rect.bottom).to.be.at.least(trigger.top);
      });
    });

    it('positions before the trigger on the right in RTL', () => {
      mount(
        <Provider dir="rtl">
          <div dir="rtl">
            <Fixture engine={engine} autoSize="height" pinned position="before" align="top" matchTargetSize="width" />
          </div>
        </Provider>,
      );
      cy.get('[data-testid=surface]').should(surface => {
        const trigger = surface[0].ownerDocument.querySelector('button')!.getBoundingClientRect();
        expect(surface[0].getBoundingClientRect().left).to.be.closeTo(trigger.right, 1);
        expect(surface[0].getAttribute('data-popper-placement')).to.equal('right-start');
        if (engine === 'headless') {
          expect(surface[0].getAttribute('data-placement')).to.equal('before-top');
        }
      });
    });
  });
});

describe('headless autosizing lifecycle', () => {
  it('matches the effective v9 strategy when absolute positioning is requested', () => {
    cy.viewport(320, 256);
    mount(<Fixture engine="v9" autoSize strategy="absolute" />);
    cy.get('[data-testid=surface]')
      .should('have.attr', 'data-popper-placement')
      .get('[data-testid=surface]')
      .then(reference => {
        const strategy = reference[0].style.position;
        const referenceRect = reference[0].getBoundingClientRect();
        mount(<Fixture engine="headless" autoSize strategy="absolute" />);
        cy.get('[data-testid=surface]').should(surface => {
          expect(surface[0].style.position).to.equal(strategy);
          const rect = surface[0].getBoundingClientRect();
          expect(rect.height).to.be.at.most(256);
          expect(rect.top).to.be.closeTo(referenceRect.top, 1);
          expect(rect.height).to.be.closeTo(referenceRect.height, 1);
        });
      });
  });

  it('clears stale sizing when switching axes and returning to CSS anchors', () => {
    const Modes = () => {
      const [mode, setMode] = React.useState(0);
      const modes = ['height', 'width', false] as const;
      return (
        <>
          <button data-testid="mode" onClick={() => setMode(mode + 1)}>
            Next mode
          </button>
          <Fixture engine="headless" autoSize={modes[mode]} triggerTop={56} />
        </>
      );
    };
    cy.viewport(320, 256);
    mount(<Modes />);
    cy.get('[data-testid=surface]').should(surface => {
      expect(surface[0].style.maxHeight).not.to.equal('');
    });
    cy.get('[data-testid=mode]').click();
    cy.get('[data-testid=surface]').should(surface => {
      expect(surface[0].style.maxHeight).to.equal('');
      expect(surface[0].style.height).to.equal('');
      expect(surface[0].style.maxWidth).not.to.equal('');
    });
    cy.get('[data-testid=mode]').click();
    cy.get('[data-testid=surface]').should(surface => {
      expect(surface[0].style.maxHeight).to.equal('');
      expect(surface[0].style.maxWidth).to.equal('');
      expect(surface[0].style.width).to.equal('');
      expect(surface[0].style.transform).to.equal('');
      expect(surface[0].style.overflow).to.equal('hidden');
      expect(surface[0].style.getPropertyValue('position-area')).to.equal('block-end span-inline-end');
      expect(surface[0].hasAttribute('data-popper-placement')).to.equal(false);
    });
  });

  it('keeps actual Menu items visible during keyboard navigation after resizing', () => {
    cy.viewport(640, 640);
    mount(
      <Menu positioning={{ autoSize: 'height' }}>
        <MenuTrigger>
          <button>Open menu</button>
        </MenuTrigger>
        <MenuPopover data-testid="surface" style={{ overflow: 'hidden' }}>
          <MenuList>
            {Array.from({ length: 10 }, (_, index) => (
              <MenuItem key={index} data-item={index} style={{ display: 'block', height: 40 }}>
                Item {index + 1}
              </MenuItem>
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.contains('button', 'Open menu').click();
    cy.get('[role=menu]').then(menu => polyfill(menu[0]));
    cy.get('[data-item=0]').focus();
    cy.viewport(320, 256);
    cy.get('[data-testid=surface]').should(surface => {
      expect(surface[0].getBoundingClientRect().height).to.be.at.most(256);
    });
    cy.focused().realPress('End');
    cy.focused().should('have.attr', 'data-item', '9');
    expectFocusedItemVisible();
    cy.focused().realPress('ArrowDown');
    cy.focused().should('have.attr', 'data-item', '0');
    expectFocusedItemVisible();
    cy.focused().realPress('ArrowUp');
    cy.focused().should('have.attr', 'data-item', '9');
    expectFocusedItemVisible();
    cy.focused().realPress('Escape');
    cy.get('[data-testid=surface]').should('not.be.visible');
    cy.focused().should('have.text', 'Open menu');
  });
});
