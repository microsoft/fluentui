import { Promise } from 'es6-promise';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { SearchBox } from './SearchBox';

// tslint:disable:jsx-no-lambda

describe('SearchBox', () => {

  it('renders SearchBox correctly', () => {
    const component = renderer.create(<SearchBox />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can execute an onClick on clear button', () => {
    let clickExecuted = false;
    const component = mount(
      <SearchBox
        clearButtonProps={ {
          onClick: () => clickExecuted = true
        } }
      />
    );

    expect(component.find('input').prop('value')).toEqual('');

    component.find('input').simulate('change', { target: { value: 'New value' } });

    expect(component.find('input').prop('value')).toEqual('New value');

    component.find('button').simulate('click');

    expect(clickExecuted).toEqual(true);

    expect(component.find('input').prop('value')).toEqual('');
  });
});