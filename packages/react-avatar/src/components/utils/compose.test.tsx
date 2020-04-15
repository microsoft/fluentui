console.warn = () => {
  /* */
};

import * as React from 'react';
import { compose } from './compose';
import { mount } from 'enzyme';
import { StylesheetProvider } from '../utils/StylesheetProvider';

describe('compose', () => {
  it('registers stylesheets in the correct order', () => {
    const SomeSlotBase = compose(() => <div />, { stylesheet: 'slotbase' });
    const SomeSlot = compose(SomeSlotBase, { stylesheet: 'slot' });
    const SomeComponentBase = compose(() => <div />, { stylesheet: 'componentbase' });
    const SomeComponent = compose(SomeComponentBase, { slots: { thing: SomeSlot }, stylesheet: 'component' });
    let registeredSheets: string[] = [];
    const register = (stylesheets: string[]) => {
      registeredSheets = [...registeredSheets, ...stylesheets];
    };

    mount(
      <StylesheetProvider register={register}>
        <SomeComponent />
      </StylesheetProvider>,
    );

    expect(registeredSheets).toEqual(['slotbase', 'slot', 'componentbase', 'component']);
  });
});
