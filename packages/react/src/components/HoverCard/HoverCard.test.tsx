import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, act } from '@testing-library/react';

import { DirectionalHint } from '../../common/DirectionalHint';
import { PlainCardBase } from './PlainCard/PlainCard.base';
import { ExpandingCardBase } from './ExpandingCard.base';
import { HoverCard } from './HoverCard';
import { HoverCardBase } from './HoverCard.base';
import { KeyCodes } from '../../Utilities';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';
import type { IPlainCardProps } from './PlainCard/PlainCard.types';
import type { IExpandingCardProps } from './ExpandingCard.types';
import { HoverCardType, type IHoverCardProps } from './HoverCard.types';

const expandingCardProps: IExpandingCardProps = {
  onRenderCompactCard: (item: any) => {
    return <div>{item.key}</div>;
  },
  onRenderExpandedCard: (item: any) => {
    return <div>{item.key}</div>;
  },
  renderData: { key: 'TEST' },
  directionalHint: DirectionalHint.rightTopEdge,
  gapSpace: 16,
};

const PlainCardProps: IPlainCardProps = {
  onRenderPlainCard: (item: any) => {
    return <div style={{ width: '200px', height: '500px' }}>{item.key}</div>;
  },
  renderData: { key: 'TEST' },
};

describe('HoverCard', () => {
  it('renders target wrapped by HoverCard correctly', () => {
    const createNodeMock = (_el: React.ReactElement<{}>) => {
      return {
        __events__: {},
      };
    };
    const component = renderer.create(<HoverCardBase>Content</HoverCardBase>, { createNodeMock });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders ExpandingCard correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const component = renderer.create(<ExpandingCardBase {...expandingCardProps} trapFocus={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    ReactDOM.createPortal = createPortal;
  });

  it('renders PlainCard correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const component = renderer.create(<PlainCardBase {...PlainCardProps} trapFocus={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    ReactDOM.createPortal = createPortal;
  });

  isConformant<IHoverCardProps>({
    Component: HoverCard,
    displayName: 'HoverCard',
    componentPath: path.join(__dirname, 'HoverCard.ts'),
    // Problem: Ref doesn't match DOM node and returns outermost wrapper div.
    // Solution: Ensure ref is passed correctly to the root element.
    disabledTests: ['component-has-root-ref', 'component-handles-ref'],
  });

  it('uses default documented properties', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });
    const component = renderer.create(<HoverCardBase />);

    expect(component.root.props.cardOpenDelay).toEqual(500);
    expect(component.root.props.cardDismissDelay).toEqual(100);
    expect(component.root.props.expandedCardOpenDelay).toEqual(1500);
    expect(component.root.props.instantOpenOnClick).toEqual(false);
    expect(component.root.props.setInitialFocus).toEqual(false);
    expect(component.root.props.openHotKey).toEqual(KeyCodes.c);
    expect(component.root.props.type).toEqual(HoverCardType.expanding);

    component.unmount();

    ReactDOM.createPortal = createPortal;
  });

  it('uses specified properties when rendering an ExpandedCard', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const component = renderer.create(
      <HoverCardBase
        expandingCardProps={expandingCardProps}
        cardDismissDelay={300}
        cardOpenDelay={1000}
        expandedCardOpenDelay={2000}
        instantOpenOnClick={true}
        setInitialFocus={true}
        trapFocus={true}
        openHotKey={KeyCodes.enter}
      />,
    );

    expect(component.root.props.cardOpenDelay).toEqual(1000);
    expect(component.root.props.cardDismissDelay).toEqual(300);
    expect(component.root.props.expandedCardOpenDelay).toEqual(2000);
    expect(component.root.props.instantOpenOnClick).toEqual(true);
    expect(component.root.props.setInitialFocus).toEqual(true);
    expect(component.root.props.openHotKey).toEqual(KeyCodes.enter);
    expect(component.root.props.expandingCardProps).toMatchObject(expandingCardProps);

    component.unmount();

    ReactDOM.createPortal = createPortal;
  });

  it('fires onCardVisible and onCardHide', () => {
    let cardVisible = false;
    let cardHidden = false;
    let hoverCardRef: any;

    const onCardVisible = () => {
      cardVisible = true;
    };

    const onCardHide = () => {
      cardHidden = true;
    };

    const { unmount } = render(
      <HoverCardBase
        expandingCardProps={expandingCardProps}
        onCardVisible={onCardVisible}
        onCardHide={onCardHide}
        componentRef={ref => (hoverCardRef = ref)}
      >
        <div>Child</div>
      </HoverCardBase>,
    );
    jest.useFakeTimers();

    expect(hoverCardRef).toBeTruthy();

    // firing the onCardVisible callback after the component is updated.
    act(() => {
      hoverCardRef.setState({ isHoverCardVisible: true });
    });
    expect(cardVisible).toEqual(true);

    // firing the onCardHide callback after the component is updated.
    act(() => {
      hoverCardRef.setState({ isHoverCardVisible: false });
    });
    expect(cardHidden).toEqual(true);

    // firing the onCardHide callback after the component is dismissed directly.
    act(() => {
      hoverCardRef.setState({ isHoverCardVisible: true });
    });
    cardHidden = false;
    act(() => {
      hoverCardRef.dismiss();
    });
    expect(cardHidden).toEqual(true);

    unmount();
  });
});
