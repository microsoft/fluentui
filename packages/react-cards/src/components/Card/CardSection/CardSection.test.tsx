import * as React from 'react';
import { mount } from 'enzyme';
import { Card } from '../Card';
import * as renderer from 'react-test-renderer';

describe('Card Section', () => {
  it('can handle not having a class', () => {
    const wrapper = mount(
      <Card>
        <Card.Section>
          <div />
        </Card.Section>
      </Card>
    );

    expect(wrapper.find('.test').length).toBe(0);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Card>
          <Card.Section>
            <div />
          </Card.Section>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when having tokens passed to it', () => {
    const tree = renderer
      .create(
        <Card>
          <Card.Section tokens={{ margin: '12px 8px' }}>
            <div />
          </Card.Section>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
