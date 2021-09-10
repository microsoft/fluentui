import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { CardView } from './Card.view';
import { CardItem } from './CardItem/CardItem';

const alertClicked = (): void => {
  console.log('Clicked');
};

describe('CardView', () => {
  it('renders a Vertical Card without contents correctly', () => {
    const tree = renderer.create(<CardView />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Horizontal Card without contents correctly', () => {
    const tree = renderer.create(<CardView horizontal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Vertical Card with contents correctly', () => {
    const tree = renderer
      .create(
        <CardView>
          <CardItem>This is some content 1</CardItem>
          <CardItem>This is some content 2</CardItem>
          <CardItem>This is some content 3</CardItem>
        </CardView>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Horizontal Card with contents correctly', () => {
    const tree = renderer
      .create(
        <CardView horizontal>
          <CardItem>This is some content 1</CardItem>
          <CardItem>This is some content 2</CardItem>
          <CardItem>This is some content 3</CardItem>
        </CardView>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Vertical Card with an onClick function specified correctly', () => {
    const tree = renderer
      .create(
        <CardView onClick={alertClicked}>
          <CardItem>This is some content 1</CardItem>
        </CardView>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Horizontal Card with an onClick function specified correctly', () => {
    const tree = renderer
      .create(
        <CardView horizontal onClick={alertClicked}>
          <CardItem>This is some content 1</CardItem>
        </CardView>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
