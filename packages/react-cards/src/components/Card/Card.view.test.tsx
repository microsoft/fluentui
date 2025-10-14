import * as React from 'react';
import { render } from '@testing-library/react';

import { CardView } from './Card.view';
import { CardItem } from './CardItem/CardItem';

const alertClicked = (): void => {
  console.log('Clicked');
};

describe('CardView', () => {
  it('renders a Vertical Card without contents correctly', () => {
    const { container } = render(<CardView />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a Horizontal Card without contents correctly', () => {
    const { container } = render(<CardView horizontal />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a Vertical Card with contents correctly', () => {
    const { container } = render(
      <CardView>
        <CardItem>This is some content 1</CardItem>
        <CardItem>This is some content 2</CardItem>
        <CardItem>This is some content 3</CardItem>
      </CardView>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a Horizontal Card with contents correctly', () => {
    const { container } = render(
      <CardView horizontal>
        <CardItem>This is some content 1</CardItem>
        <CardItem>This is some content 2</CardItem>
        <CardItem>This is some content 3</CardItem>
      </CardView>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a Vertical Card with an onClick function specified correctly', () => {
    const { container } = render(
      <CardView onClick={alertClicked}>
        <CardItem>This is some content 1</CardItem>
      </CardView>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a Horizontal Card with an onClick function specified correctly', () => {
    const { container } = render(
      <CardView horizontal onClick={alertClicked}>
        <CardItem>This is some content 1</CardItem>
      </CardView>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
