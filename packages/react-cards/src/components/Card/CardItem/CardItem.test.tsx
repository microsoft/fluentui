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
      </Card>,
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
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when having tokens passed to it', () => {
    const tree = renderer
      .create(
        <Card tokens={{ childrenMargin: 10 }}>
          <Card.Item tokens={{ margin: '12px 8px' }}>
            <div />
          </Card.Item>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the only item in a Vertical Card', () => {
    const tree = renderer
      .create(
        <Card tokens={{ childrenMargin: 12 }}>
          <Card.Item fill>
            <div />
          </Card.Item>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the first item in a Vertical Card', () => {
    const tree = renderer
      .create(
        <Card tokens={{ childrenMargin: 12 }}>
          <Card.Item fill>
            <div />
          </Card.Item>
          <Card.Item>
            <div />
          </Card.Item>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the middle item in a Vertical Card', () => {
    const tree = renderer
      .create(
        <Card tokens={{ childrenMargin: 12 }}>
          <Card.Item>
            <div />
          </Card.Item>
          <Card.Item fill>
            <div />
          </Card.Item>
          <Card.Item>
            <div />
          </Card.Item>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the last item in a Vertical Card', () => {
    const tree = renderer
      .create(
        <Card tokens={{ childrenMargin: 12 }}>
          <Card.Item>
            <div />
          </Card.Item>
          <Card.Item fill>
            <div />
          </Card.Item>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the only item in a Horizontal Card', () => {
    const tree = renderer
      .create(
        <Card horizontal tokens={{ childrenMargin: 12 }}>
          <Card.Item fill>
            <div />
          </Card.Item>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the first item in a Horizontal Card', () => {
    const tree = renderer
      .create(
        <Card horizontal tokens={{ childrenMargin: 12 }}>
          <Card.Item fill>
            <div />
          </Card.Item>
          <Card.Item>
            <div />
          </Card.Item>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the middle item in a Horizontal Card', () => {
    const tree = renderer
      .create(
        <Card horizontal tokens={{ childrenMargin: 12 }}>
          <Card.Item>
            <div />
          </Card.Item>
          <Card.Item fill>
            <div />
          </Card.Item>
          <Card.Item>
            <div />
          </Card.Item>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the last item in a Horizontal Card', () => {
    const tree = renderer
      .create(
        <Card horizontal tokens={{ childrenMargin: 12 }}>
          <Card.Item>
            <div />
          </Card.Item>
          <Card.Item fill>
            <div />
          </Card.Item>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
