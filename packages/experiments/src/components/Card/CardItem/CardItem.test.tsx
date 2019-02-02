import * as React from 'react';
import { mount } from 'enzyme';
import { Card } from '../Card';

describe('Card Item', () => {
  it('can handle not having a class', () => {
    const wrapper = mount(
      <Card>
        <Card.Item>
          <div />
        </Card.Item>
      </Card>
    );

    expect(wrapper.find('.test').length).toBe(0);
  });
});
