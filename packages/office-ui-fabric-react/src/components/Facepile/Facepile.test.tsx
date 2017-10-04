/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
/* tslint:enable:no-unused-variable */
import { mount, shallow } from 'enzyme';
import { setRTL } from '../../Utilities';
import { Facepile } from './Facepile';
import { IFacepilePersona, OverflowButtonType } from './Facepile.Props';
import { PersonaSize } from '../Persona';
import { PersonaCoin } from '../../PersonaCoin';
import { TestImages } from '../../common/TestImages';

describe('Facepile', () => {
  const facepilePersonas: IFacepilePersona[] = [
    {
      imageUrl: TestImages.personaFemale,
      personaName: 'Annie Lindqvist',
      data: '50%'
    },
    {
      imageUrl: TestImages.personaFemale,
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

      let addButton = facepile.querySelectorAll('.ms-Facepile-addButton');
      expect(addButton).toHaveLength(1);
      let buttons = facepile.querySelectorAll('.ms-Facepile-itemButton');
      expect(buttons).toHaveLength(1);
    });

    it('renders chevron overflow button if overflowButtonProps are not null and OverflowButtonType equals downArrow', () => {
      const wrapper = ReactTestUtils.renderIntoDocument(
        <Facepile
          personas={ [] }
          overflowButtonProps={ {} }
          overflowButtonType={ OverflowButtonType.downArrow }
        />);
      let facepile = ReactDOM.findDOMNode(wrapper as React.ReactInstance);
      let overflowButton = facepile.querySelectorAll('.ms-Facepile-overflowButton');
      expect(overflowButton).toHaveLength(1);
      let buttons = facepile.querySelectorAll('.ms-Facepile-itemButton');
      expect(buttons).toHaveLength(1);
    });

    it('renders more overflow button if overflowButtonProps are not null as OverflowButtonType equals more', () => {
      const wrapper = ReactTestUtils.renderIntoDocument(
        <Facepile
          personas={ [] }
          overflowButtonProps={ {} }
          overflowButtonType={ OverflowButtonType.more }
        />);
      let facepile = ReactDOM.findDOMNode(wrapper as React.ReactInstance);
      let overflowButton = facepile.querySelectorAll('.ms-Facepile-overflowButton');
      expect(overflowButton).toHaveLength(1);
      let buttons = facepile.querySelectorAll('.ms-Facepile-itemButton');
      expect(buttons).toHaveLength(1);
    });

    it('renders without descriptive overflow button if overflowButtonProps are not null and maximum personas are not exceeded', () => {
      const wrapper = ReactTestUtils.renderIntoDocument(
        <Facepile
          personas={ [] }
          overflowButtonProps={ {} }
          overflowButtonType={ OverflowButtonType.descriptive }
        />);
      let facepile = ReactDOM.findDOMNode(wrapper as React.ReactInstance);
      let overflowButton = facepile.querySelectorAll('.ms-Facepile-descriptiveOverflowButton');
      expect(overflowButton).toHaveLength(0);
      let buttons = facepile.querySelectorAll('.ms-Facepile-itemButton');
      expect(buttons).toHaveLength(0);
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
      expect(overflowButton).toHaveLength(1);
      let buttons = wrapper.find('.ms-Facepile-itemButton');
      expect(buttons).toHaveLength(6);
    });

    it('renders no more than maximum allowed personas', () => {
      const wrapper = shallow(
        <Facepile
          personas={ facepilePersonas.concat(facepilePersonas, facepilePersonas, facepilePersonas) }
          maxDisplayablePersonas={ 2 }
        />);
      let buttons = wrapper.find('.ms-Facepile-itemButton');
      expect(buttons).toHaveLength(2);
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
      expect(buttons).toHaveLength(1);
      buttons.simulate('click');
      expect(clicked).toEqual(1);
    });

    it('personas and buttons render default size if not specified', () => {
      const wrapper = ReactTestUtils.renderIntoDocument(
        <Facepile
          personas={ facepilePersonas }
          addButtonProps={ {} }
          showAddButton={ true }
          overflowButtonProps={ {} }
          overflowButtonType={ OverflowButtonType.downArrow }
        />);
      let facepile = ReactDOM.findDOMNode(wrapper as React.ReactInstance);
      let addButton = facepile.querySelectorAll('.ms-Facepile-addButton .ms-Persona-coin.ms-Persona--xs');
      expect(addButton).toHaveLength(1);
      let faces = facepile.querySelectorAll('.ms-Facepile-person');
      expect(faces).toHaveLength(facepilePersonas.length);
      for (let i = 0; i < faces.length; ++i) {
        expect(faces[i].innerHTML).toEqual(expect.stringMatching('ms-Persona--xs'));
      }
      let overflowButton = facepile.querySelectorAll('.ms-Facepile-overflowButton .ms-Persona--xs');
      expect(overflowButton).toHaveLength(1);
    });

    it('personas and buttons render specified size', () => {
      // Test XXS size renders
      let wrapper = shallow(
        <Facepile
          personas={ facepilePersonas }
          personaSize={ PersonaSize.extraExtraSmall }
        />);
      let faces = wrapper.find(PersonaCoin);
      expect(faces).toHaveLength(facepilePersonas.length);
      wrapper.find(PersonaCoin).forEach((node) => {
        expect(node.html()).toEqual(expect.stringMatching('ms-Persona--xxs'));
      });

      // Test small size renders
      wrapper = shallow(
        <Facepile
          personas={ facepilePersonas }
          personaSize={ PersonaSize.small }
        />);
      faces = wrapper.find(PersonaCoin);
      expect(faces).toHaveLength(facepilePersonas.length);
      wrapper.find(PersonaCoin).forEach((node) => {
        expect(node.html()).toEqual(expect.stringMatching('ms-Persona--sm'));
      });
    });
  });
});