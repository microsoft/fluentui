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
      </Card>,
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
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when having tokens passed to it', () => {
    const tree = renderer
      .create(
        <Card tokens={{ childrenMargin: 12 }}>
          <Card.Section tokens={{ margin: '12px 8px' }}>
            <div />
          </Card.Section>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the only section in a Vertical Card', () => {
    const tree = renderer
      .create(
        <Card tokens={{ childrenMargin: 12 }}>
          <Card.Section fill>
            <div />
          </Card.Section>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the first section in a Vertical Card', () => {
    const tree = renderer
      .create(
        <Card tokens={{ childrenMargin: 12 }}>
          <Card.Section fill>
            <div />
          </Card.Section>
          <Card.Section>
            <div />
          </Card.Section>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the middle section in a Vertical Card', () => {
    const tree = renderer
      .create(
        <Card tokens={{ childrenMargin: 12 }}>
          <Card.Section>
            <div />
          </Card.Section>
          <Card.Section fill>
            <div />
          </Card.Section>
          <Card.Section>
            <div />
          </Card.Section>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the last section in a Vertical Card', () => {
    const tree = renderer
      .create(
        <Card tokens={{ childrenMargin: 12 }}>
          <Card.Section>
            <div />
          </Card.Section>
          <Card.Section fill>
            <div />
          </Card.Section>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the only section in a Horizontal Card', () => {
    const tree = renderer
      .create(
        <Card horizontal tokens={{ childrenMargin: 12 }}>
          <Card.Section fill>
            <div />
          </Card.Section>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the first section in a Horizontal Card', () => {
    const tree = renderer
      .create(
        <Card horizontal tokens={{ childrenMargin: 12 }}>
          <Card.Section fill>
            <div />
          </Card.Section>
          <Card.Section>
            <div />
          </Card.Section>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the middle section in a Horizontal Card', () => {
    const tree = renderer
      .create(
        <Card horizontal tokens={{ childrenMargin: 12 }}>
          <Card.Section>
            <div />
          </Card.Section>
          <Card.Section fill>
            <div />
          </Card.Section>
          <Card.Section>
            <div />
          </Card.Section>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the last section in a Horizontal Card', () => {
    const tree = renderer
      .create(
        <Card horizontal tokens={{ childrenMargin: 12 }}>
          <Card.Section>
            <div />
          </Card.Section>
          <Card.Section fill>
            <div />
          </Card.Section>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
