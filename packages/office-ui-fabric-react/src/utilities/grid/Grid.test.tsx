/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import { Grid } from './Grid';
import { DefaultButton } from '../../Button';
import { shallow } from 'enzyme';

const DEFAULT_ITEMS: any[] = [
  { id: 'a', text: '0,0' },
  { id: 'b', text: '1,0' },
  { id: 'c', text: '2,0' },
  { id: 'd', text: '3,0' },
  { id: 'e', text: '0,1' },
  { id: 'f', text: '1,1' },
  { id: 'g', text: '2,1' },
  { id: 'h', text: '3,1' }
];

describe('Grid', () => {

  it('Can render a grid with width of four', () => {
    let wrapper = shallow(
      <Grid
        items={ DEFAULT_ITEMS }
        columnCount={ 4 }
        onRenderItem={ (item: any, index: number) => { return <DefaultButton role='gridcell'>item.text</DefaultButton>; } }
      />
    );
    expect(wrapper.find('table[role="grid"]').length).toEqual(1);
    expect(wrapper.find('tr[role="row"]').length).toEqual(2);
    expect(wrapper.find('td [role="gridcell"]').length).toEqual(8);
    expect(wrapper.find('[aria-posinset]').length).toEqual(0);
    expect(wrapper.find('[aria-setsize]').length).toEqual(0);
  });
  it('Can render a grid with width of 2', () => {
    let wrapper = shallow(
      <Grid
        items={ DEFAULT_ITEMS }
        columnCount={ 2 }
        onRenderItem={ (item: any, index: number) => { return <DefaultButton role='gridcell'>item.text</DefaultButton>; } }
      />
    );
    expect(wrapper.find('table[role="grid"]').length).toEqual(1);
    expect(wrapper.find('tr[role="row"]').length).toEqual(4);
    expect(wrapper.find('td [role="gridcell"]').length).toEqual(8);
    expect(wrapper.find('[aria-posinset]').length).toEqual(0);
    expect(wrapper.find('[aria-setsize]').length).toEqual(0);
  });
  it('Can render a grid with posInSet and setSize', () => {
    let wrapper = shallow(
      <Grid
        items={ DEFAULT_ITEMS }
        columnCount={ 2 }
        onRenderItem={ (item: any, index: number) => { return <DefaultButton role='gridcell'>item.text</DefaultButton>; } }
        positionInSet={ 1 }
        setSize={ 2 }
      />
    );
    expect(wrapper.find('table[role="grid"]').length).toEqual(1);
    expect(wrapper.find('tr[role="row"]').length).toEqual(4);
    expect(wrapper.find('td [role="gridcell"]').length).toEqual(8);
    expect(wrapper.find('[aria-posinset]').length).toEqual(1);
    expect(wrapper.find('[aria-posinset]').html()).toEqual(expect.stringMatching('aria-posinset="1"'));
    expect(wrapper.find('[aria-setsize]').length).toEqual(1);
    expect(wrapper.find('[aria-posinset]').html()).toEqual(expect.stringMatching('aria-setsize="2"'));
  });
});