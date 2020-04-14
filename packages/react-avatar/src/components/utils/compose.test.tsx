import * as React from 'react';
import { compose } from './compose';
// import { mount } from 'enzyme';
// import { Provider } from '@fluentui/react-northstar';

// tslint:disable: jsx-no-lambda

describe('compose', () => {
  it('registers stylesheets in the correct order', () => {
    const SomeSlotBase = compose(() => <div />, { stylesheet: 'slotbase' });
    const SomeSlot = compose(SomeSlotBase, { stylesheet: 'slot' });
    const SomeComponentBase = compose(() => <div />, { stylesheet: 'componentbase' });
    const SomeComponent = compose(SomeComponentBase, { slots: { thing: SomeSlot }, stylesheet: 'component' });
    const registeredSheets: string[] = [];

    // mount(
    //   <Provider registerStyles={(stylesheet: string) => registeredSheets.push(stylesheet)}>
    //     <SomeComponent />
    //   </Provider>,
    // );

    expect(registeredSheets).toEqual(['slotbase', 'slot', 'componentbase', 'component']);
  });
});
