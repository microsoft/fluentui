import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { Button } from '@fluentui/react-button';
import { Dialog, DialogBody, DialogSurface, DialogTitle } from '@fluentui/react-dialog';
import { Fade } from '@fluentui/react-motion-components-preview';
import { FluentProvider } from '@fluentui/react-provider';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-popover';
import { webLightTheme } from '@fluentui/react-theme';
import { TagPicker } from './TagPicker';
import { TagPickerControl } from '../TagPickerControl/TagPickerControl';
import { TagPickerInput } from '../TagPickerInput/TagPickerInput';
import { TagPickerList } from '../TagPickerList/TagPickerList';
import { TagPickerOption } from '../TagPickerOption/TagPickerOption';

const DialogWithPositionedContent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <FluentProvider theme={webLightTheme}>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onOpenChange={(_, data) => setOpen(data.open)}>
        <DialogSurface data-testid="dialog-surface">
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
              surfaceMotion={{ children: (_, motionProps) => <Fade {...motionProps} /> }}
              positioning={{ position: 'below', align: 'start', offset: 0, flipBoundary: [] }}
            >
              <PopoverTrigger disableButtonEnhancement>
                <Button data-testid="popover-target">More information</Button>
              </PopoverTrigger>
              <PopoverSurface data-testid="popover-popup">Suggestion details</PopoverSurface>
            </Popover>
            <Button onClick={() => setOpen(false)}>Close dialog</Button>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </FluentProvider>
  );
};

describe('positioning during Dialog motion', () => {
  it('keeps portaled TagPicker and Popover aligned during entry and after reopening', () => {
    mount(<DialogWithPositionedContent />);

    const checkAlignment = () =>
      cy.get('[data-testid="dialog-surface"]').then($surface => {
        const surface = $surface[0];
        const targetDocument = surface.ownerDocument;
        const targetWindow = targetDocument.defaultView!;
        const pairs = ['picker', 'popover'].map(name => ({
          target: targetDocument.querySelector<HTMLElement>(`[data-testid="${name}-target"]`)!,
          popup: targetDocument.querySelector<HTMLElement>(`[data-testid="${name}-popup"]`)!,
        }));
        const animations = surface.getAnimations().filter(animation => animation.playState === 'running');
        expect(animations.length, 'real Dialog entry animation').to.be.greaterThan(0);

        return new Cypress.Promise<void>((resolve, reject) => {
          let movingSamples = 0;
          let previousLeft = pairs[0].target.getBoundingClientRect().left;

          const sample = () => {
            // Positioning's frame callback updates through microtasks before this geometry sample.
            targetWindow.setTimeout(() => {
              try {
                const active = animations.some(animation => animation.playState === 'running');
                const left = pairs[0].target.getBoundingClientRect().left;
                const moving = Math.abs(left - previousLeft) > 0.1;
                previousLeft = left;

                if (moving) {
                  movingSamples++;
                }
                if (movingSamples > 1 || !active) {
                  for (const { target, popup } of pairs) {
                    const reference = target.getBoundingClientRect();
                    const positioned = popup.getBoundingClientRect();
                    expect(Math.abs(positioned.left - reference.left), 'left alignment').to.be.lessThan(2);
                    expect(Math.abs(positioned.top - reference.bottom), 'bottom alignment').to.be.lessThan(2);
                  }
                }
                if (active) {
                  targetWindow.requestAnimationFrame(sample);
                } else {
                  expect(movingSamples, 'samples of changing target geometry').to.be.greaterThan(1);
                  resolve();
                }
              } catch (error) {
                reject(error);
              }
            }, 0);
          };
          targetWindow.requestAnimationFrame(sample);
        });
      });

    cy.contains('button', 'Open dialog').click();
    checkAlignment();
    cy.contains('button', 'Close dialog').click();
    cy.get('[data-testid="dialog-surface"]').should('not.exist');
    cy.contains('button', 'Open dialog').click();
    checkAlignment();
  });
});
