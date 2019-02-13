import * as React from 'react';
import { mount } from 'enzyme';
import { Card } from '../Card';
import * as renderer from 'react-test-renderer';

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

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Card>
          <Card.Item>
            <div />
          </Card.Item>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when having the disableChildPadding prop set to true', () => {
    const tree = renderer
      .create(
        <Card>
          <Card.Item disableChildPadding>
            <div />
          </Card.Item>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
