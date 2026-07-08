import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import type { TagPickerProps } from './TagPicker.types';
import { TagPicker } from './TagPicker';
import { TagPickerControl } from '../TagPickerControl/TagPickerControl';
import { TagPickerGroup } from '../TagPickerGroup/TagPickerGroup';
import { Tag } from '@fluentui/react-tags';
import { TagPickerInput } from '../TagPickerInput/TagPickerInput';
import { TagPickerList } from '../TagPickerList/TagPickerList';
import { TagPickerOption } from '../TagPickerOption/TagPickerOption';
import { Avatar } from '@fluentui/react-avatar';
import { Button } from '@fluentui/react-button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogSurface,
  DialogTrigger,
  type DialogProps,
} from '@fluentui/react-dialog';

import 'cypress-real-events';
import { tagPickerControlClassNames } from '../TagPickerControl/useTagPickerControlStyles.styles';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

type TagPickerControlledProps = Pick<TagPickerProps, 'open' | 'defaultOpen' | 'defaultSelectedOptions' | 'noPopover'>;

const TagPickerControlled = ({
  open,
  defaultOpen,
  defaultSelectedOptions = [],
  noPopover = false,
}: TagPickerControlledProps) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(defaultSelectedOptions);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_, data) => setSelectedOptions(data.selectedOptions);
  const handleAllClear: React.MouseEventHandler = _ => setSelectedOptions([]);

  return (
    <div style={{ display: 'flex', maxWidth: 400, flexDirection: 'column', gap: 20 }}>
      <button id="before-button">Before</button>

      <TagPicker
        noPopover={noPopover}
        onOptionSelect={onOptionSelect}
        selectedOptions={selectedOptions}
        open={open}
        defaultOpen={defaultOpen}
        inline
      >
        <TagPickerControl
          data-testid="tag-picker-control"
          secondaryAction={
            <Button
              data-testid="tag-picker-control__secondaryAction"
              appearance="transparent"
              size="small"
              shape="rounded"
              onClick={handleAllClear}
            >
              All Clear
            </Button>
          }
        >
          <TagPickerGroup data-testid="tag-picker-group">
            {selectedOptions.map(option => (
              <Tag
                data-testid={`tag--${option}`}
                key={option}
                shape="rounded"
                media={<Avatar name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput data-testid="tag-picker-input" aria-labelledby="Selected Employees" />
        </TagPickerControl>
        {noPopover ? undefined : (
          <TagPickerList data-testid="tag-picker-list">
            {options
              .filter(option => !selectedOptions.includes(option))
              .map((option, index) => (
                <TagPickerOption
                  id={`tag-picker-option--${index}`}
                  data-testid={`tag-picker-option--${option}`}
                  secondaryContent="Microsoft FTE"
                  media={<Avatar name={option} color="colorful" />}
                  value={option}
                  key={option}
                >
                  {option}
                </TagPickerOption>
              ))}
          </TagPickerList>
        )}
      </TagPicker>

      <button id="after-button">After</button>
    </div>
  );
};

const TagPickerInAnimatedDialog = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [loadedOptions, setLoadedOptions] = React.useState<string[]>([]);
  const hasLoadedOnceRef = React.useRef(false);
  const animatedHostRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!dialogOpen) {
      return;
    }

    // Simulate dialog surface motion to reproduce stale positioning if not updated after animation.
    const animation = animatedHostRef.current?.animate(
      [{ transform: 'translate3d(40px, 21px, 0)' }, { transform: 'translate3d(0, 0, 0)' }],
      { duration: 250, easing: 'ease-out', fill: 'forwards' },
    );

    return () => animation?.cancel();
  }, [dialogOpen]);

  React.useEffect(() => {
    if (!dialogOpen) {
      return;
    }

    if (hasLoadedOnceRef.current) {
      setLoadedOptions(options);
      return;
    }

    setLoadedOptions([]);
    const timeoutId = setTimeout(() => {
      hasLoadedOnceRef.current = true;
      setLoadedOptions(options);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [dialogOpen]);

  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_, data) => {
    if (data.value === 'no-options') {
      return;
    }

    setSelectedOptions(data.selectedOptions);
  };

  const onOpenChange: DialogProps['onOpenChange'] = (_, data) => setDialogOpen(data.open);
  const tagPickerOptions = loadedOptions.filter(option => !selectedOptions.includes(option));

  return (
    <Dialog open={dialogOpen} onOpenChange={onOpenChange}>
      <DialogTrigger disableButtonEnhancement>
        <Button data-testid="open-dialog">Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <div ref={animatedHostRef}>
            <TagPicker
              onOptionSelect={onOptionSelect}
              selectedOptions={selectedOptions}
              open={tagPickerOptions.length > 0}
            >
              <TagPickerControl data-testid="dialog-tag-picker-control">
                <TagPickerGroup>
                  {selectedOptions.map(option => (
                    <Tag key={option} shape="rounded" media={<Avatar name={option} color="colorful" />} value={option}>
                      {option}
                    </Tag>
                  ))}
                </TagPickerGroup>
                <TagPickerInput aria-label="Select Employees" />
              </TagPickerControl>
              <TagPickerList data-testid="dialog-tag-picker-list">
                {tagPickerOptions.length > 0 ? (
                  tagPickerOptions.map(option => (
                    <TagPickerOption media={<Avatar name={option} color="colorful" />} value={option} key={option}>
                      {option}
                    </TagPickerOption>
                  ))
                ) : (
                  <TagPickerOption value="no-options">No options available</TagPickerOption>
                )}
              </TagPickerList>
            </TagPicker>
          </div>

          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" data-testid="close-dialog">
                Close
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

describe('TagPicker', () => {
  it('should render a closed listbox', () => {
    mount(<TagPickerControlled />);

    cy.get('[data-testid="tag-picker-control"]').should('exist');
    cy.get('[data-testid="tag-picker-list"]').should('not.exist');
  });

  it('should render an opened listbox', () => {
    mount(<TagPickerControlled open />);

    cy.get('[data-testid="tag-picker-control"]').should('exist');
    cy.get('[data-testid="tag-picker-list"]').should('be.visible');
  });

  describe('Mouse navigation', () => {
    it('should open/close a listbox once trigger is clicked', () => {
      mount(<TagPickerControlled />);

      cy.get('[data-testid="tag-picker-list"]').should('not.exist');
      cy.get('[data-testid="tag-picker-input"]').realClick();
      cy.get('[data-testid="tag-picker-list"]').should('be.visible');
      cy.get('[data-testid="tag-picker-input"]').should('be.focused');
      cy.get('[data-testid="tag-picker-input"]').realClick();
      cy.get('[data-testid="tag-picker-list"]').should('not.be.visible');
    });

    it('should open/close a listbox once expandIcon is clicked', () => {
      mount(<TagPickerControlled />);

      cy.get('[data-testid="tag-picker-list"]').should('not.exist');
      cy.get(`.${tagPickerControlClassNames.expandIcon}`).realClick();
      cy.get('[data-testid="tag-picker-list"]').should('be.visible');
      cy.get('[data-testid="tag-picker-input"]').should('be.focused');
      cy.get(`.${tagPickerControlClassNames.expandIcon}`).realClick();
      cy.get('[data-testid="tag-picker-list"]').should('not.be.visible');
    });

    it('should open/close a listbox once surface (control) is clicked', () => {
      mount(<TagPickerControlled />);

      cy.get('[data-testid="tag-picker-list"]').should('not.exist');
      cy.get('[data-testid="tag-picker-control"]').realClick();
      cy.get('[data-testid="tag-picker-list"]').should('be.visible');
      cy.get('[data-testid="tag-picker-input"]').should('be.focused');
      cy.get('[data-testid="tag-picker-control"]').realClick();
      cy.get('[data-testid="tag-picker-list"]').should('not.be.visible');
    });

    it('should open/close a listbox once surface (tag group) is clicked', () => {
      mount(<TagPickerControlled defaultSelectedOptions={options} />);

      cy.get('[data-testid="tag-picker-list"]').should('not.exist');
      cy.get('[data-testid="tag-picker-group"]').realClick({ x: 1, y: 1 }); // make sure to not click on tag
      cy.get('[data-testid="tag-picker-list"]').should('be.visible');
      cy.get('[data-testid="tag-picker-input"]').should('be.focused');
      cy.get('[data-testid="tag-picker-group"]').realClick({ x: 1, y: 1 });
      cy.get('[data-testid="tag-picker-list"]').should('not.be.visible');
    });

    it('should not open/close a listbox once secondary action is clicked', () => {
      mount(<TagPickerControlled />);

      cy.get('[data-testid="tag-picker-list"]').should('not.exist');
      cy.get('[data-testid="tag-picker-control__secondaryAction"]').realClick();
      cy.get('[data-testid="tag-picker-list"]').should('not.exist');
    });

    it('should select a tag on option click', () => {
      mount(<TagPickerControlled defaultOpen />);

      cy.get('[data-testid="tag-picker-list"]').should('be.visible');
      cy.get(`[data-testid="tag-picker-option--${options[0]}"]`).should('exist').realClick();
      cy.get('[data-testid="tag-picker-list"]').should('not.be.visible');
      cy.get(`[data-testid="tag--${options[0]}"]`).should('exist');
      cy.get('[data-testid="tag-picker-input"]').should('be.focused');
    });

    it('should dismiss a tag on tag click', () => {
      mount(<TagPickerControlled defaultOpen />);

      cy.get(`[data-testid="tag-picker-option--${options[0]}"]`).realClick();
      cy.get(`[data-testid="tag--${options[0]}"]`).should('exist').realClick().should('not.exist');
      cy.get('[data-testid="tag-picker-input"]').should('be.focused');
    });

    it('should dismiss a tag on clear all click', () => {
      mount(<TagPickerControlled defaultOpen />);

      cy.get(`[data-testid="tag-picker-option--${options[0]}"]`).realClick();
      cy.get(`[data-testid="tag--${options[0]}"]`).should('exist').realClick();
      cy.get('[data-testid="tag-picker-input"]').should('be.focused');
      cy.get('[data-testid="tag-picker-control__secondaryAction"]').should('exist').realClick();
      cy.get(`[data-testid="tag--${options[0]}"]`).should('not.exist');
    });
  });

  describe('Keyboard navigation', () => {
    it('should not open listbox on input focus', () => {
      mount(<TagPickerControlled />);

      cy.get('[data-testid="tag-picker-list"]').should('not.exist');
      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="tag-picker-input"]').should('be.focused');
      cy.get('[data-testid="tag-picker-list"]').should('exist').should('not.be.visible');
    });

    (['Enter', 'ArrowDown', 'ArrowUp'] as const).forEach(keypress => {
      it(`should open listbox on input ${keypress} key press`, () => {
        mount(<TagPickerControlled />);

        cy.get('[data-testid="tag-picker-list"]').should('not.exist');
        cy.get('#before-button').realClick().realPress('Tab');
        cy.get('[data-testid="tag-picker-input"]').should('be.focused').realPress(keypress);
        cy.get('[data-testid="tag-picker-list"]').should('exist').should('be.visible');
        cy.get(`[data-testid="tag-picker-input"]`).should('have.attr', 'aria-activedescendant', `tag-picker-option--0`);
      });
    });

    it('should not open listbox on input Space key press', () => {
      mount(<TagPickerControlled />);

      cy.get('[data-testid="tag-picker-list"]').should('not.exist');
      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="tag-picker-input"]').should('be.focused').realPress('Space');
      cy.get('[data-testid="tag-picker-list"]').should('exist').should('not.be.visible');
    });

    it('should close listbox on input Escape key press', () => {
      mount(<TagPickerControlled defaultOpen />);

      cy.get('[data-testid="tag-picker-list"]').should('be.visible');
      cy.get(`[data-testid="tag-picker-input"]`).should('have.attr', 'aria-activedescendant', `tag-picker-option--0`);
      cy.get(`[data-testid="tag-picker-input"]`).should('have.attr', 'aria-expanded', 'true');
      cy.get('[data-testid="tag-picker-input"]').focus().realPress('Escape');
      cy.get('[data-testid="tag-picker-list"]').should('exist').should('not.be.visible');
      cy.get(`[data-testid="tag-picker-input"]`).should('have.attr', 'aria-expanded', 'false');
    });

    (['ArrowDown', 'ArrowUp'] as const).forEach(keypress =>
      it(`should move aria-activedescendant on ${keypress}`, () => {
        mount(<TagPickerControlled defaultOpen />);

        cy.get('[data-testid="tag-picker-list"]').should('be.visible');
        cy.get(`[data-testid="tag-picker-input"]`).should('have.attr', 'aria-activedescendant', `tag-picker-option--0`);
        cy.get('[data-testid="tag-picker-input"]').focus().realPress('ArrowDown');
        cy.get(`[data-testid="tag-picker-input"]`).should('have.attr', 'aria-activedescendant', `tag-picker-option--1`);
        cy.get('[data-testid="tag-picker-input"]').focus().realPress(keypress);
        cy.get(`[data-testid="tag-picker-input"]`).should(
          'have.attr',
          'aria-activedescendant',
          `tag-picker-option--${keypress === 'ArrowDown' ? 2 : 0}`,
        );
      }),
    );

    (['Enter', 'Space'] as const).forEach(keypress =>
      it(`should close listbox and select activedescendant on ${keypress} key press`, () => {
        mount(<TagPickerControlled />);

        cy.get('[data-testid="tag-picker-list"]').should('not.exist');
        cy.get(`[data-testid="tag--${options[0]}]"`).should('not.exist');

        cy.get('#before-button').realClick().realPress('Tab');
        cy.get('[data-testid="tag-picker-input"]').should('be.focused').realPress('Enter');
        cy.get('[data-testid="tag-picker-list"]').should('exist').should('be.visible');
        cy.get(`[data-testid="tag-picker-input"]`).should('have.attr', 'aria-expanded', 'true');
        cy.get(`[data-testid="tag-picker-input"]`).should('have.attr', 'aria-activedescendant', `tag-picker-option--0`);

        cy.get('[data-testid="tag-picker-input"]').should('be.focused').realPress(keypress);
        cy.get('[data-testid="tag-picker-list"]').should('exist').should('not.be.visible');
        cy.get(`[data-testid="tag-picker-input"]`).should('have.attr', 'aria-expanded', 'false');

        cy.get('[data-testid="tag-picker-input"]').should('be.focused').realPress('Tab');
        cy.get(`[data-testid="tag-picker-input"]`).should('not.have.attr', 'aria-activedescendant');
        cy.get(`[data-testid="tag-picker-option--0"]`).should('not.exist');
        cy.get(`[data-testid="tag--${options[0]}"]`).should('exist');
      }),
    );

    describe('Tags', () => {
      it('should focus on last tag on Shift + Tab', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);

        cy.get(`[data-testid="tag--${options[0]}"]`).should('be.visible');
        cy.get('[data-testid="tag-picker-control__secondaryAction"]').should('be.visible');
        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`).should('be.visible');

        cy.get('#after-button').realClick().realPress(['Shift', 'Tab']);
        cy.get('[data-testid="tag-picker-control__secondaryAction"]').should('be.focused').realPress(['Shift', 'Tab']);
        cy.get('[data-testid="tag-picker-input"]').should('be.focused').realPress(['Shift', 'Tab']);
        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`).should('be.focused');
      });

      it('should not navigate circularly between tags with Arrow key press', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);

        cy.get('#before-button').realClick().realPress('Tab');
        cy.get(`[data-testid="tag--${options[0]}"]`).should('be.focused').realPress('ArrowRight');
        cy.get(`[data-testid="tag--${options[1]}"]`).should('be.focused').realPress('ArrowDown');
        cy.get(`[data-testid="tag--${options[2]}"]`).should('be.focused').realPress('ArrowLeft');
        cy.get(`[data-testid="tag--${options[1]}"]`).should('be.focused').realPress('ArrowUp');
        cy.get(`[data-testid="tag--${options[0]}"]`).should('be.focused').realPress('ArrowUp');
        cy.get(`[data-testid="tag--${options[0]}"]`).should('be.focused');

        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`)
          .focus()
          .realPress('ArrowRight');
        cy.get(`[data-testid="tag--${options[0]}"]`).should('not.be.focused');
      });

      it('should navigate from tags to input and back with Arrow key press', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);

        cy.get('#before-button').realClick().realPress('Tab');
        cy.get(`[data-testid="tag--${options[0]}"]`).should('be.focused').realPress('Tab');
        cy.get(`[data-testid="tag-picker-input"]`).should('be.focused').realPress('ArrowLeft');
        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`)
          .should('be.focused')
          .realPress('ArrowRight');
        cy.get(`[data-testid="tag-picker-input"]`).should('be.focused');
      });

      it('should memorize last focused tag while switching focus between tags and input', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);

        cy.get('#before-button').realClick().realPress('Tab');
        cy.get(`[data-testid="tag--${options[0]}"]`).should('be.focused').realPress('ArrowRight');
        cy.get(`[data-testid="tag--${options[1]}"]`).should('be.focused').realPress('Tab');
        cy.get('[data-testid="tag-picker-input"]').should('be.focused').realPress(['Shift', 'Tab']);
        cy.get(`[data-testid="tag--${options[1]}"]`).should('be.focused');
      });

      it('should remove tag on Backspace key press and focus on next one', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);

        cy.get('#before-button').realClick().realPress('Tab');
        cy.get(`[data-testid="tag--${options[0]}"]`).should('be.focused').realPress('Backspace').should('not.exist');
        cy.get(`[data-testid="tag--${options[1]}"]`).should('be.focused');
      });

      it('should focus on input once all tags have been removed', () => {
        mount(<TagPickerControlled defaultSelectedOptions={[options[0]]} />);

        cy.get('#before-button').realClick().realPress('Tab');
        cy.get(`[data-testid="tag--${options[0]}"]`).should('be.focused').realPress('Backspace').should('not.exist');
        cy.get('[data-testid="tag-picker-input"]').should('be.focused');
      });
    });

    describe('input', () => {
      it('should move to last tag on Backspace key press on input, when input is empty', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);

        cy.get('#after-button').realClick().realPress(['Shift', 'Tab']);
        cy.get('[data-testid="tag-picker-control__secondaryAction"]').should('be.focused').realPress(['Shift', 'Tab']);
        cy.get('[data-testid="tag-picker-input"]').should('be.focused').realPress('Backspace');
        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`).should('be.focused');
      });

      it('should delete input content on Backspace when input is not empty', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);

        cy.get('#after-button').realClick().realPress(['Shift', 'Tab']);
        cy.get('[data-testid="tag-picker-control__secondaryAction"]').should('be.focused').realPress(['Shift', 'Tab']);
        cy.get('[data-testid="tag-picker-input"]').should('be.focused').realType('Some Text').realPress('Backspace');
        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`).should('not.be.focused');
        cy.get('[data-testid="tag-picker-input"]').should('have.value', 'Some Tex').should('be.focused');
      });

      it('should move to last tag on Backspace key press on input, when input is not empty but the cursor is on the first character', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);

        cy.get('#after-button').realClick().realPress(['Shift', 'Tab']);
        cy.get('[data-testid="tag-picker-control__secondaryAction"]').should('be.focused').realPress(['Shift', 'Tab']);
        cy.get('[data-testid="tag-picker-input"]').should('be.focused').realType('SomeText').realPress('Backspace');
        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`).should('not.be.focused');

        cy.get('[data-testid="tag-picker-input"]').should('be.focused').should('have.value', 'SomeTex');
        cy.get('[data-testid="tag-picker-input"]')
          // TODO: we should be able to use realType here, but it does not as expected
          .type('{moveToStart}')
          .realPress('Backspace');
        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`).should('be.focused');
      });

      it('should delete input content on Backspace when input is not empty and selected', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);

        cy.get('#after-button').realClick().realPress(['Shift', 'Tab']);
        cy.get('[data-testid="tag-picker-control__secondaryAction"]').should('be.focused').realPress(['Shift', 'Tab']);
        cy.get('[data-testid="tag-picker-input"]').should('be.focused').realType('SomeText').realPress('Backspace');
        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`).should('not.be.focused');

        cy.get('[data-testid="tag-picker-input"]').should('be.focused').should('have.value', 'SomeTex');
        cy.get('[data-testid="tag-picker-input"]')
          // TODO: we should be able to use realType here, but it does not as expected
          .type('{selectAll}')
          .realPress('Backspace');
        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`).should('not.be.focused');
        cy.get('[data-testid="tag-picker-input"]').should('have.value', '').should('be.focused');
      });
    });
  });

  describe('Expand Icon', () => {
    it('should update aria-label and aria-labelledby on input change', () => {
      mount(<TagPickerControlled />);

      cy.get(`.${tagPickerControlClassNames.expandIcon}`).should('exist');
      cy.get('[data-testid="tag-picker-input"]').should('have.attr', 'aria-labelledby', 'Selected Employees');
      cy.get(`.${tagPickerControlClassNames.expandIcon}`)
        .should('have.attr', 'aria-labelledby')
        .and('contain', 'Selected Employees');

      cy.get('[data-testid="tag-picker-input"]')
        .invoke('attr', 'aria-labelledby', 'New Labelled By')
        .should('have.attr', 'aria-labelledby', 'New Labelled By');
      cy.get(`.${tagPickerControlClassNames.expandIcon}`)
        .should('have.attr', 'aria-labelledby')
        .and('contain', 'New Labelled By');
    });
  });

  it('should not render popover when "noPopover"', () => {
    mount(<TagPickerControlled noPopover />);

    cy.get('[data-testid="tag-picker-control"]').should('exist');
    cy.get(`.${tagPickerControlClassNames.expandIcon}`).should('not.exist');
    cy.get('[data-testid="tag-picker-list"]').should('not.exist');
    cy.get('[data-testid="tag-picker-input"]').realClick();
    cy.get('[data-testid="tag-picker-list"]').should('not.exist');
  });

  describe('Dialog integration', () => {
    it('keeps listbox aligned after dialog reopen during entry animation', () => {
      mount(<TagPickerInAnimatedDialog />);

      cy.get('[data-testid="open-dialog"]').realClick();
      cy.get('[data-testid="dialog-tag-picker-list"]').should('be.visible');

      cy.get('[data-testid="close-dialog"]').realClick();
      cy.get('[data-testid="open-dialog"]').realClick();
      cy.get('[data-testid="dialog-tag-picker-list"]').should('be.visible');

      // Verify final resting alignment after the motion settles.
      cy.wait(300);

      cy.get('[data-testid="dialog-tag-picker-control"]').then($control => {
        const controlRect = $control[0].getBoundingClientRect();

        cy.get('[data-testid="dialog-tag-picker-list"]').then($list => {
          const listRect = $list[0].getBoundingClientRect();
          const horizontalOffset = Math.abs(listRect.left - controlRect.left);
          const verticalOffset = listRect.top - controlRect.bottom;

          expect(horizontalOffset).to.be.lessThan(6);
          expect(verticalOffset).to.be.within(-2, 12);
        });
      });
    });
  });
});
