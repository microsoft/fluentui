import * as React from 'react';
import { mount } from 'enzyme';
import { DocumentCardTitle } from './DocumentCardTitle';

const veryLongTitle = `This is obviously a very very very very very very very very
very very loooooooooooooooooooooooooooooooooooooooooooooooong title that will need to be truncated`;

describe('DocumentCardTitle', () => {
  it('truncates a title that is too long', () => {
    const component = mount(<DocumentCardTitle title={veryLongTitle} shouldTruncate />);

    // Since we check if the title overflows based on element sizes and jsdom not supporting element sizes,
    // we're not able to determine truncation based on element size.
    // We'll therefore test the logic by forcing the truncation that is executed when new props are received.
    // https://github.com/airbnb/enzyme/issues/1435
    component.setProps({});

    expect(component.text()).toEqual('This is obviously a very very very very very very v… that will need to be truncated');
  });

  it('does not truncate a title when shouldTruncate is set to false', () => {
    const component = mount(<DocumentCardTitle title={veryLongTitle} shouldTruncate={false} />);

    // Since we check if the title overflows based on element sizes and jsdom not supporting element sizes,
    // we're not able to determine truncation based on element size.
    // We'll therefore test the logic by forcing the truncation that is executed when new props are received.
    // https://github.com/airbnb/enzyme/issues/1435
    component.setProps({});

    expect(component.text()).toEqual(veryLongTitle);
  });
});
