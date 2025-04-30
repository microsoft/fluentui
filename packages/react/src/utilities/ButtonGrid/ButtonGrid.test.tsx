import * as React from 'react';
import { ButtonGrid } from './ButtonGrid';
import { getStyles } from './ButtonGrid.styles';
import { isConformant } from '../../common/isConformant';
import { render } from '@testing-library/react';
import { getBySelector, getByAllSelector } from '../../common/testUtilities';

const DEFAULT_ITEMS: any[] = [
  { id: 'a', text: '0,0' },
  { id: 'b', text: '1,0' },
  { id: 'c', text: '2,0' },
  { id: 'd', text: '3,0' },
  { id: 'e', text: '0,1' },
  { id: 'f', text: '1,1' },
  { id: 'g', text: '2,1' },
  { id: 'h', text: '3,1' },
];

describe('ButtonGrid', () => {
  isConformant({
    Component: ButtonGrid,
    displayName: 'ButtonGrid',
    requiredProps: {
      items: DEFAULT_ITEMS,
      columnCount: 4,
      styles: getStyles,
      onRenderItem: () => <div />,
    },
    disabledTests: ['has-top-level-file', 'component-handles-classname'],
  });

  it('Can render a ButtonGrid with width of four', () => {
    const { container } = render(
      <ButtonGrid
        items={DEFAULT_ITEMS}
        columnCount={4}
        styles={getStyles}
        onRenderItem={(item, index: number) => {
          return <button role="gridcell">item.text</button>;
        }}
      />,
    );

    expect(getBySelector(container, 'table[role="grid"]')).toBeTruthy();
    expect(getByAllSelector(container, 'tr[role="row"]').length).toEqual(2);
    expect(getByAllSelector(container, 'td [role="gridcell"]').length).toEqual(8);
    expect(getByAllSelector(container, '[aria-posinset]').length).toEqual(0);
    expect(getByAllSelector(container, '[aria-setsize]').length).toEqual(0);
  });

  it('Can render a ButtonGrid with width of 2', () => {
    const { container } = render(
      <ButtonGrid
        items={DEFAULT_ITEMS}
        columnCount={2}
        styles={getStyles}
        onRenderItem={(item, index: number) => {
          return <button role="gridcell">item.text</button>;
        }}
      />,
    );

    expect(getBySelector(container, 'table[role="grid"]')).toBeTruthy();
    expect(getByAllSelector(container, 'tr[role="row"]').length).toEqual(4);
    expect(getByAllSelector(container, 'td [role="gridcell"]').length).toEqual(8);
    expect(getByAllSelector(container, '[aria-posinset]').length).toEqual(0);
    expect(getByAllSelector(container, '[aria-setsize]').length).toEqual(0);
  });

  it('Can render a ButtonGrid with posInSet and setSize', () => {
    const { container } = render(
      <ButtonGrid
        items={DEFAULT_ITEMS}
        columnCount={2}
        styles={getStyles}
        onRenderItem={(item, index: number) => {
          return <button role="gridcell">item.text</button>;
        }}
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        positionInSet={1}
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        setSize={2}
      />,
    );

    expect(getBySelector(container, 'table[role="grid"]')).toBeTruthy();
    expect(getByAllSelector(container, 'tr[role="row"]').length).toEqual(4);
    expect(getByAllSelector(container, 'td [role="gridcell"]').length).toEqual(8);
    expect(getByAllSelector(container, '[aria-posinset]').length).toEqual(1);

    const elementWithPosInSet = getBySelector(container, '[aria-posinset]');
    expect(elementWithPosInSet?.getAttribute('aria-posinset')).toEqual('1');

    expect(getByAllSelector(container, '[aria-setsize]').length).toEqual(1);
    const elementWithSetSize = getBySelector(container, '[aria-setsize]');
    expect(elementWithSetSize?.getAttribute('aria-setsize')).toEqual('2');
  });
});
