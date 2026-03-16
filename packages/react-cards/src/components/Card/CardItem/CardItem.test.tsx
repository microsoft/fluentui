import * as React from 'react';
import { render } from '@testing-library/react';
import { Card } from '../Card';

describe('Card Item', () => {
  it('can handle not having a class', () => {
    const wrapper = render(
      <Card>
        <Card.Item>
          <div />
        </Card.Item>
      </Card>,
    );

    expect(wrapper.container.querySelectorAll('.test').length).toBe(0);
  });

  it('renders correctly', () => {
    const { container } = render(
      <Card>
        <Card.Item>
          <div />
        </Card.Item>
      </Card>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly when having tokens passed to it', () => {
    const { container } = render(
      <Card tokens={{ childrenMargin: 10 }}>
        <Card.Item tokens={{ margin: '12px 8px' }}>
          <div />
        </Card.Item>
      </Card>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the only item in a Vertical Card', () => {
    const { container } = render(
      <Card tokens={{ childrenMargin: 12 }}>
        <Card.Item fill>
          <div />
        </Card.Item>
      </Card>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the first item in a Vertical Card', () => {
    const { container } = render(
      <Card tokens={{ childrenMargin: 12 }}>
        <Card.Item fill>
          <div />
        </Card.Item>
        <Card.Item>
          <div />
        </Card.Item>
      </Card>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the middle item in a Vertical Card', () => {
    const { container } = render(
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
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the middle item in a Vertical Card', () => {
    const { container } = render(
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
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the last item in a Vertical Card', () => {
    const { container } = render(
      <Card tokens={{ childrenMargin: 12 }}>
        <Card.Item>
          <div />
        </Card.Item>
        <Card.Item fill>
          <div />
        </Card.Item>
      </Card>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the only item in a Horizontal Card', () => {
    const { container } = render(
      <Card horizontal tokens={{ childrenMargin: 12 }}>
        <Card.Item fill>
          <div />
        </Card.Item>
      </Card>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the only item in a Horizontal Card', () => {
    const { container } = render(
      <Card horizontal tokens={{ childrenMargin: 12 }}>
        <Card.Item fill>
          <div />
        </Card.Item>
      </Card>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the first item in a Horizontal Card', () => {
    const { container } = render(
      <Card horizontal tokens={{ childrenMargin: 12 }}>
        <Card.Item fill>
          <div />
        </Card.Item>
        <Card.Item>
          <div />
        </Card.Item>
      </Card>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the middle item in a Horizontal Card', () => {
    const { container } = render(
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
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly when filling up the margins while being the last item in a Horizontal Card', () => {
    const { container } = render(
      <Card horizontal tokens={{ childrenMargin: 12 }}>
        <Card.Item>
          <div />
        </Card.Item>
        <Card.Item fill>
          <div />
        </Card.Item>
      </Card>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
