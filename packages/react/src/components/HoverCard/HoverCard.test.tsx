import * as React from 'react';
import { render, act } from '@testing-library/react';

import { DirectionalHint } from '../../common/DirectionalHint';
import { PlainCardBase } from './PlainCard/PlainCard.base';
import { ExpandingCardBase } from './ExpandingCard.base';
import { HoverCard } from './HoverCard';
import { HoverCardBase } from './HoverCard.base';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';
import type { IPlainCardProps } from './PlainCard/PlainCard.types';
import type { IExpandingCardProps } from './ExpandingCard.types';
import { type IHoverCardProps } from './HoverCard.types';

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
    const { container } = render(<HoverCardBase>Content</HoverCardBase>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders ExpandingCard correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const { container } = render(<ExpandingCardBase {...expandingCardProps} trapFocus={true} />);
    expect(container.firstChild).toMatchSnapshot();

    ReactDOM.createPortal = createPortal;
  });

  it('renders PlainCard correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const { container } = render(<PlainCardBase {...PlainCardProps} trapFocus={true} />);
    expect(container.firstChild).toMatchSnapshot();

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
