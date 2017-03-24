/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
/* tslint:enable:no-unused-variable */
import { mount } from 'enzyme';
import { setRTL } from '../../Utilities';
import * as chai from 'chai';
let { expect } = chai;

import { Facepile } from './Facepile';
import { IFacepilePersona, OverflowButtonType } from './Facepile.Props';
import { Persona, PersonaSize } from '../Persona';

describe.only('Facepile', () => {
  const facepilePersonas: IFacepilePersona[] = [
    {
      imageUrl: './images/persona-female.png',
      personaName: 'Annie Lindqvist',
      data: '50%'
    },
    {
      imageUrl: './images/persona-male.png',
      personaName: 'Aaron Reid',
      data: '$1,000'
    },
    {
      personaName: 'Alex Lundberg',
      data: '75%',
      onClick: (ev: React.MouseEvent<HTMLElement>, persona: IFacepilePersona) =>
        alert('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data)
    }
  ];

  describe('Render personas and buttons', () => {
    beforeEach(() => {
      setRTL(false);
    });

    it('renders with only add button if no personas found and addButtonProps are not null', () => {
      const wrapper = ReactTestUtils.renderIntoDocument(
        <Facepile
          personas={ [] }
          addButtonProps={ {} }
          showAddButton={ true }
        />);

      let facepile = ReactDOM.findDOMNode(wrapper as React.ReactInstance);
      let addButton = facepile.querySelectorAll('.ms-Icon--AddFriend');
      expect(addButton).to.have.length(1, 'Add button should render');
      let buttons = facepile.querySelectorAll("[class*='itemButton']");
      expect(buttons).to.have.length(1, 'Only one button should be rendered');
    });

    it('renders chevron overflow button if overflowButtonType is not none and OverflowButtonType equals downArrow', () => {
      const wrapper = ReactTestUtils.renderIntoDocument(
        <Facepile
          personas={ [] }
          overflowButtonType={ OverflowButtonType.downArrow }
        />);

      let facepile = ReactDOM.findDOMNode(wrapper as React.ReactInstance);
      let overflowButton = facepile.querySelectorAll('.ms-Icon--ChevronDown');
      expect(overflowButton).to.have.length(1, 'Overflow button should render');
      let buttons = facepile.querySelectorAll("[class*='itemButton']");
      expect(buttons).to.have.length(1, 'Only one button should be rendered');
    });

    it('renders more overflow button if overflowButtonType is not none as OverflowButtonType equals more', () => {
      const wrapper = ReactTestUtils.renderIntoDocument(
        <Facepile
          personas={ [] }
          overflowButtonType={ OverflowButtonType.more }
        />);

      let facepile = ReactDOM.findDOMNode(wrapper as React.ReactInstance);
      let overflowButton = facepile.querySelectorAll('.ms-Icon--More');
      expect(overflowButton).to.have.length(1, 'Overflow button should render');
      let buttons = facepile.querySelectorAll("[class*='itemButton']");
      expect(buttons).to.have.length(1, 'Only one button should be rendered');
    });

    it('renders without descriptive overflow button if overflowButtonType is not none and maximum personas are not exceeded', () => {
      let personas: IFacepilePersona[] = facepilePersonas.concat(...facepilePersonas, ...facepilePersonas);
      const wrapper = ReactTestUtils.renderIntoDocument(
        <Facepile
          personas={ [] }
          overflowButtonType={ OverflowButtonType.descriptive }
        />);

      let facepile = ReactDOM.findDOMNode(wrapper as React.ReactInstance);
      let overflowButton = facepile.querySelectorAll('.ms-Facepile-descriptiveOverflowButton');
      expect(overflowButton).to.have.length(0, 'Overflow button should not render');
      let buttons = facepile.querySelectorAll("[class*='itemButton']");
      expect(buttons).to.have.length(0, 'No buttons should be rendered');
    });

    it('renders with descriptive overflow button if overflowButtonType is not none and maximum personas are exceeded', () => {
      let personas: IFacepilePersona[] = facepilePersonas.concat(...facepilePersonas, ...facepilePersonas);
      const wrapper = ReactTestUtils.renderIntoDocument(
        <Facepile
          personas={ personas }
          maxDisplayablePersonas={ 5 }
          overflowButtonType={ OverflowButtonType.descriptive }
        />);

      let facepile = ReactDOM.findDOMNode(wrapper as React.ReactInstance);
      let overflowButton = facepile.querySelectorAll('.ms-Facepile-descriptiveOverflowButton');
      expect(overflowButton).to.have.length(1, 'Overflow button should render');
      let buttons = facepile.querySelectorAll("[class*='itemButton']");
      expect(buttons).to.have.length(5, 'Four personas and overflow button should be rendered');
    });

    it('renders no more than maximum allowed personas', () => {
      const wrapper = mount(
        <Facepile
          personas={ facepilePersonas.concat(facepilePersonas, facepilePersonas, facepilePersonas) }
          maxDisplayablePersonas={ 2 }
        />);

      let facepile = wrapper.find(Facepile);
      let buttons = facepile.find(Persona);
      expect(buttons).to.have.length(2, 'Only two buttons should be rendered');
    });

    it('persona is clickable if onClick property is set', () => {
      let clicked = 0;
      let personas: IFacepilePersona[] = [{
        personaName: 'Alex Lundberg',
        onClick: (ev: React.MouseEvent<HTMLElement>, persona: IFacepilePersona) => {
          clicked++;
          ev.preventDefault();
        }
      }];

      const wrapper = ReactTestUtils.renderIntoDocument(
        <Facepile
          personas={ personas }
        />);

      let facepile = ReactDOM.findDOMNode(wrapper as React.ReactInstance);
      let buttons = facepile.querySelectorAll("[class*='itemButton']");
      expect(buttons).to.have.length(1, 'Clickable Persona should render');
      ReactTestUtils.Simulate.click(buttons[0]);
      expect(clicked).to.be.equal(1, 'Persona should have been clickable');
    });
  });

  describe('Renders personas the correct size', () => {
    it('personas and buttons render default size if not specified', () => {
      const wrapper = mount(
        <Facepile
          personas={ facepilePersonas }
          showAddButton={ true }
          overflowButtonType={ OverflowButtonType.downArrow }
        />);

      let addButton = wrapper.find('.ms-Facepile-addButton .ms-Persona.ms-Persona--xs');
      expect(addButton).to.have.length(1, 'Add button should render');
      let faces = wrapper.find(Persona);
      expect(faces).to.have.length(facepilePersonas.length + 2, 'personas, add button, and overflow should render');
      faces.forEach(node => {
        expect(node.html()).to.contain('ms-Persona--xs');
      });
      let overflowButton = wrapper.find('.ms-Facepile-overflowButton .ms-Persona--xs');
      expect(overflowButton).to.have.length(1, 'Overflow button should render');
    });

    it('personas and buttons render specified size', () => {
      // Test XXS size renders
      let wrapper = mount(
        <Facepile
          personas={ facepilePersonas }
          personaSize={ PersonaSize.extraExtraSmall }
        />);

      let faces = wrapper.find(Persona);
      expect(faces).to.have.length(facepilePersonas.length, 'XXSmall personas should render');
      faces.forEach((node) => {
        expect(node.html()).to.contain('ms-Persona--xxs');
      });

      // Test small size renders
      wrapper = mount(
        <Facepile
          personas={ facepilePersonas }
          personaSize={ PersonaSize.small }
        />);

      faces = wrapper.find(Persona);
      expect(faces).to.have.length(facepilePersonas.length, 'Small personas should render');
      faces.forEach((node) => {
        expect(node.html()).to.contain('ms-Persona--sm');
      });
    });
  });

  describe('Number of personas to render', () => {
    const testWidth: number = 200;

    beforeEach(() => {
      setRTL(false);
    });

    it('renders no more than maximum allowed personas', () => {
      const wrapper = mount(
        <Facepile
          personas={ facepilePersonas.concat(facepilePersonas, facepilePersonas, facepilePersonas) }
          maxDisplayablePersonas={ 2 }
          />);

      let faces = wrapper.find(Persona);
      expect(faces).to.have.length(2, 'Only two personas should be rendered');
    });
  });
});