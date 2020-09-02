import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { TestImages } from '@uifabric/example-data';
import { setRTL } from '../../Utilities';
import { Facepile } from './Facepile';
import { IFacepilePersona, OverflowButtonType } from './Facepile.types';
import { PersonaSize } from '../../Persona';
import { Persona } from '../../Persona';
import { PersonaCoin } from '../../PersonaCoin';
import { findNodes, expectOne, expectMissing } from '../../common/testUtilities';

const facepilePersonas: IFacepilePersona[] = [
  {
    imageUrl: TestImages.personaFemale,
    personaName: 'Annie Lindqvist',
    data: '50%',
  },
  {
    imageUrl: TestImages.personaFemale,
    personaName: 'Aaron Reid',
    data: '$1,000',
  },
  {
    personaName: 'Alex Lundberg',
    data: '75%',
    onClick: (ev: React.MouseEvent<HTMLElement>, persona: IFacepilePersona) =>
      console.log('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data),
  },
];

describe('Facepile', () => {
  beforeEach(() => {
    setRTL(false);
  });

  it('renders Facepile correctly', () => {
    const component = renderer.create(<Facepile personas={facepilePersonas} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with only add button if no personas found and addButtonProps are not null', () => {
    const wrapper = mount(<Facepile personas={[]} addButtonProps={{}} showAddButton={true} />);

    expectOne(wrapper, '.ms-Facepile-addButton');
    expectOne(wrapper, '.ms-Facepile-itemButton');
  });

  it('renders chevron overflow button if overflowButtonProps are not null and OverflowButtonType is downArrow', () => {
    const wrapper = mount(
      <Facepile personas={[]} overflowButtonProps={{}} overflowButtonType={OverflowButtonType.downArrow} />,
    );

    expectOne(wrapper, '.ms-Facepile-overflowButton');
    expectOne(wrapper, '.ms-Facepile-itemButton');
  });

  it('renders more overflow button if overflowButtonProps are not null as OverflowButtonType is more', () => {
    const wrapper = mount(
      <Facepile personas={[]} overflowButtonProps={{}} overflowButtonType={OverflowButtonType.more} />,
    );

    expectOne(wrapper, '.ms-Facepile-overflowButton');
    expectOne(wrapper, '.ms-Facepile-itemButton');
  });

  // eslint-disable-next-line @fluentui/max-len
  it('renders without descriptive overflow button if overflowButtonProps are not null and maximum personas are not exceeded', () => {
    const wrapper = mount(
      <Facepile personas={[]} overflowButtonProps={{}} overflowButtonType={OverflowButtonType.descriptive} />,
    );

    expectMissing(wrapper, '.ms-Facepile-descriptiveOverflowButton');
    expectMissing(wrapper, '.ms-Facepile-itemButton');
  });

  // eslint-disable-next-line @fluentui/max-len
  it('renders with descriptive overflow button if overflowButtonProps are not null and maximum personas are exceeded', () => {
    const personas: IFacepilePersona[] = facepilePersonas.concat(...facepilePersonas, ...facepilePersonas);
    const wrapper = mount(
      <Facepile
        personas={personas}
        maxDisplayablePersonas={5}
        overflowButtonProps={{}}
        overflowButtonType={OverflowButtonType.descriptive}
      />,
    );
    expectOne(wrapper, '.ms-Facepile-descriptiveOverflowButton');
    expect(findNodes(wrapper, '.ms-Facepile-itemButton').length).toEqual(6);
  });

  it('renders descriptive overflow button with comma-delimited persona names as title value by default', () => {
    const personas: IFacepilePersona[] = facepilePersonas.concat(...facepilePersonas, ...facepilePersonas);
    const maxDisplayablePersonas: number = 5;

    const wrapper = mount(
      <Facepile
        personas={personas}
        maxDisplayablePersonas={maxDisplayablePersonas}
        overflowButtonProps={{}}
        overflowButtonType={OverflowButtonType.descriptive}
      />,
    );

    const overflowPersonasTitle = personas
      .slice(maxDisplayablePersonas, personas.length)
      .map((p: IFacepilePersona) => p.personaName)
      .join(', ');

    expect(
      findNodes(wrapper, '.ms-Facepile-descriptiveOverflowButton')
        .getDOMNode()
        .attributes.getNamedItem('title'),
    ).toHaveProperty('value', overflowPersonasTitle);
  });

  it('renders a descriptive overflow button with a custom title', () => {
    const personas: IFacepilePersona[] = facepilePersonas.concat(...facepilePersonas, ...facepilePersonas);
    const title: string = 'custom title';
    const wrapper = mount(
      <Facepile
        personas={personas}
        maxDisplayablePersonas={5}
        overflowButtonProps={{ title }}
        overflowButtonType={OverflowButtonType.descriptive}
      />,
    );
    expect(
      findNodes(wrapper, '.ms-Facepile-descriptiveOverflowButton')
        .getDOMNode()
        .attributes.getNamedItem('title'),
    ).toHaveProperty('value', title);
  });

  it('renders no more than maximum allowed personas', () => {
    const wrapper = mount(
      <Facepile
        personas={facepilePersonas.concat(facepilePersonas, facepilePersonas, facepilePersonas)}
        maxDisplayablePersonas={2}
      />,
    );
    expect(findNodes(wrapper, '.ms-Facepile-itemButton').length).toEqual(2);
  });

  it('persona is clickable if onClick property is set', () => {
    let clicked = 0;
    const personas: IFacepilePersona[] = [
      {
        personaName: 'Alex Lundberg',
        onClick: (ev: React.MouseEvent<HTMLElement>, persona: IFacepilePersona) => {
          clicked++;
          ev.preventDefault();
        },
      },
    ];

    const wrapper = mount(<Facepile personas={personas} />);

    const buttons = findNodes(wrapper, '.ms-Facepile-itemButton');

    expect(buttons.length).toEqual(1);
    buttons.simulate('click');
    expect(clicked).toEqual(1);
  });

  it('personas and buttons render default size if not specified', () => {
    const wrapper = mount(
      <Facepile
        personas={facepilePersonas}
        addButtonProps={{}}
        showAddButton={true}
        overflowButtonProps={{}}
        overflowButtonType={OverflowButtonType.downArrow}
      />,
    );

    expectOne(wrapper, '.ms-Facepile-addButton .ms-Persona-coin.ms-Persona--size32');
    expectOne(wrapper, '.ms-Facepile-overflowButton .ms-Persona--size32');

    const faces = findNodes(wrapper, '.ms-Facepile-person .ms-Persona-coin');

    expect(faces.length).toEqual(facepilePersonas.length);

    for (let i = 0; i < faces.length; ++i) {
      expect(faces.at(i).hasClass('ms-Persona--size32')).toBeTruthy();
    }
  });

  it('personas and buttons render specified size', () => {
    // Test XXS size renders
    let wrapper = mount(<Facepile personas={facepilePersonas} personaSize={PersonaSize.size24} />);

    expect(wrapper.find(PersonaCoin).length).toEqual(facepilePersonas.length);
    wrapper.find(PersonaCoin).forEach(node => {
      // Need multiple Dives since PersonaCoin is decorated
      expect(node.find('.ms-Persona--size24').length).toEqual(1);
    });

    // Test small size renders
    wrapper = mount(<Facepile personas={facepilePersonas} personaSize={PersonaSize.size40} />);

    expect(wrapper.find(PersonaCoin).length).toEqual(facepilePersonas.length);
    wrapper.find(PersonaCoin).forEach(node => {
      // Need multiple Dives since PersonaCoin is decorated
      expect(node.find('.ms-Persona--size40').length).toEqual(1);
    });
  });

  it('renders Persona control if exactly one persona is sent in props', () => {
    const wrapper = mount(<Facepile personas={facepilePersonas.slice(0, 1)} overflowPersonas={[]} />);

    expect(wrapper.find(PersonaCoin).length).toEqual(1);
    expect(wrapper.find(Persona).length).toEqual(1);
  });

  it('renders no Persona or PersonaCoin if 0 is passed in for maxDisplayablePersonas', () => {
    const wrapper = mount(<Facepile personas={facepilePersonas} maxDisplayablePersonas={0} />);

    expect(wrapper.find(PersonaCoin).length).toEqual(0);
    expect(wrapper.find(Persona).length).toEqual(0);
  });
});
