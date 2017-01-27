/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import { mount, shallow } from 'enzyme';
import { setRTL } from '../../Utilities';
import * as chai from 'chai';
let { expect } = chai;

import { Facepile } from './Facepile';
import { IFacepilePersona, OverflowButtonType } from './Facepile.Props';
import { Persona, PersonaSize } from '../Persona';

describe('Facepile', () => {
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
      const wrapper = shallow(
        <Facepile
          personas={ [] }
          addButtonProps={ {} }
          showAddButton={ true }
        />);
      let addButton = wrapper.find('.ms-Icon--AddFriend');
      expect(addButton).to.have.length(1, 'Add button should render');
      let buttons = wrapper.find('.ms-Facepile-itemButton');
      expect(buttons).to.have.length(1, 'Only one button should be rendered');
    });

    it('renders chevron overflow button if overflowButtonProps are not null and OverflowButtonType equals downArrow', () => {
      const wrapper = shallow(
        <Facepile
          personas={ [] }
          overflowButtonProps={ {} }
          overflowButtonType={ OverflowButtonType.downArrow }
        />);
      let overflowButton = wrapper.find('.ms-Icon--ChevronDown');
      expect(overflowButton).to.have.length(1, 'Overflow button should render');
      let buttons = wrapper.find('.ms-Facepile-itemButton');
      expect(buttons).to.have.length(1, 'Only one button should be rendered');
    });

    it('renders more overflow button if overflowButtonProps are not null as OverflowButtonType equals more', () => {
      const wrapper = shallow(
        <Facepile
          personas={ [] }
          overflowButtonProps={ {} }
          overflowButtonType={ OverflowButtonType.more }
        />);
      let overflowButton = wrapper.find('.ms-Icon--More');
      expect(overflowButton).to.have.length(1, 'Overflow button should render');
      let buttons = wrapper.find('.ms-Facepile-itemButton');
      expect(buttons).to.have.length(1, 'Only one button should be rendered');
    });

    it('renders without descriptive overflow button if overflowButtonProps are not null and maximum personas are not exceeded', () => {
      const wrapper = shallow(
        <Facepile personas={ [] }
          overflowButtonProps={ {} }
          overflowButtonType={ OverflowButtonType.descriptive }
        />);
      let overflowButton = wrapper.find('.ms-Facepile-descriptiveOverflowButton');
      expect(overflowButton).to.have.length(0, 'Overflow button should not render');
      let buttons = wrapper.find('.ms-Facepile-itemButton');
      expect(buttons).to.have.length(0, 'No buttons should be rendered');
    });

    it('renders with descriptive overflow button if overflowButtonProps are not null and maximum personas are exceeded', () => {
      let personas: IFacepilePersona[] = facepilePersonas.concat(...facepilePersonas, ...facepilePersonas);
      const wrapper = shallow(
        <Facepile
          personas={ personas }
          maxDisplayablePersonas={ 5 }
          overflowButtonProps={ {} }
          overflowButtonType={ OverflowButtonType.descriptive }
        />);
      let overflowButton = wrapper.find('.ms-Facepile-descriptiveOverflowButton');
      expect(overflowButton).to.have.length(1, 'Overflow button should render');
      let buttons = wrapper.find('.ms-Facepile-itemButton');
      expect(buttons).to.have.length(6, 'All six personas and overflow button should be rendered');
    });

    it('renders no more than maximum allowed personas', () => {
      const wrapper = shallow(
        <Facepile
          personas={ facepilePersonas.concat(facepilePersonas, facepilePersonas, facepilePersonas) }
          maxDisplayablePersonas={ 2 }
        />);
      let buttons = wrapper.find('.ms-Facepile-itemButton');
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
      const wrapper = mount(
        <Facepile
          personas={ personas }
        />);
      let buttons = wrapper.find('.ms-Facepile-itemButton');
      expect(buttons).to.have.length(1, 'Clickable Persona should render');
      buttons.simulate('click');
      expect(clicked).to.be.equal(1, 'Persona should have been clickable');
    });

    it('personas and buttons render default size if not specified', () => {
      const wrapper = shallow(
        <Facepile
          personas={ facepilePersonas }
          addButtonProps={ {} }
          showAddButton={ true }
          overflowButtonProps={ {} }
          overflowButtonType={ OverflowButtonType.downArrow }
        />);
      let addButton = wrapper.find('.ms-Persona.ms-Persona--xs.ms-Facepile-addButton.ms-Facepile-itemButton');
      expect(addButton).to.have.length(1, 'Add button should render');
      let faces = wrapper.find(Persona);
      expect(faces).to.have.length(facepilePersonas.length, 'personas should render');
      wrapper.find(Persona).forEach(function (node) {
        expect(node.html()).to.contain('ms-Persona--xs');
      });
      let overflowButton = wrapper.find('.ms-Persona.ms-Persona--xs.ms-Facepile-overflowButton.ms-Facepile-itemButton');
      expect(overflowButton).to.have.length(1, 'Overflow button should render');
    });

    it('personas and buttons render specified size', () => {
      // Test XXS size renders
      let wrapper = shallow(
        <Facepile
          personas={ facepilePersonas }
          personaSize={ PersonaSize.extraExtraSmall }
        />);
      let faces = wrapper.find(Persona);
      expect(faces).to.have.length(facepilePersonas.length, 'XXSmall personas should render');
      wrapper.find(Persona).forEach(function (node) {
        expect(node.html()).to.contain('ms-Persona--xxs');
      });

      // Test small size renders
      wrapper = shallow(
        <Facepile
          personas={ facepilePersonas }
          personaSize={ PersonaSize.small }
        />);
      faces = wrapper.find(Persona);
      expect(faces).to.have.length(facepilePersonas.length, 'Small personas should render');
      wrapper.find(Persona).forEach(function (node) {
        expect(node.html()).to.contain('ms-Persona--sm');
      });
    });
  });
});