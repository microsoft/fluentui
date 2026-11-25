import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';

import { Tag } from '../Tag';
import { TagPicker } from './TagPicker';
import type { TagPickerProps } from './TagPicker.types';
import { TagPickerControl } from './TagPickerControl';
import type { TagPickerControlProps } from './TagPickerControl';
import { TagPickerGroup } from './TagPickerGroup';
import { TagPickerInput } from './TagPickerInput';
import { TagPickerList } from './TagPickerList';
import { TagPickerOption } from './TagPickerOption';

polyfillBodyAndObserve();

const options = ['Cat', 'Dog', 'Ferret'];
const input = '[data-testid="tag-picker-input"]';
const listbox = '[data-testid="tag-picker-list"]';

type TagPickerFixtureProps = Pick<TagPickerProps, 'defaultOpen' | 'noPopover'> & {
  defaultSelectedOptions?: string[];
  controlProps?: TagPickerControlProps;
};

const TagPickerFixture = ({
  defaultOpen,
  defaultSelectedOptions = [],
  noPopover,
  controlProps,
}: TagPickerFixtureProps) => {
  const [selectedOptions, setSelectedOptions] = React.useState(defaultSelectedOptions);

  return (
    <>
      <button id="before">Before</button>
      <TagPicker
        defaultOpen={defaultOpen}
        noPopover={noPopover}
        positioning={{ position: 'below', align: 'start', matchTargetSize: 'width' }}
        selectedOptions={selectedOptions}
        onOptionSelect={(_, data) => setSelectedOptions(data.selectedOptions)}
      >
        <TagPickerControl data-testid="tag-picker-control" {...controlProps}>
          <TagPickerGroup aria-label="Selected animals">
            {selectedOptions.map(option => (
              <Tag data-testid={`tag-${option}`} key={option} value={option}>
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput data-testid="tag-picker-input" aria-label="Select animals" />
        </TagPickerControl>
        {noPopover ? undefined : (
          <TagPickerList data-testid="tag-picker-list">
            {options
              .filter(option => !selectedOptions.includes(option))
              .map((option, index) => (
                <TagPickerOption data-testid={`option-${option}`} id={`option-${index}`} key={option} value={option}>
                  {option}
                </TagPickerOption>
              ))}
          </TagPickerList>
        )}
      </TagPicker>
      <button id="after">After</button>
    </>
  );
};

describe('TagPicker', () => {
  it('keeps the native popover open after clicking the control and closes it on the next click', () => {
    mount(<TagPickerFixture />);

    cy.get('[data-testid="tag-picker-control"]').realClick();
    cy.get(input).should('have.attr', 'aria-expanded', 'true').and('be.focused');
    cy.get(listbox).should('match', ':popover-open');
    cy.get('[data-testid="tag-picker-control"]').realClick();
    cy.get(input).should('have.attr', 'aria-expanded', 'false').and('be.focused');
    cy.get(listbox).should('not.be.visible');
  });

  (['onMouseDown', 'onClick'] as const).forEach(handler => {
    it(`allows ${handler} to cancel opening from the control`, () => {
      mount(
        <TagPickerFixture
          controlProps={{ [handler]: (event: React.MouseEvent<HTMLDivElement>) => event.preventDefault() }}
        />,
      );

      cy.get('[data-testid="tag-picker-control"]').realClick();
      cy.get(input).should('have.attr', 'aria-expanded', 'false');
      cy.get('body').should(body => expect(body.find(`${listbox}:popover-open`)).to.have.length(0));
    });

    it(`does not undo native light dismiss when ${handler} cancels an open control gesture`, () => {
      mount(
        <TagPickerFixture
          defaultOpen
          controlProps={{ [handler]: (event: React.MouseEvent<HTMLDivElement>) => event.preventDefault() }}
        />,
      );

      cy.get(listbox).should('match', ':popover-open');
      cy.get('[data-testid="tag-picker-control"]').realClick();
      cy.get(input).should('have.attr', 'aria-expanded', 'false');
      cy.get('body').should(body => expect(body.find(`${listbox}:popover-open`)).to.have.length(0));
    });
  });

  it('opens from the input and selects an option', () => {
    mount(<TagPickerFixture />);

    cy.get(listbox).should('not.exist');
    cy.get(input).realClick();
    cy.get(listbox).should('exist');
    cy.get('[data-testid="option-Cat"]').realClick();
    cy.get('[data-testid="tag-Cat"]').should('exist');
    cy.get(listbox).should('not.be.visible');
    cy.get(input).should('have.attr', 'aria-expanded', 'false');
    cy.get(input).should('be.focused');
  });

  it('uses active-descendant keyboard navigation', () => {
    mount(<TagPickerFixture />);

    cy.get(input).focus().realPress('ArrowDown');
    cy.get(listbox).should('exist');
    cy.get(input).should('have.attr', 'aria-activedescendant', 'option-0').realPress('ArrowDown');
    cy.get(input).should('have.attr', 'aria-activedescendant', 'option-1').realPress('Enter');
    cy.get('[data-testid="tag-Dog"]').should('exist');
  });

  it('moves from an empty input to the last tag with Backspace', () => {
    mount(<TagPickerFixture defaultSelectedOptions={['Cat', 'Dog']} />);

    cy.get(input).focus().realPress('Backspace');
    cy.get('[data-testid="tag-Dog"]').should('be.focused');
  });

  it('uses focusgroup arrow navigation between tags', () => {
    mount(<TagPickerFixture defaultSelectedOptions={['Cat', 'Dog']} />);

    cy.get('[aria-label="Selected animals"]')
      .should('have.attr', 'focusgroup', 'toolbar inline wrap')
      .and('not.have.attr', 'data-tabster');
    cy.get('[data-testid="tag-Cat"]').should('have.attr', 'tabindex', '0').focus().realPress('ArrowRight');
    cy.get('[data-testid="tag-Dog"]').should('be.focused');
    cy.get('[data-testid="tag-Dog"]').realPress('ArrowRight');
    cy.get(input).should('be.focused');
  });

  it('does not render a list when noPopover is enabled', () => {
    mount(<TagPickerFixture noPopover />);

    cy.get(input).realClick();
    cy.get(listbox).should('not.exist');
  });
});
