import * as React from 'react';
import { mount } from 'enzyme';
import { Card } from '../Card';
import * as renderer from 'react-test-renderer';

import { CardStyles } from '../Card.styles';
import { ICardProps, ICardTokens, ICardStyles } from '../Card.types';
import { CardItemStyles } from './CardItem.styles';
import { ICardItemProps, ICardItemTokens, ICardItemStyles } from './CardItem.types';

import { IStylesFunction } from '@uifabric/foundation';
import { createTheme } from 'office-ui-fabric-react';

const testTheme = createTheme({});

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

  it('has the correct margin values when the disableChildPadding prop is set to true', () => {
    const cardStylesFunc = CardStyles as IStylesFunction<ICardProps, ICardTokens, ICardStyles>;
    const cardItemStylesFunc = CardItemStyles as IStylesFunction<ICardItemProps, ICardItemTokens, ICardItemStyles>;

    const cardStyles = cardStylesFunc({}, testTheme, {}).root;
    const cardItemStylesArray = cardItemStylesFunc({ disableChildPadding: true }, testTheme, {}).root;

    expect(cardStyles).not.toBeNull();
    expect(cardItemStylesArray).not.toBeNull();

    expect(cardStyles).toBeInstanceOf(Array);
    expect(cardItemStylesArray).toBeInstanceOf(Array);

    const cardPadding = (cardStyles as Array<any>).find(style => style.padding).padding;

    const cardItemStyles = (cardItemStylesArray as Array<any>).find(style => style.marginLeft || style.marginRight);
    const cardItemMarginLeft = cardItemStyles.marginLeft;
    const cardItemMarginRight = cardItemStyles.marginRight;

    expect(cardItemMarginLeft).toBe(-cardPadding);
    expect(cardItemMarginRight).toBe(-cardPadding - 1);
  });
});
