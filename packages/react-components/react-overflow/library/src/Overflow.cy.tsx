import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import {
  Overflow,
  OverflowItem,
  OverflowDivider,
  OverflowReorderObserver,
  useIsOverflowGroupVisible,
  useOverflowMenu,
  useOverflowVisibility,
  type OverflowProps,
  type OverflowItemProps,
  type OnOverflowChangeData,
  type OverflowImperativeRef,
} from '@fluentui/react-overflow';
import { Portal } from '@fluentui/react-portal';
import type { OverflowAxis } from '@fluentui/priority-overflow';
import type { DistributiveOmit } from '@fluentui/react-utilities';

const selectors = {
  container: 'data-test-container',
  item: 'data-test-item',
  divider: 'data-test-divider',
  menu: 'data-test-menu',
};

const getAutoMargins: NonNullable<OverflowProps['getAutoMargins']> = element =>
  element.style.marginInlineStart === 'auto' ? ['marginLeft'] : [];

const Container: React.FC<
  { children?: React.ReactNode; size?: number; style?: React.CSSProperties } & Omit<OverflowProps, 'children'>
> = ({ children, size, overflowAxis = 'horizontal' as const, style, ...userProps }) => {
  const selector = {
    [selectors.container]: '',
  };

  return (
    <Overflow padding={0} {...userProps} overflowAxis={overflowAxis}>
      <div
        {...selector}
        style={{
          display: 'flex',
          ...(overflowAxis === 'horizontal' && {
            width: size,
          }),
          ...(overflowAxis === 'vertical' && {
            height: size,
            flexDirection: 'column',
          }),
          border: '1px dashed red',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          resize: overflowAxis,
          ...style,
        }}
      >
        {children}
      </div>
    </Overflow>
  );
};

const setContainerSize = (size: number, dimension: 'width' | 'height') => {
  cy.get(`[${selectors.container}]`)
    .then(container => {
      container.css(dimension, `${size}px`);
    })
    .log(`Setting container size to ${size}px`)
    .wait(1);
};

const setContainerWidth = (size: number) => {
  setContainerSize(size, 'width');
};

const setContainerHeight = (size: number) => {
  setContainerSize(size, 'height');
};

type ItemProps = {
  children?: React.ReactNode;
  width?: number | string;
  style?: React.CSSProperties;
} & DistributiveOmit<OverflowItemProps, 'children'>;

const Item = ({ children, width, style, ...overflowItemProps }: ItemProps) => {
  const selector = {
    [selectors.item]: overflowItemProps.id,
  };

  return (
    <OverflowItem {...overflowItemProps}>
      <button {...selector} style={{ width: width ?? 50, height: 50, flexShrink: 0, ...style }}>
        {children}
      </button>
    </OverflowItem>
  );
};

const Menu: React.FC<{ width?: number; style?: React.CSSProperties }> = ({ width, style }) => {
  const { isOverflowing, ref, overflowCount } = useOverflowMenu<HTMLButtonElement>();
  const { itemVisibility } = useOverflowVisibility();
  const selector = {
    [selectors.menu]: '',
  };

  if (!isOverflowing) {
    return null;
  }

  // No need to actually render a menu, we're testing state
  return (
    <>
      <button {...selector} ref={ref} style={{ width: width ?? 50, minWidth: width, height: 50, ...style }}>
        +{overflowCount}
      </button>
      <Portal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            width: 200,
            position: 'fixed',
            bottom: 0,
            right: 0,
            border: '2px dotted magenta',
          }}
        >
          {Object.entries(itemVisibility).map(([id, visible]) => (
            <>
              <div>{id}</div>
              <div id={`${id}-visibility`}>{visible ? 'visible' : 'invisible'}</div>
            </>
          ))}
        </div>
      </Portal>
    </>
  );
};

export const Divider: React.FC<{
  groupId: string;
  children?: React.ReactNode;
}> = ({ groupId, children }) => {
  const isGroupVisible = useIsOverflowGroupVisible(groupId);

  if (isGroupVisible === 'hidden') {
    return null;
  }

  const styles = {
    outer: {
      display: 'inline-block',
      paddingBottom: '0px',
      height: '20px',
    },

    inner: {
      width: '2px',
      backgroundColor: 'green',
      height: '100%',
    },
  };

  const selector = {
    [selectors.divider]: groupId,
  };

  return (
    <div {...selector} style={styles.outer}>
      <div style={styles.inner} />
      {children}
    </div>
  );
};

export const CustomDivider: React.FC<{
  groupId: string;
  children?: React.ReactNode;
}> = ({ groupId, children }) => {
  const isGroupVisible = useIsOverflowGroupVisible(groupId);

  if (isGroupVisible === 'hidden') {
    // return null;
  }

  const selector = {
    [selectors.divider]: groupId,
  };

  const style = {
    width: '30px',
    backgroundColor: 'red',
    height: '20px',
    flexShrink: 0,
  };

  return (
    <OverflowDivider groupId={groupId}>
      <div {...selector} style={style}>
        {children}
      </div>
    </OverflowDivider>
  );
};

describe('Overflow', () => {
  beforeEach(() => {
    cy.viewport(700, 700);
  });

  it('should not overflow when there is enough space', () => {
    const mapHelper = new Array(10).fill(0).map((_, i) => i);
    mount(
      <Container>
        {mapHelper.map(i => (
          <Item key={i} id={i.toString()}>
            {i}
          </Item>
        ))}
        <Menu />
      </Container>,
    );

    setContainerWidth(500);
    cy.get(`[${selectors.menu}]`).should('not.exist');
  });

  it(`should overflow items`, () => {
    const mapHelper = new Array(10).fill(0).map((_, i) => i);
    mount(
      <Container>
        {mapHelper.map(i => (
          <Item key={i} id={i.toString()}>
            {i}
          </Item>
        ))}
        <Menu />
      </Container>,
    );
    const overflowCases = [
      { containerSize: 450, overflowCount: 2 },
      { containerSize: 400, overflowCount: 3 },
      { containerSize: 350, overflowCount: 4 },
      { containerSize: 300, overflowCount: 5 },
      { containerSize: 250, overflowCount: 6 },
      { containerSize: 200, overflowCount: 7 },
      { containerSize: 150, overflowCount: 8 },
      { containerSize: 100, overflowCount: 9 },
      { containerSize: 50, overflowCount: 10 },
    ];

    overflowCases.forEach(({ overflowCount, containerSize }) => {
      setContainerWidth(containerSize);
      cy.get(`[${selectors.menu}]`).should('have.text', `+${overflowCount}`);
    });
  });

  it('should keep the menu visible when one phone number overflows next to a divider', () => {
    cy.on('uncaught:exception', error => {
      if (error.message.includes('ResizeObserver loop completed with undelivered notifications')) {
        return false;
      }
    });

    const PhoneNumbers = () => {
      const [width, setWidth] = React.useState(280);

      return (
        <>
          {[40, 180, 250, 280].map(nextWidth => (
            <button key={nextWidth} data-test-width={nextWidth} onClick={() => setWidth(nextWidth)}>
              {nextWidth}
            </button>
          ))}
          <Container size={width} padding={10}>
            <OverflowItem id="primary-phone" groupId="primary-phone-group" priority={1}>
              <a
                {...{ [selectors.item]: 'primary-phone' }}
                href="tel:+4790981948"
                style={{ display: 'block', flexShrink: 0, overflow: 'hidden', width: 120 }}
              >
                +4790981948
              </a>
            </OverflowItem>
            <OverflowDivider groupId="primary-phone-group">
              <div
                {...{ [selectors.divider]: 'primary-phone-group' }}
                style={{ flexShrink: 0, width: 8 }}
                aria-hidden="true"
              >
                •
              </div>
            </OverflowDivider>
            <OverflowItem id="secondary-phone" priority={0}>
              <a
                {...{ [selectors.item]: 'secondary-phone' }}
                href="tel:+47 (2) 3011302"
                style={{ display: 'block', flexShrink: 0, overflow: 'hidden', width: 140 }}
              >
                +47 (2) 3011302
              </a>
            </OverflowItem>
            <Menu width={36} />
          </Container>
        </>
      );
    };

    const setPhoneContainerWidth = (width: number) => {
      cy.get(`[data-test-width="${width}"]`).click();
    };

    mount(<PhoneNumbers />);
    cy.get(`[${selectors.container}]`).should('have.css', 'width', '280px');
    cy.window().then(win => new Cypress.Promise(resolve => win.requestAnimationFrame(() => resolve())));

    setPhoneContainerWidth(40);
    cy.get(`[${selectors.menu}]`).should('have.text', '+2');

    setPhoneContainerWidth(180);
    cy.get(`[${selectors.item}="primary-phone"]`).should('not.have.attr', 'data-overflowing');
    cy.get(`[${selectors.divider}="primary-phone-group"]`).should('not.have.attr', 'data-overflowing');
    cy.get(`[${selectors.item}="secondary-phone"]`).should('have.attr', 'data-overflowing');
    cy.get(`[${selectors.menu}]`).should('have.text', '+1');

    setPhoneContainerWidth(250);
    cy.get(`[${selectors.item}="primary-phone"]`).should('not.have.attr', 'data-overflowing');
    cy.get(`[${selectors.divider}="primary-phone-group"]`).should('not.have.attr', 'data-overflowing');
    cy.get(`[${selectors.item}="secondary-phone"]`).should('have.attr', 'data-overflowing');
    cy.get(`[${selectors.menu}]`).should('have.text', '+1');

    setPhoneContainerWidth(280);
    cy.get(`[${selectors.item}="primary-phone"]`).should('not.have.attr', 'data-overflowing');
    cy.get(`[${selectors.divider}="primary-phone-group"]`).should('not.have.attr', 'data-overflowing');
    cy.get(`[${selectors.item}="secondary-phone"]`).should('not.have.attr', 'data-overflowing');
    cy.get(`[${selectors.menu}]`).should('not.exist');
  });

  it(`should overflow items when there's more than one child element`, () => {
    const mapHelper = new Array(10).fill(0).map((_, i) => i);
    const overflowElementIndex = 6;

    mount(
      <Container size={350}>
        <div>
          {mapHelper.map(i => (
            <Item key={i} id={i.toString()}>
              {i}
            </Item>
          ))}
          <Menu />
        </div>
      </Container>,
    );

    cy.get(`[${selectors.item}]`).each((el, index) => {
      if (index >= overflowElementIndex) {
        cy.wrap(el).should('be.hidden');
        cy.wrap(el).should('have.css', 'display', 'none');
      } else {
        cy.wrap(el).should('have.css', 'display', 'inline-block');
      }
    });
  });

  it(`should overflow items in reverse order`, () => {
    const mapHelper = new Array(10).fill(0).map((_, i) => i);
    mount(
      <Container overflowDirection="start">
        <Menu />
        {mapHelper.map(i => (
          <Item key={i} id={i.toString()}>
            {i}
          </Item>
        ))}
      </Container>,
    );
    const overflowCases = [
      { containerSize: 450, latestOverflowed: 1 },
      { containerSize: 400, latestOverflowed: 2 },
      { containerSize: 350, latestOverflowed: 3 },
      { containerSize: 300, latestOverflowed: 4 },
      { containerSize: 250, latestOverflowed: 5 },
      { containerSize: 200, latestOverflowed: 6 },
      { containerSize: 150, latestOverflowed: 7 },
      { containerSize: 100, latestOverflowed: 8 },
      { containerSize: 50, latestOverflowed: 9 },
    ];

    overflowCases.forEach(({ containerSize, latestOverflowed }) => {
      setContainerWidth(containerSize);
      cy.get(`[${selectors.item}=${latestOverflowed}]`).should('not.be.visible');
    });
  });

  it('should overflow based on priority', () => {
    const priorities = [0, 1, 4, 6, 2, 5, 3, 9, 8, 7];
    mount(
      <Container>
        {priorities.map(i => (
          <Item key={i} id={i.toString()} priority={i}>
            {i}
          </Item>
        ))}
        <Menu />
      </Container>,
    );

    const overflowCases = [
      { containerSize: 450, latestOverflowed: 1 },
      { containerSize: 400, latestOverflowed: 2 },
      { containerSize: 350, latestOverflowed: 3 },
      { containerSize: 300, latestOverflowed: 4 },
      { containerSize: 250, latestOverflowed: 5 },
      { containerSize: 200, latestOverflowed: 6 },
      { containerSize: 150, latestOverflowed: 7 },
      { containerSize: 100, latestOverflowed: 8 },
      { containerSize: 50, latestOverflowed: 9 },
    ];

    overflowCases.forEach(({ containerSize, latestOverflowed }) => {
      setContainerWidth(containerSize);
      cy.get(`[${selectors.item}=${latestOverflowed}]`).should('not.be.visible');
    });
  });

  it(`should expand items`, () => {
    const mapHelper = new Array(10).fill(0).map((_, i) => i);
    mount(
      <Container>
        {mapHelper.map(i => (
          <Item key={i} id={i.toString()}>
            {i}
          </Item>
        ))}
        <Menu />
      </Container>,
    );
    const overflowCases = [
      { containerSize: 50, overflowCount: 10 },
      { containerSize: 100, overflowCount: 9 },
      { containerSize: 150, overflowCount: 8 },
      { containerSize: 200, overflowCount: 7 },
      { containerSize: 250, overflowCount: 6 },
      { containerSize: 300, overflowCount: 5 },
      { containerSize: 350, overflowCount: 4 },
      { containerSize: 400, overflowCount: 3 },
      { containerSize: 450, overflowCount: 2 },
    ];

    overflowCases.forEach(({ overflowCount, containerSize }) => {
      setContainerWidth(containerSize);
      cy.get(`[${selectors.menu}]`).should('have.text', `+${overflowCount}`);
    });
  });

  it(`should expand items in reverse order`, () => {
    const mapHelper = new Array(10).fill(0).map((_, i) => i);
    mount(
      <Container overflowDirection="start">
        <Menu />
        {mapHelper.map(i => (
          <Item key={i} id={i.toString()}>
            {i}
          </Item>
        ))}
      </Container>,
    );
    const overflowCases = [
      { containerSize: 100, latestOverflowed: 9 },
      { containerSize: 150, latestOverflowed: 8 },
      { containerSize: 200, latestOverflowed: 7 },
      { containerSize: 250, latestOverflowed: 6 },
      { containerSize: 300, latestOverflowed: 5 },
      { containerSize: 350, latestOverflowed: 4 },
      { containerSize: 400, latestOverflowed: 3 },
      { containerSize: 450, latestOverflowed: 2 },
    ];

    overflowCases.forEach(({ containerSize, latestOverflowed }) => {
      setContainerWidth(containerSize);
      cy.get(`[${selectors.item}=${latestOverflowed}]`).should('be.visible');
    });
  });

  it('should expand items based on priority', () => {
    const priorities = [0, 1, 4, 6, 2, 5, 3, 9, 8, 7];
    mount(
      <Container>
        {priorities.map(i => (
          <Item key={i} id={i.toString()} priority={i}>
            {i}
          </Item>
        ))}
        <Menu />
      </Container>,
    );

    const overflowCases = [
      { containerSize: 100, latestOverflowed: 9 },
      { containerSize: 150, latestOverflowed: 8 },
      { containerSize: 200, latestOverflowed: 7 },
      { containerSize: 250, latestOverflowed: 6 },
      { containerSize: 300, latestOverflowed: 5 },
      { containerSize: 350, latestOverflowed: 4 },
      { containerSize: 400, latestOverflowed: 3 },
      { containerSize: 450, latestOverflowed: 2 },
    ];

    overflowCases.forEach(({ containerSize, latestOverflowed }) => {
      setContainerWidth(containerSize);
      cy.get(`[${selectors.item}=${latestOverflowed}]`).should('be.visible');
    });
  });

  it('should react to priority changes within the container', () => {
    const Example = () => {
      const [selected, setSelelected] = React.useState(0);
      return (
        <>
          <Container>
            {mapHelper.map(i => (
              <Item key={i} id={i.toString()} priority={selected === i ? 1000 : 0}>
                <span onClick={() => setSelelected(i)} style={{ color: selected === i ? 'red' : 'black' }}>
                  {i}
                </span>
              </Item>
            ))}
            <Menu />
          </Container>
          <div>
            <button id="select-9" onClick={() => setSelelected(9)}>
              Select 9
            </button>
          </div>
        </>
      );
    };

    const mapHelper = new Array(10).fill(0).map((_, i) => i);
    mount(<Example />);

    cy.get(`[${selectors.item}="3"]`).click();
    setContainerWidth(150);
    cy.get(`[${selectors.item}="3"]`).should('be.visible');
    cy.get('#select-9').click();
    cy.get(`[${selectors.item}="9"]`).should('be.visible');
    cy.get(`[${selectors.item}="2"]`).should('not.be.visible');
  });

  it('should notify group visibility changes correctly', () => {
    mount(
      <Container padding={8}>
        <Item id={'6'} priority={6} groupId={'1'}>
          6-1
        </Item>
        <Divider groupId={'1'}>
          <span data-divider="1" />
        </Divider>
        <Item id={'7'} priority={7} groupId={'2'}>
          7-2
        </Item>
        <Divider groupId={'2'} data-divider="2">
          <span data-divider="2" />
        </Divider>
        <Item id={'4'} priority={4} groupId={'3'}>
          4-3
        </Item>
        <Item id={'5'} priority={5} groupId={'3'}>
          5-3
        </Item>
        <Divider groupId={'3'} data-divider="3">
          <span data-divider="3" />
        </Divider>
        <Item id={'1'} priority={1} groupId={'4'}>
          1-4
        </Item>
        <Item id={'2'} priority={2} groupId={'4'}>
          2-4
        </Item>
        <Item id={'3'} priority={3} groupId={'4'}>
          3-4
        </Item>
        <Divider groupId={'4'} data-divider="4">
          <span data-divider="4" />
        </Divider>
        <Item id={'8'} priority={8} groupId={'5'}>
          8-5
        </Item>
        <Menu />
      </Container>,
    );

    setContainerWidth(350);
    cy.get(`[${selectors.divider}="4"]`).should('not.exist');
    cy.get(`[${selectors.divider}]`).should('have.length', 3);
    setContainerWidth(250);
    cy.get(`[${selectors.divider}="3"]`).should('not.exist');
    cy.get(`[${selectors.divider}]`).should('have.length', 2);
    setContainerWidth(200);
    cy.get(`[${selectors.divider}="1"]`).should('not.exist');
    cy.get(`[${selectors.divider}]`).should('have.length', 1);
  });

  it('should collapse correctly with custom divider', () => {
    mount(
      <Container padding={8}>
        <Item id={'1'} groupId={'1'}>
          1
        </Item>
        <CustomDivider groupId={'1'} data-divider="2">
          <span data-divider="2" />
        </CustomDivider>
        <Item id={'2'} groupId={'2'}>
          2
        </Item>
        <CustomDivider groupId={'2'} data-divider="2">
          <span data-divider="2" />
        </CustomDivider>
        <Item id={'3'} groupId={'3'}>
          3
        </Item>
        <Item id={'4'} groupId={'3'}>
          4
        </Item>
        <CustomDivider groupId={'3'} data-divider="3">
          <span data-divider="3" />
        </CustomDivider>
        <Item id={'5'} groupId={'4'}>
          5
        </Item>
        <Item id={'6'} groupId={'4'}>
          6
        </Item>
        <Item id={'7'} groupId={'4'}>
          7
        </Item>
        <CustomDivider groupId={'4'} data-divider="4">
          <span data-divider="4" />
        </CustomDivider>
        <Item id={'8'} groupId={'5'}>
          8
        </Item>
        <Menu />
      </Container>,
    );

    setContainerWidth(500);
    cy.get(`[${selectors.item}="8"]`).should('not.be.visible');
    setContainerWidth(350);
    cy.get(`[${selectors.divider}="4"]`).should('have.attr', 'data-overflowing');
    cy.get(`[${selectors.divider}]:not([data-overflowing])`).should('have.length', 3);
    cy.get(`[${selectors.item}="5"]`).should('not.be.visible');
    setContainerWidth(250);
    cy.get(`[${selectors.divider}="3"]`).should('have.attr', 'data-overflowing');
    cy.get(`[${selectors.divider}]:not([data-overflowing])`).should('have.length', 2);
    cy.get(`[${selectors.item}="3"]`).should('not.be.visible');
    setContainerWidth(200);
    cy.get(`[${selectors.divider}="1"]`).should('exist');
    cy.get(`[${selectors.divider}]:not([data-overflowing])`).should('have.length', 1);
    cy.get(`[${selectors.item}="1"]`).should('be.visible');
    cy.get(`[${selectors.item}="2"]`).should('not.be.visible');
  });

  it('should be no flickering', () => {
    mount(
      <Container>
        <Item width="unset" id="0">
          Item 0
        </Item>
        <Item width="unset" id="1">
          Item 1
        </Item>
        <Item width="unset" id="2">
          Super Long Item 2
        </Item>
        <Item width="unset" id="3">
          3
        </Item>
        <Item id="4">Item 4</Item>
        <Item id="5">Item 5</Item>
        <Menu />
      </Container>,
    );

    setContainerWidth(355);
    cy.get(`[${selectors.item}="4"]`).should('be.visible');
    setContainerWidth(354);
    cy.get(`[${selectors.item}="3"]`).should('be.visible');
    cy.get(`[${selectors.item}="4"]`).should('not.be.visible');
    setContainerWidth(353);
    cy.get(`[${selectors.item}="3"]`).should('be.visible');
    cy.get(`[${selectors.item}="4"]`).should('not.be.visible');
    setContainerWidth(352);
    cy.get(`[${selectors.item}="3"]`).should('be.visible');
    cy.get(`[${selectors.item}="4"]`).should('not.be.visible');
  });

  it('should update overflow menu when visible item is added/removed', () => {
    const Example = () => {
      const [mapHelper, setMapHelper] = React.useState<string[]>(new Array(10).fill(0).map((_, i) => i.toString()));
      const addItem = React.useCallback((index: number, item: string) => {
        setMapHelper(m => [...m.slice(0, index), item, ...m.slice(index)]);
      }, []);
      const deleteItem = React.useCallback((index: number, count: number) => {
        setMapHelper(m => [...m.slice(0, index), ...m.slice(index + count)]);
      }, []);

      return (
        <>
          <Container>
            {mapHelper.map(i => (
              <Item key={i} id={i}>
                {i}
              </Item>
            ))}
            <Menu />
          </Container>
          <div>
            <button id="add-3rd" onClick={() => addItem(3, '2b')}>
              Add at index 3
            </button>
            <button id="delete-3rd" onClick={() => deleteItem(3, 1)}>
              Delete at index 3
            </button>
          </div>
        </>
      );
    };
    mount(<Example />);
    setContainerWidth(300);
    cy.get(`[${selectors.item}="4"]`).should('be.visible');
    cy.get(`[${selectors.item}="5"]`).should('not.be.visible');
    cy.get(`[${selectors.menu}]`).should('exist');
    cy.get(`[${selectors.menu}]`).should('have.text', '+5');

    cy.get('#add-3rd').click();
    cy.get(`[${selectors.item}="3"]`).should('be.visible');
    cy.get(`[${selectors.item}="4"]`).should('not.be.visible');
    cy.get(`[${selectors.menu}]`).should('exist');
    cy.get(`[${selectors.menu}]`).should('have.text', '+6');

    cy.get('#delete-3rd').click();
    cy.get(`[${selectors.item}="4"]`).should('be.visible');
    cy.get(`[${selectors.item}="5"]`).should('not.be.visible');
    cy.get(`[${selectors.menu}]`).should('exist');
    cy.get(`[${selectors.menu}]`).should('have.text', '+5');
  });

  it('should update overflow menu when overflow item is added/removed', () => {
    const Example = () => {
      const [mapHelper, setMapHelper] = React.useState<string[]>(new Array(10).fill(0).map((_, i) => i.toString()));
      const addItem = React.useCallback((index: number, item: string) => {
        setMapHelper(m => [...m.slice(0, index), item, ...m.slice(index)]);
      }, []);
      const deleteItem = React.useCallback((index: number, count: number) => {
        setMapHelper(m => [...m.slice(0, index), ...m.slice(index + count)]);
      }, []);

      return (
        <>
          <Container>
            {mapHelper.map(i => (
              <Item key={i} id={i}>
                {i}
              </Item>
            ))}
            <Menu />
          </Container>
          <div>
            <button id="add-8th" onClick={() => addItem(8, '7b')}>
              Add at index 8
            </button>
            <button id="delete-8th" onClick={() => deleteItem(8, 1)}>
              Delete at index 8
            </button>
          </div>
        </>
      );
    };
    mount(<Example />);
    setContainerWidth(300);
    cy.get(`[${selectors.item}="4"]`).should('be.visible');
    cy.get(`[${selectors.item}="5"]`).should('not.be.visible');
    cy.get(`[${selectors.menu}]`).should('exist');
    cy.get(`[${selectors.menu}]`).should('have.text', '+5');

    cy.get('#add-8th').click();
    cy.get(`[${selectors.item}="4"]`).should('be.visible');
    cy.get(`[${selectors.item}="5"]`).should('not.be.visible');
    cy.get(`[${selectors.menu}]`).should('exist');
    cy.get(`[${selectors.menu}]`).should('have.text', '+6');

    cy.get('#delete-8th').click();
    cy.get(`[${selectors.item}="4"]`).should('be.visible');
    cy.get(`[${selectors.item}="5"]`).should('not.be.visible');
    cy.get(`[${selectors.menu}]`).should('exist');
    cy.get(`[${selectors.menu}]`).should('have.text', '+5');
  });

  it('should remove overflow menu when all overflow items are removed', () => {
    const Example = () => {
      const [mapHelper, setMapHelper] = React.useState<string[]>(new Array(10).fill(0).map((_, i) => i.toString()));
      const deleteItem = React.useCallback((index: number, count: number) => {
        setMapHelper(m => [...m.slice(0, index), ...m.slice(index + count)]);
      }, []);

      return (
        <>
          <Container>
            {mapHelper.map(i => (
              <Item key={i} id={i}>
                {i}
              </Item>
            ))}
            <Menu />
          </Container>
          <div>
            <button id="delete-5plus" onClick={() => deleteItem(5, 10)}>
              Delete all from index 5
            </button>
          </div>
        </>
      );
    };
    mount(<Example />);
    setContainerWidth(300);
    cy.get(`[${selectors.item}="4"]`).should('be.visible');
    cy.get(`[${selectors.item}="5"]`).should('not.be.visible');
    cy.get(`[${selectors.menu}]`).should('exist');
    cy.get(`[${selectors.menu}]`).should('have.text', '+5');

    cy.get('#delete-5plus').click();
    cy.get(`[${selectors.item}="4"]`).should('be.visible');
    cy.get(`[${selectors.menu}]`).should('not.exist');
  });

  it('should be no flickering with larger divider', () => {
    mount(
      <Container>
        <Item id={'1'} groupId={'1'}>
          1
        </Item>
        <CustomDivider groupId={'1'} data-divider="1" />
        <Item id={'2'} groupId={'2'}>
          2
        </Item>
        <CustomDivider groupId={'2'} data-divider="2" />
        <Item id={'3'} groupId={'3'}>
          3
        </Item>
        <CustomDivider groupId={'3'} data-divider="3" />
        <Item id={'4'} groupId={'4'}>
          4
        </Item>
        <CustomDivider groupId={'4'} data-divider="4" />
        <Item id={'5'} groupId={'5'}>
          5
        </Item>
        <CustomDivider groupId={'5'} data-divider="5" />
        <Item id={'6'} groupId={'6'}>
          6
        </Item>
        <CustomDivider groupId={'6'} data-divider="6" />
        <Item id={'7'} groupId={'7'}>
          7
        </Item>
        <Menu />
      </Container>,
    );

    setContainerWidth(470);
    cy.get(`[${selectors.item}="5"]`).should('be.visible');
    setContainerWidth(469);
    cy.get(`[${selectors.divider}="5"]`).should('exist');
    cy.get(`[${selectors.item}="6"]`).should('not.be.visible');
    cy.get(`[${selectors.item}="5"]`).should('be.visible');
    cy.get(`[${selectors.divider}]:not([data-overflowing])`).should('have.length', 5);
    setContainerWidth(468);
    cy.get(`[${selectors.item}="6"]`).should('not.be.visible');
    cy.get(`[${selectors.item}="5"]`).should('be.visible');
    setContainerWidth(467);
    cy.get(`[${selectors.item}="6"]`).should('not.be.visible');
    cy.get(`[${selectors.item}="5"]`).should('be.visible');
    setContainerWidth(466);
    cy.get(`[${selectors.item}="6"]`).should('not.be.visible');
    cy.get(`[${selectors.item}="5"]`).should('be.visible');
    setContainerWidth(449);
    cy.get(`[${selectors.item}="5"]`).should('not.be.visible');
    cy.get(`[${selectors.item}="4"]`).should('be.visible');
  });

  it('should remove overflow menu if the last overflowed item can take its place', () => {
    const mapHelper = new Array(10).fill(0).map((_, i) => i);
    mount(
      <Container>
        {mapHelper.map(i => (
          <Item key={i} id={i.toString()}>
            {i}
          </Item>
        ))}
        <Menu />
      </Container>,
    );

    setContainerWidth(497);
    setContainerWidth(498);
    setContainerWidth(499);
    setContainerWidth(500);
    cy.get(`[${selectors.menu}]`).should('not.exist');
  });

  it('should count accurately size of items', () => {
    mount(
      <Container>
        <Item width="unset" id="0">
          Item 0
        </Item>
        <Item width="unset" id="1">
          Item 1
        </Item>
        <Item width="unset" id="2">
          Super Long Item 2
        </Item>
        <Item width="unset" id="3">
          3
        </Item>
        <Item id="4">Item 4</Item>
        <Item id="5">Item 5</Item>
        <Menu />
      </Container>,
    );

    setContainerWidth(355);
    cy.get(`[${selectors.menu}]`).should('not.exist');
    setContainerWidth(354);
    cy.get(`[${selectors.menu}]`).should('exist');
    cy.get(`[${selectors.item}="3"]`).should('be.visible');
    cy.get(`[${selectors.item}="4"]`).should('not.be.visible');
    cy.get(`[${selectors.item}="5"]`).should('not.be.visible');
    setContainerWidth(355);
    cy.get(`[${selectors.menu}]`).should('not.exist');
    setContainerWidth(305);
    cy.get(`[${selectors.item}="3"]`).should('be.visible');
    cy.get(`[${selectors.item}="4"]`).should('not.be.visible');
    cy.get(`[${selectors.item}="5"]`).should('not.be.visible');
    setContainerWidth(304);
    cy.get(`[${selectors.item}="2"]`).should('be.visible');
    cy.get(`[${selectors.item}="3"]`).should('not.be.visible');
    setContainerWidth(305);
    cy.get(`[${selectors.item}="3"]`).should('be.visible');
    cy.get(`[${selectors.item}="4"]`).should('not.be.visible');
    setContainerWidth(282);
    cy.get(`[${selectors.item}="2"]`).should('be.visible');
    cy.get(`[${selectors.item}="3"]`).should('not.be.visible');
    setContainerWidth(281);
    cy.get(`[${selectors.item}="1"]`).should('be.visible');
    cy.get(`[${selectors.item}="2"]`).should('not.be.visible');
    setContainerWidth(282);
    cy.get(`[${selectors.item}="2"]`).should('be.visible');
    cy.get(`[${selectors.item}="3"]`).should('not.be.visible');
    setContainerWidth(104);
    cy.get(`[${selectors.item}="0"]`).should('be.visible');
    cy.get(`[${selectors.item}="1"]`).should('not.be.visible');
    setContainerWidth(102);
    cy.get(`[${selectors.item}="0"]`).should('not.be.visible');
  });

  it('should start overflowing once minimum visible items is reached', () => {
    const mapHelper = new Array(10).fill(0).map((_, i) => i);
    mount(
      <Container minimumVisible={5}>
        {mapHelper.map(i => (
          <Item key={i} id={i.toString()}>
            {i}
          </Item>
        ))}
        <Menu />
      </Container>,
    );

    setContainerWidth(195);
    cy.get(`[${selectors.menu}]`).should('not.be.visible');
    cy.get(`[${selectors.item}="4"]`).should('not.be.visible');
  });

  // Container will fit 4 items with width 100 and the overflow menu
  // Once the priority of the foo item is updated it should have more
  // priority than Item 5 (width 100 item), so the foo item should be visible
  // once this foo item is visible, make sure that the subscriber is in sync.
  it('should dispatch update when updating priority of an item', () => {
    const Example = () => {
      const [priority, setPriority] = React.useState<number | undefined>();

      return (
        <>
          <Container>
            <Item id="1" width={100}>
              Item 1
            </Item>
            <Item id="2" width={100}>
              Item 2
            </Item>
            <Item id="3" width={100}>
              Item 3
            </Item>
            <Item id="4" width={100}>
              Item 4
            </Item>
            <Item id="5" width={100}>
              Item 5
            </Item>
            <Item id="foo" width={50} priority={priority}>
              Foo
            </Item>
            <Item id="7" width={50}>
              Item
            </Item>
            <Item id="8" width={50}>
              Item
            </Item>
            <Menu width={32} />
          </Container>
          <button onClick={() => setPriority(2)}>Update priority</button>
        </>
      );
    };
    mount(<Example />);

    setContainerWidth(500);
    cy.contains('Update priority').click().get('#foo-visibility').should('have.text', 'visible');
  });

  it('Should switch priorities and use all available space', () => {
    const Example = () => {
      const [selected, setSelelected] = React.useState(0);
      return (
        <>
          <Container>
            {mapHelper.map(i => (
              <Item key={i} id={i.toString()} priority={selected === i ? 1000 : 0} width={i === 9 ? 100 : undefined}>
                <span onClick={() => setSelelected(i)} style={{ color: selected === i ? 'red' : 'black' }}>
                  {i}
                </span>
              </Item>
            ))}
            <Menu />
          </Container>
          <div>
            <button id="select-9" onClick={() => setSelelected(9)}>
              Select 9
            </button>
            <button id="select-0" onClick={() => setSelelected(0)}>
              Select 0
            </button>
          </div>
        </>
      );
    };

    const mapHelper = new Array(10).fill(0).map((_, i) => i);
    mount(<Example />);

    cy.get(`[${selectors.item}="3"]`).click();
    setContainerWidth(250);
    cy.get('#select-9').click();
    cy.get(`[${selectors.item}="9"]`).should('be.visible');
    cy.get(`[${selectors.item}="0"]`).should('be.visible');
    cy.get(`[${selectors.item}="1"]`).should('be.visible');
    cy.get(`[${selectors.item}="2"]`).should('not.be.visible');
    cy.get(`[${selectors.item}="3"]`).should('not.be.visible');

    cy.get('#select-0').click();
    cy.get(`[${selectors.item}="9"]`).should('not.be.visible');
    cy.get(`[${selectors.item}="0"]`).should('be.visible');
    cy.get(`[${selectors.item}="1"]`).should('be.visible');
    cy.get(`[${selectors.item}="2"]`).should('be.visible');
    cy.get(`[${selectors.item}="3"]`).should('be.visible');
  });

  it('should overflow in the vertical axis', () => {
    const mapHelper = new Array(10).fill(0).map((_, i) => i);
    mount(
      <Container overflowAxis="vertical">
        {mapHelper.map(i => (
          <Item key={i} id={i.toString()}>
            {i}
          </Item>
        ))}
        <Menu />
      </Container>,
    );

    setContainerHeight(500);
    const overflowCases = [
      { containerSize: 450, overflowCount: 2 },
      { containerSize: 400, overflowCount: 3 },
      { containerSize: 350, overflowCount: 4 },
      { containerSize: 300, overflowCount: 5 },
      { containerSize: 250, overflowCount: 6 },
      { containerSize: 200, overflowCount: 7 },
      { containerSize: 150, overflowCount: 8 },
      { containerSize: 100, overflowCount: 9 },
      { containerSize: 50, overflowCount: 10 },
    ];

    overflowCases.forEach(({ overflowCount, containerSize }) => {
      setContainerHeight(containerSize);
      cy.get(`[${selectors.menu}]`).should('have.text', `+${overflowCount}`);
    });
  });

  it('should toggle between vertical and horizontal axis', () => {
    const mapHelper = new Array(10).fill(0).map((_, i) => i);
    const TestComponent = () => {
      const [axis, setAxis] = React.useState<OverflowAxis>('horizontal');
      return (
        <>
          <button id="toggle" onClick={() => setAxis(s => (s === 'horizontal' ? 'vertical' : 'horizontal'))}>
            toggle: {axis}
          </button>
          <Container overflowAxis={axis}>
            {mapHelper.map(i => (
              <Item key={i} id={i.toString()}>
                {i}
              </Item>
            ))}
            <Menu />
          </Container>
        </>
      );
    };

    mount(<TestComponent />);

    setContainerWidth(500);
    const overflowCases = [
      { containerSize: 450, overflowCount: 2 },
      { containerSize: 400, overflowCount: 3 },
      { containerSize: 350, overflowCount: 4 },
      { containerSize: 300, overflowCount: 5 },
      { containerSize: 250, overflowCount: 6 },
      { containerSize: 200, overflowCount: 7 },
      { containerSize: 150, overflowCount: 8 },
    ];

    for (let i = 0; i < 3; i++) {
      const setSize = i % 2 === 0 ? setContainerWidth : setContainerHeight;
      overflowCases.forEach(({ overflowCount, containerSize }) => {
        setSize(containerSize);
        cy.get(`[${selectors.menu}]`).should('have.text', `+${overflowCount}`);
      });

      cy.get('#toggle').click();
    }
  });

  it('shoud call onOverflowChange', () => {
    const itemCount = 10;
    const mapHelper = new Array(itemCount).fill(0).map((_, i) => i);
    let latestUpdate: OnOverflowChangeData | undefined;
    mount(
      <Container onOverflowChange={(e, data) => (latestUpdate = data)}>
        {mapHelper.map(i => (
          <Item key={i} id={i.toString()}>
            {i}
          </Item>
        ))}
        <Menu />
      </Container>,
    );
    const overflowCases = [
      { containerSize: 450, overflowCount: 2 },
      { containerSize: 400, overflowCount: 3 },
      { containerSize: 350, overflowCount: 4 },
      { containerSize: 300, overflowCount: 5 },
      { containerSize: 250, overflowCount: 6 },
      { containerSize: 200, overflowCount: 7 },
      { containerSize: 150, overflowCount: 8 },
      { containerSize: 100, overflowCount: 9 },
      { containerSize: 50, overflowCount: 10 },
    ];

    overflowCases.forEach(({ overflowCount, containerSize }) => {
      setContainerWidth(containerSize);
      cy.get(`[${selectors.menu}]`).should('have.text', `+${overflowCount}`);
      cy.then(() => {
        expect(latestUpdate?.hasOverflow).to.equal(true);
        const visibleBoundary = itemCount - overflowCount;
        for (let i = 0; i < visibleBoundary; i++) {
          expect(latestUpdate?.itemVisibility[i.toString()]).to.equal(true);
        }

        for (let i = visibleBoundary; i < itemCount; i++) {
          expect(latestUpdate?.itemVisibility[i.toString()]).to.equal(false);
        }
      });
    });
  });

  it('should settle inline metadata callbacks when the parent stores overflow state', () => {
    const updates = cy.stub();
    const Consumer = () => {
      const [, setState] = React.useState<OnOverflowChangeData>();
      return (
        <Container
          size={280}
          style={{ gap: 10 }}
          measureGap
          getAutoMargins={() => []}
          onOverflowChange={(_, data) => {
            updates(data);
            if (updates.callCount < 12) {
              setState(data);
            }
          }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <Item key={i} id={String(i)} />
          ))}
        </Container>
      );
    };
    mount(<Consumer />);
    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 2);
    cy.wait(50).then(() => {
      expect(updates.callCount).to.be.within(1, 2);
      const settledCount = updates.callCount;
      cy.wait(50).then(() => expect(updates.callCount).to.equal(settledCount));
    });
  });

  it('should find flex gaps through display:contents wrappers', () => {
    mount(
      <Container size={300} style={{ gap: 20 }} measureGap>
        <div style={{ display: 'contents' }}>
          {Array.from({ length: 6 }, (_, i) => (
            <Item key={i} id={String(i)} />
          ))}
        </div>
      </Container>,
    );
    [300, 400, 300].forEach(size => {
      setContainerWidth(size);
      cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', size === 400 ? 0 : 2);
    });
  });

  it('should ignore inactive gaps in an inline formatting context', () => {
    mount(
      <Container size={300} style={{ display: 'block', gap: 20 }} measureGap>
        {Array.from({ length: 6 }, (_, i) => (
          <Item key={i} id={String(i)} style={{ display: 'inline-block' }} />
        ))}
      </Container>,
    );
    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
  });

  it('should preserve zero cyclic percentage gaps in auto-height flex columns', () => {
    mount(
      <Container size={300} overflowAxis="vertical" style={{ display: 'block' }} measureGap>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10%' }}>
          {Array.from({ length: 6 }, (_, i) => (
            <Item key={i} id={String(i)} />
          ))}
        </div>
      </Container>,
    );
    [300, 250, 300].forEach(size => {
      setContainerHeight(size);
      cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', size === 250 ? 1 : 0);
    });
  });

  it('should recalculate percentage gaps when an intrinsic parent shrinks', () => {
    mount(
      <Container size={355} style={{ display: 'block' }} measureGap>
        <div style={{ display: 'inline-flex', gap: '10%' }}>
          {Array.from({ length: 6 }, (_, i) => (
            <Item key={i} id={String(i)} />
          ))}
        </div>
      </Container>,
    );
    [355, 340, 450, 355].forEach(size => {
      setContainerWidth(size);
      cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', size === 450 ? 0 : size === 340 ? 2 : 1);
    });
  });

  it('should preserve fractional text sizes without using ignored inline dimensions', () => {
    mount(
      <Container size={600} style={{ display: 'block', font: '20.1px monospace' }} measureGap>
        {Array.from({ length: 6 }, (_, i) => (
          <OverflowItem key={i} id={String(i)}>
            <span data-test-item={i} style={{ width: 60.2 }}>
              xxxxx
            </span>
          </OverflowItem>
        ))}
      </Container>,
    );
    cy.get(`[${selectors.item}]`).then(items => {
      const span = items[5].getBoundingClientRect().right - items[0].getBoundingClientRect().left;
      setContainerWidth(span - 0.25);
      cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 1);
      setContainerWidth(span + 0.25);
      cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
    });
  });

  it(`should overflow items with flex gap`, () => {
    const mapHelper = new Array(6).fill(0).map((_, i) => i);
    mount(
      <Container style={{ gap: 10 }} measureGap>
        {mapHelper.map(i => (
          <Item key={i} id={i.toString()}>
            {i}
          </Item>
        ))}
        <Menu />
      </Container>,
    );
    const overflowCases = [
      { containerSize: 290, overflowCount: 2 },
      { containerSize: 280, overflowCount: 3 },
      { containerSize: 230, overflowCount: 3 },
      { containerSize: 170, overflowCount: 4 },
      { containerSize: 110, overflowCount: 5 },
    ];

    overflowCases.forEach(({ overflowCount, containerSize }) => {
      setContainerWidth(containerSize);
      cy.get(`[${selectors.menu}]`).should('have.text', `+${overflowCount}`);
    });
  });

  it(`should overflow items with margin`, () => {
    const mapHelper = new Array(6).fill(0).map((_, i) => i);
    mount(
      <Container measureGap>
        {mapHelper.map((i, index) => (
          <Item style={{ marginInlineStart: index > 0 ? 10 : 0 }} key={i} id={i.toString()}>
            {i}
          </Item>
        ))}
        <Menu style={{ marginInlineStart: 10 }} />
      </Container>,
    );
    const overflowCases = [
      { containerSize: 290, overflowCount: 2 },
      { containerSize: 280, overflowCount: 3 },
      { containerSize: 230, overflowCount: 3 },
      { containerSize: 170, overflowCount: 4 },
      { containerSize: 110, overflowCount: 5 },
    ];

    overflowCases.forEach(({ overflowCount, containerSize }) => {
      setContainerWidth(containerSize);
      cy.get(`[${selectors.menu}]`).should('have.text', `+${overflowCount}`);
    });
  });

  it(`should overflow items with gap and margin`, () => {
    const mapHelper = new Array(6).fill(0).map((_, i) => i);
    mount(
      <Container style={{ gap: 5 }} measureGap>
        {mapHelper.map((i, index) => (
          <Item style={{ marginInlineStart: index > 0 ? 5 : 0 }} key={i} id={i.toString()}>
            {i}
          </Item>
        ))}
        <Menu style={{ marginInlineStart: 5 }} />
      </Container>,
    );
    const overflowCases = [
      { containerSize: 290, overflowCount: 2 },
      { containerSize: 280, overflowCount: 3 },
      { containerSize: 230, overflowCount: 3 },
      { containerSize: 170, overflowCount: 4 },
      { containerSize: 110, overflowCount: 5 },
    ];

    overflowCases.forEach(({ overflowCount, containerSize }) => {
      setContainerWidth(containerSize);
      cy.get(`[${selectors.menu}]`).should('have.text', `+${overflowCount}`);
    });
  });

  it('should leave spacing measurement disabled by default', () => {
    mount(
      <Container size={280} style={{ gap: 10 }}>
        {Array.from({ length: 6 }, (_, i) => (
          <Item key={i} id={i.toString()}>
            {i}
          </Item>
        ))}
        <Menu />
      </Container>,
    );

    cy.get(`[${selectors.menu}]`).should('have.text', '+2');
  });

  it('should account for overlapping item margins', () => {
    mount(
      <Container size={250} measureGap>
        {Array.from({ length: 6 }, (_, i) => (
          <Item key={i} id={i.toString()} style={{ marginInlineStart: i > 0 ? -10 : 0 }}>
            {i}
          </Item>
        ))}
        <Menu />
      </Container>,
    );

    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
    cy.get(`[${selectors.menu}]`).should('not.exist');
  });

  [0.5, 2].forEach(scale => {
    it(`should use layout sizes inside a scaled ancestor (${scale})`, () => {
      mount(
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <Container size={350} style={{ gap: 10 }} measureGap>
            {Array.from({ length: 6 }, (_, i) => (
              <Item key={i} id={i.toString()} />
            ))}
            <Menu />
          </Container>
        </div>,
      );

      [350, 280, 350].forEach(size => {
        setContainerWidth(size);
        cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', size === 280 ? 3 : 0);
        cy.get(`[${selectors.container}]`).should(containers => {
          expect(containers[0].scrollWidth).to.be.at.most(containers[0].clientWidth);
        });
      });
    });
  });

  ['space-between', 'auto-margin'].forEach(alignment => {
    it(`should reclaim ${alignment} free space on shrink and grow`, () => {
      mount(
        <Container
          size={500}
          padding={10}
          style={{ gap: 10, justifyContent: alignment === 'space-between' ? 'space-between' : undefined }}
          getAutoMargins={getAutoMargins}
          measureGap
        >
          {Array.from({ length: 6 }, (_, i) => (
            <Item key={i} id={i.toString()} />
          ))}
          <Menu style={{ marginInlineStart: alignment === 'auto-margin' ? 'auto' : undefined }} />
        </Container>,
      );

      [500, 280, 600, 280, 500].forEach(size => {
        setContainerWidth(size);
        cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', size === 280 ? 3 : 0);
      });
    });
  });

  it('should preserve the furthest edge of contained overlapping items', () => {
    mount(
      <Container size={200} measureGap>
        <Item id="0" width={140} />
        <Item id="1" width={100} style={{ marginLeft: 10 }} />
        <Item id="2" width={10} style={{ marginLeft: -80, minWidth: 0, padding: 0, border: 0 }} />
        <Menu />
      </Container>,
    );

    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 2);
    cy.get(`[${selectors.menu}]`).should('have.text', '+2');
    setContainerWidth(250);
    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
    cy.get(`[${selectors.menu}]`).should('not.exist');
  });

  ['none', 'flex-grow 1s linear', 'all 1s linear'].forEach(transition => {
    it(`should exclude internal auto margins without changing sizing styles (${transition})`, () => {
      mount(
        <Container size={500} padding={10} style={{ gap: 10 }} getAutoMargins={getAutoMargins} measureGap>
          {Array.from({ length: 6 }, (_, i) => (
            <Item
              key={i}
              id={i.toString()}
              priority={i === 3 ? 1 : 0}
              style={{ maxWidth: 50, marginInlineStart: i === 3 ? 'auto' : undefined, transition }}
            />
          ))}
          <Menu />
        </Container>,
      );

      [500, 280, 500, 280, 600].forEach(size => {
        setContainerWidth(size);
        cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', size === 280 ? 3 : 0);
        cy.get(`[${selectors.item}]`).should(items => {
          items.each((_, element) => {
            expect(element.style.maxWidth).to.equal('50px');
            expect(element.style.flexGrow).to.equal('');
          });
        });
      });
    });
  });

  it('should not retrigger style-based overflow refreshes during measurement', () => {
    const imperativeRef = React.createRef<OverflowImperativeRef>();
    mount(
      <Container
        size={500}
        padding={10}
        style={{ gap: 10 }}
        imperativeRef={imperativeRef}
        getAutoMargins={getAutoMargins}
        measureGap
      >
        <OverflowReorderObserver />
        {Array.from({ length: 6 }, (_, i) => (
          <Item key={i} id={i.toString()} style={{ marginInlineStart: i === 3 ? 'auto' : undefined }} />
        ))}
      </Container>,
    );

    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
    cy.get(`[${selectors.container}]`).then(containers => {
      const container = containers[0];
      const view = container.ownerDocument.defaultView!;
      let updates = 0;
      const observer = new view.MutationObserver(() => {
        if (++updates === 12) {
          observer.disconnect();
        } else {
          imperativeRef.current!.updateOverflow();
        }
      });
      observer.observe(container, { attributes: true, attributeFilter: ['style'], subtree: true });
      imperativeRef.current!.updateOverflow();
      return new Promise<void>(resolve => {
        view.requestAnimationFrame(() => view.requestAnimationFrame(() => resolve()));
      }).then(() => {
        observer.disconnect();
        expect(updates).to.equal(0);
      });
    });
  });

  it('should not retrigger subtree child-list refreshes during margin measurement', () => {
    const imperativeRef = React.createRef<OverflowImperativeRef>();
    mount(
      <Container
        size={500}
        padding={10}
        style={{ gap: 10 }}
        imperativeRef={imperativeRef}
        getAutoMargins={getAutoMargins}
        measureGap
      >
        {Array.from({ length: 6 }, (_, i) => (
          <Item key={i} id={i.toString()} style={{ marginInlineStart: i === 3 ? 'auto' : undefined }} />
        ))}
      </Container>,
    );
    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
    cy.get(`[${selectors.container}]`).then(containers => {
      const container = containers[0];
      const view = container.ownerDocument.defaultView!;
      let updates = 0;
      const observer = new view.MutationObserver(() => {
        if (++updates === 12) {
          observer.disconnect();
        } else {
          imperativeRef.current!.updateOverflow();
        }
      });
      observer.observe(container, { childList: true, subtree: true });
      imperativeRef.current!.updateOverflow();
      return new Promise<void>(resolve => {
        view.requestAnimationFrame(() => view.requestAnimationFrame(() => resolve()));
      }).then(() => {
        observer.disconnect();
        expect(updates).to.equal(0);
      });
    });
  });

  it('should preserve selector-defined auto margins without inserting children', () => {
    mount(
      <>
        <style>{`[${selectors.item}="3"]:empty { margin-left:auto; }`}</style>
        <Container
          size={500}
          padding={10}
          style={{ gap: 10 }}
          getAutoMargins={element => (element.getAttribute(selectors.item) === '3' ? ['marginLeft'] : [])}
          measureGap
        >
          {Array.from({ length: 6 }, (_, i) => (
            <Item key={i} id={String(i)} />
          ))}
        </Container>
      </>,
    );
    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
    cy.get(`[${selectors.item}="3"]`).should('be.empty').and('have.css', 'margin-left', '150px');
  });

  it('should preserve fractional container capacity', () => {
    mount(
      <Container size={312.4} style={{ gap: 1.5 }} measureGap>
        {Array.from({ length: 6 }, (_, i) => (
          <Item key={i} id={String(i)} width={50.8} style={{ padding: 0, border: 0 }} />
        ))}
      </Container>,
    );
    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
  });

  it('should use the nested layout gap while retaining the observed container capacity', () => {
    const imperativeRef = React.createRef<OverflowImperativeRef>();
    mount(
      <Container size={280} imperativeRef={imperativeRef} measureGap>
        <div data-nested-layout style={{ display: 'flex', width: 280, flexShrink: 0, gap: 20 }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Item key={i} id={String(i)} />
          ))}
        </div>
      </Container>,
    );
    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 1);
    setContainerWidth(350);
    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
    cy.get('[data-nested-layout]').invoke('css', 'gap', '40px');
    cy.then(() => imperativeRef.current!.updateOverflow());
    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 1);
    setContainerWidth(240);
    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 2);
  });

  it('should use column gaps for the vertical inline axis of a grid', () => {
    mount(
      <Container
        size={300}
        overflowAxis="vertical"
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          writingMode: 'vertical-rl',
          width: 50,
          gap: '10px 20px',
          justifyContent: 'start',
        }}
        measureGap
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Item key={i} id={String(i)} />
        ))}
      </Container>,
    );
    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 1);
    cy.get(`[${selectors.container}]`).should(containers => {
      expect(containers[0].scrollHeight).to.equal(containers[0].clientHeight);
    });
  });

  it('should measure non-replaced inline boxes rather than their ignored width declaration', () => {
    mount(
      <Container size={200} style={{ display: 'block', fontFamily: 'monospace', fontSize: 20 }} measureGap>
        {[0, 1].map(i => (
          <OverflowItem key={i} id={String(i)}>
            <span data-test-item={i} style={{ width: 50, marginRight: 10 }}>
              xxxxxxxxxx
            </span>
          </OverflowItem>
        ))}
      </Container>,
    );
    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 1);
  });

  it('should omit descendants of hidden wrappers and measure them again when displayed', () => {
    const imperativeRef = React.createRef<OverflowImperativeRef>();
    mount(
      <Container size={280} style={{ gap: 10 }} imperativeRef={imperativeRef} measureGap>
        <div data-hidden-wrapper style={{ display: 'none' }}>
          {Array.from({ length: 6 }, (_, i) => (
            <Item key={i} id={String(i)} />
          ))}
        </div>
      </Container>,
    );
    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
    cy.get('[data-hidden-wrapper]').invoke('css', 'display', 'flex').invoke('css', 'gap', '10px');
    cy.then(() => imperativeRef.current!.updateOverflow());
    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 2);
  });

  it('should clamp negative calculated gaps to zero', () => {
    mount(
      <Container size={280} style={{ gap: 'calc(10% - 40px)' }} measureGap>
        {Array.from({ length: 6 }, (_, i) => (
          <Item key={i} id={i.toString()} />
        ))}
      </Container>,
    );
    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 1);
    cy.get(`[${selectors.container}]`).should(containers => {
      expect(containers[0].scrollWidth).to.be.at.most(containers[0].clientWidth);
    });
  });

  it('should refresh when auto-margin metadata changes', () => {
    const Example = () => {
      const [enabled, setEnabled] = React.useState(false);
      return (
        <>
          <button data-enable-metadata onClick={() => setEnabled(true)}>
            Enable metadata
          </button>
          <Container
            size={500}
            padding={10}
            style={{ gap: 10 }}
            measureGap
            getAutoMargins={element => (enabled && element.getAttribute(selectors.item) === '3' ? ['marginLeft'] : [])}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <Item key={i} id={String(i)} style={{ marginInlineStart: i === 3 ? 'auto' : undefined }} />
            ))}
          </Container>
        </>
      );
    };
    mount(<Example />);
    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 1);
    cy.get('[data-enable-metadata]').click();
    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
  });

  it('should resolve nested percentage gaps against the layout parent', () => {
    const imperativeRef = React.createRef<OverflowImperativeRef>();
    mount(
      <Container size={327} imperativeRef={imperativeRef} measureGap>
        <div data-percentage-layout style={{ display: 'flex', width: 400, flexShrink: 0, gap: 'calc(5% + 1px)' }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Item key={i} id={String(i)} />
          ))}
        </div>
      </Container>,
    );
    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 1);
    cy.get('[data-percentage-layout]').invoke('css', 'width', '300px');
    cy.then(() => imperativeRef.current!.updateOverflow());
    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
  });

  (['border-box', 'content-box'] as const).forEach(boxSizing => {
    [
      { width: 50.6, size: 312, hidden: 0 },
      { width: 50.4, size: 309, hidden: 1 },
    ].forEach(({ width, size, hidden }) => {
      it(`should preserve fractional ${boxSizing} sizes (${width}px)`, () => {
        mount(
          <Container size={size} style={{ gap: 1.5 }} measureGap>
            {Array.from({ length: 6 }, (_, i) => (
              <Item
                key={i}
                id={i.toString()}
                width={boxSizing === 'content-box' ? width - 3 : width}
                style={{ boxSizing, border: '1px solid', padding: 0.5 }}
              />
            ))}
          </Container>,
        );
        cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', hidden);
        cy.get(`[${selectors.container}]`).should(containers => {
          expect(containers[0].scrollWidth).to.be.at.most(containers[0].clientWidth);
        });
      });
    });
  });

  it('should isolate calculated gaps from important application sizing rules', () => {
    mount(
      <>
        <style>{`div:not([${selectors.container}]) { max-width: 100px !important; }`}</style>
        <Container size={300} style={{ gap: 'calc(5% + 1px)' }} measureGap>
          {Array.from({ length: 6 }, (_, i) => (
            <Item key={i} id={i.toString()} />
          ))}
        </Container>
      </>,
    );
    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 2);
    cy.get(`[${selectors.container}]`).should(containers => {
      expect(containers[0].scrollWidth).to.be.at.most(containers[0].clientWidth);
    });
  });

  it('should not reserve gaps for an externally hidden overflow menu', () => {
    mount(
      <Container size={290} style={{ gap: 10 }} measureGap>
        {Array.from({ length: 6 }, (_, i) => (
          <Item key={i} id={i.toString()} />
        ))}
        <Menu style={{ display: 'none' }} />
      </Container>,
    );
    cy.get(`[${selectors.menu}]`).should('have.text', '+1');
    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 1);
  });
  it('should omit externally hidden items from spacing and remeasure them when displayed', () => {
    const imperativeRef = React.createRef<OverflowImperativeRef>();
    mount(
      <Container size={290} style={{ gap: 10 }} imperativeRef={imperativeRef} measureGap>
        {Array.from({ length: 6 }, (_, i) => (
          <Item key={i} id={i.toString()} style={{ display: i === 2 ? 'none' : undefined }} />
        ))}
        <Menu />
      </Container>,
    );

    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
    cy.get(`[${selectors.item}="2"]`).invoke('css', 'display', '');
    cy.then(() => imperativeRef.current!.updateOverflow());
    cy.get(`[${selectors.menu}]`).should('have.text', '+2');
    cy.get(`[${selectors.item}="2"]`).invoke('css', 'display', 'none');
    cy.then(() => imperativeRef.current!.updateOverflow());
    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
  });

  it('should retain gaps around displayed zero-width items', () => {
    mount(
      <Container size={290} style={{ gap: 10 }} measureGap>
        {Array.from({ length: 6 }, (_, i) => (
          <Item key={i} id={i.toString()} width={i === 2 ? 0 : 50} style={{ minWidth: 0, padding: 0, border: 0 }} />
        ))}
        <Menu />
      </Container>,
    );

    cy.get(`[${selectors.menu}]`).should('have.text', '+2');
  });

  it('should account for overlapping items removed in priority order', () => {
    mount(
      <Container size={100} style={{ gap: 10 }} measureGap>
        {[60, 30, 20, 80].map((width, i) => (
          <Item
            key={i}
            id={i.toString()}
            width={width}
            priority={[3, 0, 1, 2][i]}
            style={{ marginLeft: [0, -50, 20, -90][i], minWidth: 0, padding: 0, border: 0 }}
          />
        ))}
      </Container>,
    );

    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
    setContainerWidth(90);
    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 2);
    cy.get(`[${selectors.item}="1"]`).should('have.attr', 'data-overflowing');
    cy.get(`[${selectors.item}="2"]`).should('have.attr', 'data-overflowing');
    setContainerWidth(100);
    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
  });

  it('should refresh hidden item sizes when a small resize changes which items fit', () => {
    mount(
      <Container size={280} style={{ gap: 10 }} measureGap>
        {Array.from({ length: 6 }, (_, i) => (
          <Item key={i} id={i.toString()} style={{ minWidth: 0, padding: 0, border: 0 }} />
        ))}
        <Menu />
      </Container>,
    );

    cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', 3).invoke('css', 'width', '10px');
    setContainerWidth(279);
    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
  });

  (['row', 'row-reverse'] as const).forEach(flexDirection => {
    (['ltr', 'rtl'] as const).forEach(direction => {
      it(`should use column gaps in vertical writing (${flexDirection}, ${direction})`, () => {
        mount(
          <Container
            size={400}
            overflowAxis="vertical"
            style={{ writingMode: 'vertical-rl', flexDirection, direction, width: 50, gap: '10px 20px' }}
            measureGap
          >
            {Array.from({ length: 6 }, (_, i) => (
              <Item key={i} id={i.toString()} />
            ))}
            <Menu />
          </Container>,
        );

        [400, 290, 400].forEach(size => {
          setContainerHeight(size);
          cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', size === 290 ? 3 : 0);
          cy.get(`[${selectors.container}]`).should(containers => {
            const container = containers[0];
            const top = container.getBoundingClientRect().top + container.clientTop;
            container.querySelectorAll(`[${selectors.item}]:not([data-overflowing])`).forEach(element => {
              const rectangle = element.getBoundingClientRect();
              expect(rectangle.top).to.be.at.least(top);
              expect(rectangle.bottom).to.be.at.most(top + container.clientHeight);
            });
          });
        });
      });
    });
  });

  ['5%', 'calc(5% + 1px)', 'calc(5% + 0.05em)'].forEach(gap => {
    it(`should isolate ${gap} measurement from application sizing rules`, () => {
      mount(
        <>
          <style>{'div { min-width: 100px; min-inline-size: 100px; }'}</style>
          <Container size={430} style={{ gap, fontSize: 20 }} measureGap>
            {Array.from({ length: 6 }, (_, i) => (
              <Item key={i} id={i.toString()} />
            ))}
            <Menu />
          </Container>
        </>,
      );

      cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
      setContainerWidth(300);
      cy.get(`[${selectors.menu}]`).should('have.text', '+3');
      setContainerWidth(430);
      cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
    });
  });

  ['5%', 'calc(5% + 1px)'].forEach(gap => {
    it(`should resolve ${gap} gaps against the container content box`, () => {
      mount(
        <Container size={430} style={{ gap, paddingInline: 10, boxSizing: 'border-box', border: 0 }} measureGap>
          {Array.from({ length: 6 }, (_, i) => (
            <Item key={i} id={i.toString()} />
          ))}
          <Menu />
        </Container>,
      );

      setContainerWidth(300);
      cy.get(`[${selectors.menu}]`).should('have.text', '+3');
      setContainerWidth(430);
      cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
    });
  });

  it('should batch spacing measurements when overflowing a large collection', () => {
    const itemCount = 500;
    mount(
      <Container size={40000} style={{ gap: 10 }} measureGap>
        {Array.from({ length: itemCount }, (_, i) => (
          <Item key={i} id={i.toString()} />
        ))}
        <Menu />
      </Container>,
    );

    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
    cy.window().then(win => {
      cy.spy(win.Element.prototype, 'getBoundingClientRect').as('rectReads');
      cy.spy(win, 'getComputedStyle').as('styleReads');
    });
    setContainerWidth(300);
    cy.get(`[${selectors.menu}]`).should('have.text', '+496');
    cy.get('@rectReads')
      .its('callCount')
      .should('be.lessThan', itemCount * 4);
    cy.get('@styleReads')
      .its('callCount')
      .should('be.lessThan', itemCount * 8);
    setContainerWidth(40000);
    cy.get(`[${selectors.item}][data-overflowing]`).should('not.exist');
  });

  const spacingLayouts: { name: string; axis: OverflowAxis; style: React.CSSProperties }[] = [
    { name: 'LTR', axis: 'horizontal', style: {} },
    { name: 'RTL', axis: 'horizontal', style: { direction: 'rtl' } },
    { name: 'row-reverse', axis: 'horizontal', style: { flexDirection: 'row-reverse' } },
    {
      name: 'RTL row-reverse',
      axis: 'horizontal',
      style: { direction: 'rtl', flexDirection: 'row-reverse' },
    },
    { name: 'vertical', axis: 'vertical', style: {} },
    { name: 'column-reverse', axis: 'vertical', style: { flexDirection: 'column-reverse' } },
  ];

  spacingLayouts.forEach(({ name, axis, style }) => {
    it(`should measure spacing in ${name} layouts`, () => {
      mount(
        <Container size={350} overflowAxis={axis} style={{ gap: 10, ...style }} measureGap>
          {Array.from({ length: 6 }, (_, i) => (
            <Item key={i} id={i.toString()}>
              {i}
            </Item>
          ))}
          <Menu />
        </Container>,
      );

      const setSize = axis === 'horizontal' ? setContainerWidth : setContainerHeight;
      [
        { containerSize: 350, overflowCount: 0 },
        { containerSize: 290, overflowCount: 2 },
        { containerSize: 280, overflowCount: 3 },
        { containerSize: 230, overflowCount: 3 },
        { containerSize: 220, overflowCount: 4 },
        { containerSize: 350, overflowCount: 0 },
      ].forEach(({ containerSize, overflowCount }) => {
        setSize(containerSize);
        cy.get(`[${selectors.item}][data-overflowing]`).should('have.length', overflowCount);
        if (overflowCount) {
          cy.get(`[${selectors.menu}]`).should('have.text', `+${overflowCount}`);
        } else {
          cy.get(`[${selectors.menu}]`).should('not.exist');
        }
      });
    });
  });

  it(`should overflow items with gap and dividers`, () => {
    mount(
      <Container style={{ gap: 10 }} measureGap>
        <Item id={'6'} priority={6} groupId={'1'}>
          6-1
        </Item>
        <CustomDivider groupId={'1'}>
          <span data-divider="1" />
        </CustomDivider>
        <Item id={'7'} priority={7} groupId={'2'}>
          7-2
        </Item>
        <CustomDivider groupId={'2'} data-divider="2">
          <span data-divider="2" />
        </CustomDivider>
        <Item id={'4'} priority={4} groupId={'3'}>
          4-3
        </Item>
        <Item id={'5'} priority={5} groupId={'3'}>
          5-3
        </Item>
        <CustomDivider groupId={'3'} data-divider="3">
          <span data-divider="3" />
        </CustomDivider>
        <Item id={'1'} priority={1} groupId={'4'}>
          1-4
        </Item>
        <Item id={'2'} priority={2} groupId={'4'}>
          2-4
        </Item>
        <Item id={'3'} priority={3} groupId={'4'}>
          3-4
        </Item>
        <CustomDivider groupId={'4'} data-divider="4">
          <span data-divider="4" />
        </CustomDivider>
        <Item id={'8'} priority={8} groupId={'5'}>
          8-5
        </Item>
        <Menu />
      </Container>,
    );

    const overflowCases = [
      { containerSize: 570, overflowCount: 2, dividerCount: 4 },
      { containerSize: 470, overflowCount: 3, dividerCount: 3 },
      { containerSize: 410, overflowCount: 4, dividerCount: 3 },
      { containerSize: 310, overflowCount: 5, dividerCount: 2 },
    ];

    overflowCases.forEach(({ overflowCount, containerSize, dividerCount }) => {
      setContainerWidth(containerSize);
      cy.get(`[${selectors.menu}]`).should('have.text', `+${overflowCount}`);
      cy.get(`[${selectors.divider}]:not([data-overflowing])`).should('have.length', dividerCount);
    });
  });

  describe('pinned items', () => {
    it('should keep pinned item visible when container shrinks', () => {
      const mapHelper = new Array(10).fill(0).map((_, i) => i);
      mount(
        <Container>
          {mapHelper.map(i => (
            <Item key={i} id={i.toString()} pinned={i === 5}>
              {i}
            </Item>
          ))}
          <Menu />
        </Container>,
      );

      // At 150px with 50px items + ~50px menu, only ~2 items fit
      // Item 5 is pinned so it must be visible, item 0 fills remaining space
      // Item 1 and later non-pinned items should overflow
      setContainerWidth(150);

      cy.get(`[${selectors.item}="5"]`).should('be.visible');
      cy.get(`[${selectors.item}="0"]`).should('be.visible');
      cy.get(`[${selectors.item}="1"]`).should('not.be.visible');
      cy.get(`[${selectors.item}="2"]`).should('not.be.visible');

      // 8 items overflow (1, 2, 3, 4, 6, 7, 8, 9) - pinned item 5 is not counted
      cy.get(`[${selectors.menu}]`).should('have.text', '+8');
    });

    it('should keep multiple pinned items visible', () => {
      const mapHelper = new Array(10).fill(0).map((_, i) => i);
      mount(
        <Container>
          {mapHelper.map(i => (
            <Item key={i} id={i.toString()} pinned={i === 3 || i === 7}>
              {i}
            </Item>
          ))}
          <Menu />
        </Container>,
      );

      setContainerWidth(150);

      cy.get(`[${selectors.item}="3"]`).should('be.visible');
      cy.get(`[${selectors.item}="7"]`).should('be.visible');

      // 8 items overflow (0, 1, 2, 4, 5, 6, 8, 9) - pinned items 3 and 7 are not counted
      cy.get(`[${selectors.menu}]`).should('have.text', '+8');
    });

    it('should keep pinned items visible even when they exceed container size', () => {
      const mapHelper = new Array(10).fill(0).map((_, i) => i);
      mount(
        <Container>
          {mapHelper.map(i => (
            // Pin 5 items (0-4), each 50px = 250px total
            <Item key={i} id={i.toString()} pinned={i < 5}>
              {i}
            </Item>
          ))}
          <Menu />
        </Container>,
      );

      // Container is only 60px but pinned items need 250px (5 × 50px)
      // All pinned items should not be hidden by overflow logic (no display: none)
      // They may be visually clipped by CSS overflow, but that's expected
      setContainerWidth(60);

      cy.get(`[${selectors.item}="0"]`).should('not.have.css', 'display', 'none');
      cy.get(`[${selectors.item}="1"]`).should('not.have.css', 'display', 'none');
      cy.get(`[${selectors.item}="2"]`).should('not.have.css', 'display', 'none');
      cy.get(`[${selectors.item}="3"]`).should('not.have.css', 'display', 'none');
      cy.get(`[${selectors.item}="4"]`).should('not.have.css', 'display', 'none');

      // First item fits in viewport
      cy.get(`[${selectors.item}="0"]`).should('be.visible');
      // Last pinned item is outside viewport (clipped by CSS, not hidden by overflow logic)
      cy.get(`[${selectors.item}="4"]`).should('not.be.visible');

      // Non-pinned items should be hidden by overflow logic
      cy.get(`[${selectors.item}="5"]`).should('have.css', 'display', 'none');
      // 5 items overflow (5, 6, 7, 8, 9) - pinned items 0-4 are not counted
      cy.get(`[${selectors.menu}]`).should('have.text', '+5');
    });

    it('should exclude pinned items from overflow count', () => {
      const mapHelper = new Array(10).fill(0).map((_, i) => i);
      mount(
        <Container>
          {mapHelper.map(i => (
            <Item key={i} id={i.toString()} pinned={i === 9}>
              {i}
            </Item>
          ))}
          <Menu />
        </Container>,
      );

      // Container fits ~5 items. Item 9 is pinned.
      // With pinned: items 0-3 and 9 visible, items 4-8 overflow = +5
      // The count should still reflect actual hidden items
      setContainerWidth(300);

      cy.get(`[${selectors.item}="9"]`).should('be.visible');
      // 5 items overflow (4, 5, 6, 7, 8) - pinned item 9 is not counted
      cy.get(`[${selectors.menu}]`).should('have.text', '+5');
    });

    it('should keep pinned item visible regardless of position', () => {
      // Items with higher priority overflow later, item 9 is last in DOM and pinned
      const priorities = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
      mount(
        <Container>
          {priorities.map((priority, i) =>
            i === 9 ? (
              <Item key={i} id={i.toString()} pinned>
                {i}
              </Item>
            ) : (
              <Item key={i} id={i.toString()} priority={priority}>
                {i}
              </Item>
            ),
          )}
          <Menu />
        </Container>,
      );

      // Item 9 is last in DOM order but pinned, so it should stay visible
      setContainerWidth(150);
      cy.get(`[${selectors.item}="9"]`).should('be.visible');
      // 8 items overflow (1, 2, 3, 4, 5, 6, 7, 8) - pinned item 9 is not counted
      cy.get(`[${selectors.menu}]`).should('have.text', '+8');
    });

    it('should respect minimumVisible with pinned items', () => {
      const mapHelper = new Array(10).fill(0).map((_, i) => i);
      mount(
        <Container minimumVisible={3}>
          {mapHelper.map(i => (
            <Item key={i} id={i.toString()} pinned={i === 5}>
              {i}
            </Item>
          ))}
          <Menu />
        </Container>,
      );

      // minimumVisible=3 means at least 3 items should be visible
      // Item 5 is pinned
      // At very small size, we should see items 0, 1, 2 (minimum) plus item 5 (pinned)
      setContainerWidth(100);
      cy.get(`[${selectors.item}="5"]`).should('be.visible');
      // 7 items overflow (3, 4, 6, 7, 8, 9 + one more due to space constraints)
      cy.get(`[${selectors.menu}]`).should('have.text', '+7');
    });

    it('should allow pinned item to be dynamically set', () => {
      const Example = () => {
        const [pinnedId, setPinnedId] = React.useState<string | null>(null);
        return (
          <>
            <Container>
              {new Array(10).fill(0).map((_, i) => (
                <Item key={i} id={i.toString()} pinned={pinnedId === i.toString()}>
                  {i}
                </Item>
              ))}
              <Menu />
            </Container>
            <button id="pin-8" onClick={() => setPinnedId('8')}>
              Pin item 8
            </button>
          </>
        );
      };
      mount(<Example />);

      setContainerWidth(150);

      cy.get(`[${selectors.item}="8"]`).should('not.be.visible');
      // Before pinning: 8 items overflow (2-9)
      cy.get(`[${selectors.menu}]`).should('have.text', '+8');

      cy.get('#pin-8').click();
      cy.get(`[${selectors.item}="8"]`).should('be.visible');
      // After pinning item 8: 8 items overflow (1-7, 9) - pinned item 8 is not counted
      cy.get(`[${selectors.menu}]`).should('have.text', '+8');
    });
  });

  describe('OverflowReorderObserver', () => {
    const INITIAL_IDS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const ReorderExample: React.FC = () => {
      const [ids, setIds] = React.useState(INITIAL_IDS);
      return (
        <>
          <Container size={300}>
            <OverflowReorderObserver />
            {ids.map(id => (
              <Item key={id} id={id} priority={1}>
                {id}
              </Item>
            ))}
            <Menu />
          </Container>
          <button id="reverse" onClick={() => setIds(prev => [...prev].reverse())}>
            Reverse
          </button>
        </>
      );
    };

    it('recomputes overflow when items are reordered via React state', () => {
      mount(<ReorderExample />);

      // Initial layout: container=300px, items=50px each + 50px menu → ~5 visible, 3 overflow.
      cy.get(`[${selectors.item}="a"]`).should('be.visible');
      cy.get(`[${selectors.item}="h"]`).should('not.be.visible');

      cy.get('#reverse').click();

      // After reversing, the items at the front of the new order (h, g, f, ...) should be
      // visible. Items pushed to the tail (..., b, a) should overflow.
      cy.get(`[${selectors.item}="h"]`).should('be.visible');
      cy.get(`[${selectors.item}="a"]`).should('not.be.visible');
    });
  });
});
