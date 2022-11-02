import * as React from 'react';
import { mount } from '@cypress/react';
import {
  Overflow,
  OverflowItem,
  OverflowItemProps,
  OverflowProps,
  useIsOverflowGroupVisible,
  useOverflowMenu,
} from '@fluentui/react-overflow';

const selectors = {
  container: 'data-test-container',
  item: 'data-test-item',
  divider: 'data-test-divider',
  menu: 'data-test-menu',
};

const Container: React.FC<{ children?: React.ReactNode; width?: number } & Omit<OverflowProps, 'children'>> = ({
  children,
  width,
  ...overflowProps
}) => {
  const selector = {
    [selectors.container]: '',
  };

  return (
    <Overflow padding={0} {...overflowProps}>
      <div
        {...selector}
        style={{
          width: width ?? 500,
          border: '1px dashed red',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          resize: 'horizontal',
        }}
      >
        {children}
      </div>
    </Overflow>
  );
};

const setContainerSize = (size: number) => {
  cy.get(`[${selectors.container}]`)
    .then(container => {
      container.css('width', `${size}px`);
    })
    .log(`Setting container size to ${size}px`)
    .wait(1);
};

const Item: React.FC<{ children?: React.ReactNode; width?: number } & Omit<OverflowItemProps, 'children'>> = ({
  children,
  width,
  ...overflowItemProps
}) => {
  const selector = {
    [selectors.item]: overflowItemProps.id,
  };

  return (
    <OverflowItem {...overflowItemProps}>
      <button {...selector} style={{ width: width ?? 50, height: 20 }}>
        {children}
      </button>
    </OverflowItem>
  );
};

const Menu: React.FC<{ width?: number }> = ({ width }) => {
  const { isOverflowing, ref, overflowCount } = useOverflowMenu<HTMLButtonElement>();
  const selector = {
    [selectors.menu]: '',
  };

  if (!isOverflowing) {
    return null;
  }

  // No need to actually render a menu, we're testing state
  return (
    <button {...selector} ref={ref} style={{ width: width ?? 50, height: 20 }}>
      +{overflowCount}
    </button>
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

describe('Overflow', () => {
  before(() => {
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

    setContainerSize(500);
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
      setContainerSize(containerSize);
      cy.get(`[${selectors.menu}]`).should('have.text', `+${overflowCount}`);
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
      setContainerSize(containerSize);
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
      setContainerSize(containerSize);
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
      setContainerSize(containerSize);
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
      setContainerSize(containerSize);
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
      setContainerSize(containerSize);
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
    setContainerSize(150);
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

    setContainerSize(350);
    cy.get(`[${selectors.divider}="4"]`);
    cy.get(`[${selectors.divider}="4"]`).should('not.exist');
    cy.get(`[${selectors.divider}]`).should('have.length', 3);
    setContainerSize(250);
    cy.get(`[${selectors.divider}="3"]`).should('not.exist');
    cy.get(`[${selectors.divider}]`).should('have.length', 2);
    setContainerSize(200);
    cy.get(`[${selectors.divider}="1"]`).should('not.exist');
    cy.get(`[${selectors.divider}]`).should('have.length', 1);
  });

  it.only('should remove overflow menu if the last overflowed item can take its place', () => {
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

    setContainerSize(497);
    setContainerSize(498);
    setContainerSize(499);
    setContainerSize(500);
    cy.get(`[${selectors.menu}]`).should('not.exist');
  });
});
