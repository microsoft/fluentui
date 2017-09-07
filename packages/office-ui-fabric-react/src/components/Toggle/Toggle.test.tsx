/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { mount } from 'enzyme';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
import * as sinon from 'sinon';
let { expect } = chai;

import { Toggle } from './Toggle';

describe('Toggle', () => {

  it('renders a label', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Toggle
        label='Label'
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let labelElement = renderedDOM.querySelector('.ms-Toggle-label') as Element;

    expect(labelElement.textContent).to.equal('Label');
  });

  it('renders aria-label', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Toggle
        label='Label'
        offAriaLabel='offLabel'
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let labelElement = renderedDOM.querySelector('button') as Element;

    expect(labelElement.getAttribute('aria-label')).to.equal('offLabel');
  });

  it('can call the callback on a change of toggle', () => {
    let isToggledValue;
    let callback = (isToggled: boolean) => {
      isToggledValue = isToggled;
    };
    let component: any;

    ReactTestUtils.renderIntoDocument<React.ReactInstance>(
      <Toggle
        componentRef={ ref => component = ref }
        label='Label'
        onChanged={ callback }
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let button = renderedDOM.querySelector('button') as HTMLButtonElement;

    ReactTestUtils.Simulate.click(button);
    expect(isToggledValue).to.equal(true);
    expect((component as React.Component<any, any>).state.isChecked).to.equal(true);
  });

  it(`doesn't update the state if the user provides checked`, () => {
    let component: any;

    ReactTestUtils.renderIntoDocument(
      <Toggle
        componentRef={ ref => component = ref }
        label='Label'
        checked={ false }
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let button = renderedDOM.querySelector('button') as HTMLButtonElement;

    ReactTestUtils.Simulate.click(button);

    expect((component as React.Component<any, any>).state.isChecked).to.equal(false);
  });

  it(`doesn't render a label element if none is provided`, () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Toggle
        checked={ false }
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let label = renderedDOM.querySelector('label');

    // tslint:disable-next-line:no-unused-expression
    expect(label).is.null;
  });

  it(`doesn't trigger onSubmit when placed inside a form`, () => {
    let component: any;
    const onSubmit = sinon.spy();

    const wrapper = mount(
      <form
        action='#'
        onSubmit={ (e) => {
          onSubmit();
          e.preventDefault();
        } }
      >
        <Toggle
          componentRef={ ref => component = ref }
          label='Label'
        />
      </form>
    );
    let button: any = wrapper.find('button');
    // simulate to change toggle state
    button.simulate('click');
    // click to force propegation to form wrapper https://github.com/airbnb/enzyme/issues/308#issuecomment-255630011
    button.get(0).click();
    expect((component as React.Component<any, any>).state.isChecked).to.equal(true);
    expect(onSubmit.called).to.equal(false);
  });

});
