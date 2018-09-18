import * as React from 'react';
// import * as ReactDOM from 'react-dom';

import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { mount } from 'enzyme';

import { DirectionalHint } from '../../common/DirectionalHint';
import { IExpandingCardProps } from './ExpandingCard/ExpandingCard.types';
import { HoverCardBase } from './HoverCard.base';
import { HoverCardType } from './HoverCard.types';
import { KeyCodes } from '../../Utilities';

describe('HoveCard', () => {
  it('renders target wrapped by HoverCard correctly', () => {
    const createNodeMock = (el: React.ReactElement<{}>) => {
      return {
        __events__: {}
      };
    };
    const component = renderer.create(<HoverCardBase>Content</HoverCardBase>, { createNodeMock });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses default documented properties', () => {
    const component = mount(<HoverCardBase />);

    expect(component.prop('cardOpenDelay')).toEqual(500);
    expect(component.prop('cardDismissDelay')).toEqual(100);
    expect(component.prop('expandedCardOpenDelay')).toEqual(1500);
    expect(component.prop('instantOpenOnClick')).toEqual(false);
    expect(component.prop('setInitialFocus')).toEqual(false);
    expect(component.prop('openHotKey')).toEqual(KeyCodes.c);
    expect(component.prop('type')).toEqual(HoverCardType.expanding);
  });

  it('uses specified properties when rendering an ExpandedCard', () => {
    const item = {
      key: 'Test'
    };

    const expandingCardProps: IExpandingCardProps = {
      onRenderCompactCard: () => {
        return null;
      },
      onRenderExpandedCard: () => {
        return null;
      },
      renderData: item,
      directionalHint: DirectionalHint.rightTopEdge,
      gapSpace: 16
    };

    const component = mount(
      <HoverCardBase
        expandingCardProps={expandingCardProps}
        cardDismissDelay={300}
        cardOpenDelay={1000}
        expandedCardOpenDelay={2000}
        instantOpenOnClick={true}
        setInitialFocus={true}
        trapFocus={true}
        openHotKey={KeyCodes.enter}
      />
    );

    expect(component.prop('cardOpenDelay')).toEqual(1000);
    expect(component.prop('cardDismissDelay')).toEqual(300);
    expect(component.prop('expandedCardOpenDelay')).toEqual(2000);
    expect(component.prop('instantOpenOnClick')).toEqual(true);
    expect(component.prop('setInitialFocus')).toEqual(true);
    expect(component.prop('openHotKey')).toEqual(KeyCodes.enter);
    expect(component.prop('expandingCardProps')).toMatchObject(expandingCardProps);
  });
});
