import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { Button } from '@fluentui/react-button';
import { Dialog, DialogBody, DialogSurface, DialogTitle } from '@fluentui/react-dialog';
import { FluentProvider } from '@fluentui/react-provider';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-popover';
import { webLightTheme } from '@fluentui/react-theme';
import { TagPicker } from './TagPicker';
import { TagPickerControl } from '../TagPickerControl/TagPickerControl';
import { TagPickerInput } from '../TagPickerInput/TagPickerInput';
import { TagPickerList } from '../TagPickerList/TagPickerList';
import { TagPickerOption } from '../TagPickerOption/TagPickerOption';

const DialogWithPositionedContent = ({ onEnter }: { onEnter: (surface: HTMLElement) => void }) => {
  const [open, setOpen] = React.useState(false);
  const surfaceRef = React.useRef<HTMLDivElement>(null);

  return (
    <FluentProvider theme={webLightTheme}>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onOpenChange={(_, data) => setOpen(data.open)}
        surfaceMotion={{
          onMotionStart: (_, { direction }) => {
            if (direction === 'enter' && surfaceRef.current) {
              onEnter(surfaceRef.current);
            }
          },
        }}
      >
        <DialogSurface ref={surfaceRef} data-testid="dialog-surface">
          <DialogBody>
            <DialogTitle>Suggestions</DialogTitle>
            <TagPicker open positioning={{ position: 'below', align: 'start', offset: 0, flipBoundary: [] }}>
              <TagPickerControl data-testid="picker-target">
                <TagPickerInput aria-label="Choose a suggestion" />
              </TagPickerControl>
              <TagPickerList data-testid="picker-popup">
                <TagPickerOption value="cached">Cached suggestion</TagPickerOption>
              </TagPickerList>
            </TagPicker>
            <Popover
              open
              surfaceMotion={null}
              positioning={{ position: 'below', align: 'start', offset: 0, flipBoundary: [] }}
            >
              <PopoverTrigger disableButtonEnhancement>
                <Button data-testid="popover-target">More information</Button>
              </PopoverTrigger>
              <PopoverSurface data-testid="popover-popup">
                <TagPicker open positioning={{ position: 'below', align: 'start', offset: 0, flipBoundary: [] }}>
                  <TagPickerControl data-testid="nested-target">
                    <TagPickerInput aria-label="Choose a nested suggestion" />
                  </TagPickerControl>
                  <TagPickerList data-testid="nested-popup">
                    <TagPickerOption value="nested">Nested suggestion</TagPickerOption>
                  </TagPickerList>
                </TagPicker>
              </PopoverSurface>
            </Popover>
            <Button onClick={() => setOpen(false)}>Close dialog</Button>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </FluentProvider>
  );
};

describe('positioning during Dialog motion', () => {
  let cleanupMeasurement: () => void = () => undefined;

  afterEach(() => cleanupMeasurement());

  it('keeps portaled TagPicker and Popover aligned during entry and after reopening', () => {
    cy.viewport(1000, 800);
    const measureAlignment = (surface: HTMLElement) =>
      Cypress.Promise.resolve().then(() => {
        const targetDocument = surface.ownerDocument;
        const targetWindow = targetDocument.defaultView!;
        const pairs = ['picker', 'popover', 'nested'].map(name => ({
          name,
          target: targetDocument.querySelector<HTMLElement>(`[data-testid="${name}-target"]`)!,
          popup: targetDocument.querySelector<HTMLElement>(`[data-testid="${name}-popup"]`)!,
        }));
        const animations = surface.getAnimations().filter(animation => animation.playState === 'running');
        expect(animations.length, 'real Dialog entry animation').to.be.greaterThan(0);
        const timings = animations.map(animation => {
          const endTime = Number(animation.effect!.getComputedTiming().endTime);
          expect(Number.isFinite(endTime), 'finite Dialog entry animation').to.equal(true);
          expect(endTime, 'Dialog entry animation duration').to.be.greaterThan(0);
          return { animation, endTime, playbackRate: animation.playbackRate };
        });
        // Keep native motion running, but seek it explicitly so slow CI frames cannot skip the movement.
        for (const { animation } of timings) {
          animation.playbackRate = 0.000001;
          animation.currentTime = 0;
        }

        return new Cypress.Promise<void>((resolve, reject) => {
          const progressPoints = [0.25, 0.5, 0.75];
          let nextProgress = 0;
          let finishing = false;
          let movingSamples = 0;
          let previousLeft = pairs[0].target.getBoundingClientRect().left;
          let frame: number | undefined;
          let timer: number | undefined;
          const deadline = targetWindow.setTimeout(
            () => finish(new Error('Dialog entry motion did not settle')),
            Cypress.config('defaultCommandTimeout'),
          );
          const cleanup = () => {
            if (frame !== undefined) {
              targetWindow.cancelAnimationFrame(frame);
            }
            if (timer !== undefined) {
              targetWindow.clearTimeout(timer);
            }
            targetWindow.clearTimeout(deadline);
            for (const { animation, playbackRate } of timings) {
              animation.playbackRate = playbackRate;
            }
          };
          cleanupMeasurement = cleanup;
          const finish = (error?: unknown) => {
            cleanup();
            if (error !== undefined) {
              reject(error);
            } else {
              resolve();
            }
          };

          const sample = () => {
            frame = undefined;
            // Positioning's frame callback updates through microtasks before this geometry sample.
            timer = targetWindow.setTimeout(() => {
              timer = undefined;
              try {
                const active = animations.some(animation => animation.playState === 'running');
                const left = pairs[0].target.getBoundingClientRect().left;
                const moving = Math.abs(left - previousLeft) > 0.1;
                previousLeft = left;

                if (moving) {
                  movingSamples++;
                }
                if (movingSamples > 1 || !active) {
                  for (const { name, target, popup } of pairs) {
                    const reference = target.getBoundingClientRect();
                    const positioned = popup.getBoundingClientRect();
                    expect(Math.abs(positioned.left - reference.left), `${name} left alignment`).to.be.lessThan(2);
                    expect(Math.abs(positioned.top - reference.bottom), `${name} bottom alignment`).to.be.lessThan(2);
                  }
                }
                if (active) {
                  if (nextProgress < progressPoints.length) {
                    const progress = progressPoints[nextProgress++];
                    for (const { animation, endTime } of timings) {
                      animation.currentTime = endTime * progress;
                    }
                  } else {
                    finishing = true;
                    animations.forEach(animation => animation.finish());
                  }
                  frame = targetWindow.requestAnimationFrame(sample);
                } else {
                  expect(finishing, 'controlled entry completed before settlement').to.equal(true);
                  expect(movingSamples, 'samples of changing target geometry').to.be.greaterThan(1);
                  finish();
                }
              } catch (error) {
                finish(error);
              }
            }, 0);
          };
          frame = targetWindow.requestAnimationFrame(sample);
        });
      });

    let entryPending = false;
    // Capture failures immediately, then rethrow them when Cypress awaits the measurement.
    const measureEntry = (surface: HTMLElement) =>
      Cypress.Promise.resolve()
        .then(() => {
          entryPending = false;
          return measureAlignment(surface);
        })
        .then(
          () => undefined,
          (error: unknown) => ({ error }),
        );
    let alignment: ReturnType<typeof measureEntry> | undefined;
    mount(
      <DialogWithPositionedContent
        onEnter={surface => {
          if (!entryPending) {
            entryPending = true;
            // Coalesce StrictMode callbacks and wait until native animations have been created.
            alignment = measureEntry(surface);
          }
        }}
      />,
    );
    const checkAlignment = () =>
      cy.then(() => {
        expect(alignment, 'measurement started with Dialog entry').not.to.equal(undefined);
        return alignment!.then(result => {
          if (result) {
            throw result.error;
          }
        });
      });

    cy.contains('button', 'Open dialog').click();
    checkAlignment();
    cy.contains('button', 'Close dialog').click();
    cy.get('[data-testid="dialog-surface"]').should('not.exist');
    cy.then(() => {
      alignment = undefined;
    });
    cy.contains('button', 'Open dialog').click();
    checkAlignment();
  });
});
