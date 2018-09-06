/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import * as Enzyme from 'enzyme';
import 'jest';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import { Accordion, IAccordionProps } from '.';

describe('Accordion', () => {
  let accordionChild: JSX.Element;
  let testHeaderProps: IAccordionProps;

  beforeEach(() => {
    accordionChild = (
      <DefaultButton
        key="item1"
        text="Link 1"
        iconProps={{ iconName: 'CompassNW' }}
        ariaLabel="New. Use left and right arrow keys to navigate"
        onClick={jest.fn()}
      />
    );
    testHeaderProps = {
      text: 'Stuff here',
      iconProps: { iconName: 'CollapseMenu' },
      onRenderContent: jest.fn()
    };
  });

  it('should render the component', () => {
    const wrapper = Enzyme.shallow(<Accordion {...testHeaderProps} />);
    expect(wrapper.find('.ba-Accordion').length).toBe(1);
  });

  it('should show the content when the header is clicked', () => {
    const wrapper = Enzyme.shallow(
      <Accordion
        {...testHeaderProps}
        /* tslint:disable:jsx-no-lambda */
        onRenderContent={() => {
          return (
            <DefaultButton
              key="item1"
              text="Link 1"
              iconProps={{ iconName: 'CompassNW' }}
              ariaLabel="New. Use left and right arrow keys to navigate"
              onClick={jest.fn()}
            />
          );
        }}
      />
    );
    wrapper.find('.ba-Accordion-header').simulate('click');
    expect(wrapper.find('.ba-Accordion-content').length).toBe(1);
  });

  it('should not show the content when the header is clicked twice', () => {
    const wrapper = Enzyme.shallow(
      <Accordion
        {...testHeaderProps}
        /* tslint:disable:jsx-no-lambda */
        onRenderContent={() => {
          return (
            <DefaultButton
              key="item1"
              text="Link 1"
              iconProps={{ iconName: 'CompassNW' }}
              ariaLabel="New. Use left and right arrow keys to navigate"
              onClick={jest.fn()}
            />
          );
        }}
      />
    );

    expect(wrapper.find('.ba-Accordion-content').length).toBe(0);

    wrapper.find('.ba-Accordion-header').simulate('click');
    wrapper.find('.ba-Accordion-header').simulate('click');
    expect(wrapper.find('.ba-Accordion-content').length).toBe(0);
  });
});
