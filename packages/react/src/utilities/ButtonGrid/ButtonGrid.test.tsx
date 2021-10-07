import * as React from 'react';
import { ButtonGrid } from './ButtonGrid';
import { getStyles } from './ButtonGrid.styles';
import { isConformant } from '../../common/isConformant';
import { safeMount } from '@fluentui/test-utilities';

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
    safeMount(
      <ButtonGrid
        items={DEFAULT_ITEMS}
        columnCount={4}
        styles={getStyles}
        onRenderItem={(item, index: number) => {
          return <button role="gridcell">item.text</button>;
        }}
      />,
      wrapper => {
        expect(wrapper.find('table[role="grid"]').length).toEqual(1);
        expect(wrapper.find('tr[role="row"]').length).toEqual(2);
        expect(wrapper.find('td [role="gridcell"]').length).toEqual(8);
        expect(wrapper.find('[aria-posinset]').length).toEqual(0);
        expect(wrapper.find('[aria-setsize]').length).toEqual(0);
      },
    );
  });
  it('Can render a ButtonGrid with width of 2', () => {
    safeMount(
      <ButtonGrid
        items={DEFAULT_ITEMS}
        columnCount={2}
        styles={getStyles}
        onRenderItem={(item, index: number) => {
          return <button role="gridcell">item.text</button>;
        }}
      />,
      wrapper => {
        expect(wrapper.find('table[role="grid"]').length).toEqual(1);
        expect(wrapper.find('tr[role="row"]').length).toEqual(4);
        expect(wrapper.find('td [role="gridcell"]').length).toEqual(8);
        expect(wrapper.find('[aria-posinset]').length).toEqual(0);
        expect(wrapper.find('[aria-setsize]').length).toEqual(0);
      },
    );
  });
  it('Can render a ButtonGrid with posInSet and setSize', () => {
    safeMount(
      <ButtonGrid
        items={DEFAULT_ITEMS}
        columnCount={2}
        styles={getStyles}
        onRenderItem={(item, index: number) => {
          return <button role="gridcell">item.text</button>;
        }}
        positionInSet={1}
        setSize={2}
      />,
      wrapper => {
        expect(wrapper.find('table[role="grid"]').length).toEqual(1);
        expect(wrapper.find('tr[role="row"]').length).toEqual(4);
        expect(wrapper.find('td [role="gridcell"]').length).toEqual(8);
        expect(wrapper.find('[aria-posinset]').length).toEqual(1);
        expect(wrapper.find('[aria-posinset]').html()).toEqual(expect.stringMatching('aria-posinset="1"'));
        expect(wrapper.find('[aria-setsize]').length).toEqual(1);
        expect(wrapper.find('[aria-posinset]').html()).toEqual(expect.stringMatching('aria-setsize="2"'));
      },
    );
  });
});
