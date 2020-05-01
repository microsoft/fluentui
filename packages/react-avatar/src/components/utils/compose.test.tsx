import * as React from 'react';
import { compose } from './compose';
import { mount } from 'enzyme';
import { StylesheetProvider } from '@fluentui/react-stylesheets';

describe('compose', () => {
  it('registers stylesheets in the correct order', () => {
    // Create a base component
    const SomeSlotBase = compose(() => <div />, { stylesheet: 'slotbase' });
    // Create a derived from base component
    const SomeSlot = compose(SomeSlotBase, { stylesheet: 'slot' });

    // Create another base
    const SomeComponentBase = compose(() => <div />, { stylesheet: 'componentbase' });

    // Create another derived from base, with the original derived as a slot.
    const SomeComponent = compose(SomeComponentBase, { slots: { thing: SomeSlot }, stylesheet: 'component' });

    let registeredSheets: string[] = [];

    const renderStyles = (stylesheets: string[]) => {
      registeredSheets = [...registeredSheets, ...stylesheets];
    };

    mount(
      <StylesheetProvider renderStyles={renderStyles}>
        <SomeComponent />
      </StylesheetProvider>,
    );

    expect(registeredSheets).toEqual(['slotbase', 'slot', 'componentbase', 'component']);
  });
});
