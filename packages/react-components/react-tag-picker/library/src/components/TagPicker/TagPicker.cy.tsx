import * as React from 'react';
import { mount as mountBase } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { TagPickerProps } from './TagPicker.types';
import { TagPicker } from './TagPicker';
import { TagPickerControl } from '../TagPickerControl/TagPickerControl';
import { TagPickerGroup } from '../TagPickerGroup/TagPickerGroup';
import { Tag } from '@fluentui/react-tags';
import { TagPickerInput } from '../TagPickerInput/TagPickerInput';
import { TagPickerList } from '../TagPickerList/TagPickerList';
import { TagPickerOption } from '../TagPickerOption/TagPickerOption';
import { Avatar } from '@fluentui/react-avatar';
import { Button } from '@fluentui/react-button';

/**
 * This error means that ResizeObserver
 * was not able to deliver all observations within a single animation frame.
 * https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
 */
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
Cypress.on('uncaught:exception', err => {
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false;
  }
});

const mount = (element: JSX.Element) => {
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

type TagPickerControlledProps = Pick<TagPickerProps, 'open' | 'defaultOpen' | 'defaultSelectedOptions'>;

const TagPickerControlled = ({ open, defaultOpen, defaultSelectedOptions = [] }: TagPickerControlledProps) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(defaultSelectedOptions);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };
  const handleAllClear: React.MouseEventHandler = event => {
    setSelectedOptions([]);
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <TagPicker
        onOptionSelect={onOptionSelect}
        selectedOptions={selectedOptions}
        open={open}
        defaultOpen={defaultOpen}
      >
        <TagPickerControl
          expandIcon={{ 'data-testid': 'tag-picker-control__expandIcon' } as {}}
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
          <TagPickerInput data-testid="tag-picker-input" />
        </TagPickerControl>
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
      </TagPicker>
    </div>
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
      cy.get('[data-testid="tag-picker-control__expandIcon"]').realClick();
      cy.get('[data-testid="tag-picker-list"]').should('be.visible');
      cy.get('[data-testid="tag-picker-input"]').should('be.focused');
      cy.get('[data-testid="tag-picker-control__expandIcon"]').realClick();
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
    // FIXME: this test is flaky - make it more robust
    it.skip('should open/close a listbox once surface (tag group) is clicked', () => {
      mount(<TagPickerControlled defaultSelectedOptions={options} />);
      cy.get('[data-testid="tag-picker-list"]').should('not.exist');
      cy.get('[data-testid="tag-picker-group"]').realClick();
      cy.get('[data-testid="tag-picker-list"]').should('be.visible');
      cy.get('[data-testid="tag-picker-input"]').should('be.focused');
      cy.get('[data-testid="tag-picker-group"]').realClick();
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
      cy.get('[data-testid="tag-picker-input"]').focus();
      cy.get('[data-testid="tag-picker-list"]').should('exist').should('not.be.visible');
    });
    (['Enter', 'ArrowDown', 'ArrowUp'] as const).forEach(keypress => {
      it(`should open listbox on input ${keypress} key press`, () => {
        mount(<TagPickerControlled />);
        cy.get('[data-testid="tag-picker-list"]').should('not.exist');
        cy.get('[data-testid="tag-picker-input"]').focus().realPress(keypress);
        cy.get('[data-testid="tag-picker-list"]').should('exist').should('be.visible');
        cy.get(`[data-testid="tag-picker-input"]`).should('have.attr', 'aria-activedescendant', `tag-picker-option--0`);
      });
    });
    it('should not open listbox on input Space key press', () => {
      mount(<TagPickerControlled />);
      cy.get('[data-testid="tag-picker-list"]').should('not.exist');
      cy.get('[data-testid="tag-picker-input"]').focus().realPress('Space');
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
        cy.get('[data-testid="tag-picker-input"]').focus().realPress('Enter');
        cy.get('[data-testid="tag-picker-list"]').should('exist').should('be.visible');
        cy.get(`[data-testid="tag-picker-input"]`).should('have.attr', 'aria-expanded', 'true');
        cy.get(`[data-testid="tag-picker-input"]`).should('have.attr', 'aria-activedescendant', `tag-picker-option--0`);
        cy.get('[data-testid="tag-picker-input"]').focus().realPress(keypress);
        cy.get('[data-testid="tag-picker-list"]').should('exist').should('not.be.visible');
        cy.get(`[data-testid="tag-picker-input"]`).should('have.attr', 'aria-expanded', 'false');
        cy.get('[data-testid="tag-picker-input"]').focus().realPress(['Tab']);
        cy.get(`[data-testid="tag-picker-input"]`).should('not.have.attr', 'aria-activedescendant');
        cy.get(`[data-testid="tag-picker-option--0"]`).should('not.exist');
        cy.get(`[data-testid="tag--${options[0]}"]`).should('exist');
      }),
    );
    describe('Tags', () => {
      it('should focus on last tag on Shift + Tab', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);
        cy.get(`[data-testid="tag--${options[0]}"]`).should('exist');
        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`).should('exist');
        cy.get('[data-testid="tag-picker-input"]').focus().realPress(['Shift', 'Tab']);
        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`).should('be.focused');
      });
      it('should not navigate circularly between tags with Arrow key press', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);
        cy.get(`[data-testid="tag--${options[0]}"]`).focus().realPress('ArrowRight');
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
        cy.get(`[data-testid="tag-picker-input"]`).focus().realPress('ArrowLeft');
        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`)
          .should('be.focused')
          .realPress('ArrowRight');
        cy.get(`[data-testid="tag-picker-input"]`).should('be.focused');
      });
      it('should memorize last focused tag while switching focus between tags and input', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);
        cy.get(`[data-testid="tag--${options[0]}"]`).focus().realPress('ArrowRight');
        cy.get(`[data-testid="tag--${options[1]}"]`).should('be.focused').realPress('Tab');
        cy.get('[data-testid="tag-picker-input"]').should('be.focused').realPress(['Shift', 'Tab']);
        cy.get(`[data-testid="tag--${options[1]}"]`).should('be.focused');
      });
      it('should remove tag on Backspace key press and focus on next one', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);
        cy.get(`[data-testid="tag--${options[0]}"]`).focus().realPress('Backspace').should('not.exist');
        cy.get(`[data-testid="tag--${options[1]}"]`).should('be.focused');
      });
      it('should move to last tag on Backspace key press on input', () => {
        mount(<TagPickerControlled defaultSelectedOptions={options} />);
        cy.get('[data-testid="tag-picker-input"]').focus().realPress('Backspace');
        cy.get(`[data-testid="tag--${options[options.length - 1]}"]`).should('be.focused');
      });
      it('should focus on input once all tags have been removed', () => {
        mount(<TagPickerControlled defaultSelectedOptions={[options[0]]} />);
        cy.get(`[data-testid="tag--${options[0]}"]`).focus().realPress('Backspace').should('not.exist');
        cy.get('[data-testid="tag-picker-input"]').should('be.focused');
      });
    });
  });
});
