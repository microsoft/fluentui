import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { Button } from '@fluentui/react-button';
import { Dialog, DialogActions, DialogBody, DialogSurface, DialogTitle } from '@fluentui/react-dialog';
import type { PositioningImperativeRef } from '@fluentui/react-positioning';
import { FluentProvider } from '@fluentui/react-provider';
import { Tag } from '@fluentui/react-tags';
import { webLightTheme } from '@fluentui/react-theme';
import { TagPicker } from './TagPicker';
import { TagPickerControl } from '../TagPickerControl/TagPickerControl';
import { TagPickerGroup } from '../TagPickerGroup/TagPickerGroup';
import { TagPickerInput } from '../TagPickerInput/TagPickerInput';
import { TagPickerList } from '../TagPickerList/TagPickerList';
import { TagPickerOption } from '../TagPickerOption/TagPickerOption';

const options = ['John Doe', 'Jane Doe'];

const DialogWithTagPicker = ({
  onEntryStart,
  onEntryFinish,
}: {
  onEntryStart: (hasSuggestions: boolean) => void;
  onEntryFinish: () => void;
}) => {
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const remainingOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <FluentProvider theme={webLightTheme}>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onOpenChange={(_, data) => setOpen(data.open)}
        surfaceMotion={{
          onMotionStart: (_, { direction }) => {
            if (direction === 'enter') {
              onEntryStart(Boolean(surfaceRef.current?.ownerDocument.querySelector('[data-testid="picker-popup"]')));
            }
          },
          onMotionFinish: (_, { direction }) => {
            if (direction === 'enter') {
              positioningRef.current?.updatePosition();
              onEntryFinish();
            }
          },
        }}
      >
        <DialogSurface ref={surfaceRef} data-testid="dialog-surface">
          <DialogBody>
            <DialogTitle>Suggestions</DialogTitle>
            <TagPicker
              open={remainingOptions.length > 0}
              selectedOptions={selectedOptions}
              onOptionSelect={(_, data) => setSelectedOptions(data.selectedOptions)}
              positioning={{ positioningRef, position: 'below', align: 'start', offset: 0, flipBoundary: [] }}
            >
              <TagPickerControl data-testid="picker-target">
                <TagPickerGroup aria-label="Selected people">
                  {selectedOptions.map(option => (
                    <Tag key={option} value={option}>
                      {option}
                    </Tag>
                  ))}
                </TagPickerGroup>
                <TagPickerInput aria-label="Choose a suggestion" />
              </TagPickerControl>
              <TagPickerList data-testid="picker-popup">
                {remainingOptions.map(option => (
                  <TagPickerOption key={option} value={option}>
                    {option}
                  </TagPickerOption>
                ))}
              </TagPickerList>
            </TagPicker>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Close dialog</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </FluentProvider>
  );
};

describe('TagPicker Dialog positioning workaround', () => {
  it('corrects final alignment on entry and reopening while preserving selected people', () => {
    cy.viewport(1000, 800);
    const onEntryStart = cy.stub().as('entryStart');
    const onEntryFinish = cy.stub().as('entryFinish');
    mount(<DialogWithTagPicker onEntryStart={onEntryStart} onEntryFinish={onEntryFinish} />);

    const checkAlignment = () =>
      cy.get('[data-testid="picker-popup"]').should(popup => {
        const target = popup[0].ownerDocument.querySelector<HTMLElement>('[data-testid="picker-target"]')!;
        const reference = target.getBoundingClientRect();
        const positioned = popup[0].getBoundingClientRect();
        expect(Math.abs(positioned.left - reference.left), 'left alignment').to.be.lessThan(2);
        expect(Math.abs(positioned.top - reference.bottom), 'bottom alignment').to.be.lessThan(2);
      });

    cy.contains('button', 'Open dialog').click();
    cy.get('@entryStart').should('have.been.calledOnce').and('have.been.calledWithExactly', true);
    cy.get('[data-testid="picker-popup"]').should('be.visible');
    cy.get('@entryFinish').should('have.been.calledOnce');
    checkAlignment();
    cy.contains('[role="option"]', 'John Doe').click();
    cy.get('[aria-label="Selected people"]').should('contain.text', 'John Doe');
    cy.contains('button', 'Close dialog').click();
    cy.get('[data-testid="dialog-surface"]').should('not.exist');
    cy.get('[data-testid="picker-popup"]').should('not.exist');

    cy.contains('button', 'Open dialog').click();
    cy.get('@entryStart').should('have.been.calledTwice').and('have.always.been.calledWithExactly', true);
    cy.get('[data-testid="picker-popup"]').should('be.visible');
    cy.get('[aria-label="Selected people"]').should('contain.text', 'John Doe');
    cy.get('[data-testid="picker-popup"] [role="option"]').should('have.length', 1).and('contain.text', 'Jane Doe');
    cy.get('@entryFinish').should('have.been.calledTwice');
    checkAlignment();
  });
});
