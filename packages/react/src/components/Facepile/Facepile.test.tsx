import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestImages } from '@fluentui/example-data';
import { setRTL } from '../../Utilities';
import { Facepile } from './Facepile';
import { OverflowButtonType } from './Facepile.types';
import { PersonaSize } from '../../Persona';
import { isConformant } from '../../common/isConformant';
import type { IFacepilePersona } from './Facepile.types';

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
    const { container } = render(<Facepile personas={facepilePersonas} />);
    expect(container).toMatchSnapshot();
  });

  isConformant({
    Component: Facepile,
    displayName: 'Facepile',
    // Problem: Doesn’t pass ref to the root element.
    // Solution: Ensure ref is passed correctly to the root element.
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });

  it('renders with only add button if no personas found and addButtonProps are not null', () => {
    const { getAllByRole } = render(<Facepile personas={[]} addButtonProps={{}} showAddButton={true} />);

    expect(getAllByRole('button')).toHaveLength(1);
  });

  it('renders chevron overflow button if overflowButtonProps are not null and OverflowButtonType is downArrow', () => {
    const { getAllByRole } = render(
      <Facepile personas={[]} overflowButtonProps={{}} overflowButtonType={OverflowButtonType.downArrow} />,
    );

    expect(getAllByRole('button')).toHaveLength(1);
  });

  it('renders more overflow button if overflowButtonProps are not null as OverflowButtonType is more', () => {
    const { getAllByRole } = render(
      <Facepile personas={[]} overflowButtonProps={{}} overflowButtonType={OverflowButtonType.more} />,
    );

    expect(getAllByRole('button')).toHaveLength(1);
  });

  // eslint-disable-next-line @fluentui/max-len
  it('renders without descriptive overflow button if overflowButtonProps are not null and maximum personas are not exceeded', () => {
    const { queryAllByRole } = render(
      <Facepile personas={[]} overflowButtonProps={{}} overflowButtonType={OverflowButtonType.descriptive} />,
    );

    expect(queryAllByRole('button')).toHaveLength(0);
  });

  // eslint-disable-next-line @fluentui/max-len
  it('renders with descriptive overflow button if overflowButtonProps are not null and maximum personas are exceeded', () => {
    const personas: IFacepilePersona[] = facepilePersonas.concat(...facepilePersonas, ...facepilePersonas);
    const { getAllByRole } = render(
      <Facepile
        personas={personas}
        maxDisplayablePersonas={5}
        overflowButtonProps={{}}
        overflowButtonType={OverflowButtonType.descriptive}
      />,
    );
    const overflowButton = getAllByRole('button')[1];
    const personasDisplayed = getAllByRole('listitem');

    expect(overflowButton.className).toContain('ms-Facepile-descriptiveOverflowButton');
    expect(personasDisplayed).toHaveLength(5);
  });

  it('renders descriptive overflow button with comma-delimited persona names as title value by default', () => {
    const personas: IFacepilePersona[] = facepilePersonas.concat(...facepilePersonas, ...facepilePersonas);
    const maxDisplayablePersonas: number = 5;

    const { getAllByRole } = render(
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

    const overflowButton = getAllByRole('button')[1];

    expect(overflowButton.getAttribute('title')).toEqual(overflowPersonasTitle);
  });

  it('renders a descriptive overflow button with a custom title', () => {
    const personas: IFacepilePersona[] = facepilePersonas.concat(...facepilePersonas, ...facepilePersonas);
    const title: string = 'custom title';
    const { getAllByRole } = render(
      <Facepile
        personas={personas}
        maxDisplayablePersonas={5}
        overflowButtonProps={{ title }}
        overflowButtonType={OverflowButtonType.descriptive}
      />,
    );
    const overflowButton = getAllByRole('button')[1];

    expect(overflowButton.getAttribute('title')).toEqual(title);
  });

  it('renders no more than maximum allowed personas', () => {
    const { getAllByRole } = render(
      <Facepile
        personas={facepilePersonas.concat(facepilePersonas, facepilePersonas, facepilePersonas)}
        maxDisplayablePersonas={2}
      />,
    );
    expect(getAllByRole('listitem')).toHaveLength(2);
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

    const { getAllByRole } = render(<Facepile personas={personas} />);

    const buttons = getAllByRole('button');

    expect(buttons).toHaveLength(1);
    userEvent.click(buttons[0]);
    expect(clicked).toEqual(1);
  });

  it('personas and buttons render default size if not specified', () => {
    const { getAllByRole } = render(
      <Facepile
        personas={facepilePersonas}
        addButtonProps={{}}
        showAddButton={true}
        overflowButtonProps={{}}
        overflowButtonType={OverflowButtonType.downArrow}
      />,
    );

    const [addButton, overflowButton] = getAllByRole('button');

    expect(addButton.querySelectorAll('.ms-Persona--size32')).toHaveLength(1);
    expect(overflowButton.querySelectorAll('.ms-Persona--size32')).toHaveLength(1);

    const faces = getAllByRole('listitem');

    expect(faces).toHaveLength(facepilePersonas.length);
    for (let i = 0; i < faces.length; ++i) {
      expect(faces[i].querySelector('.ms-Persona--size32')).toBeTruthy();
    }
  });

  it('personas and buttons render specified size', () => {
    // Test XXS size renders
    const { getAllByRole, rerender } = render(
      <Facepile personas={facepilePersonas} personaSize={PersonaSize.size24} />,
    );
    expect(getAllByRole('listitem')).toHaveLength(facepilePersonas.length);
    getAllByRole('listitem').forEach(node => {
      expect(node.querySelectorAll('.ms-Persona--size24')).toHaveLength(1);
    });
    // Test small size renders
    rerender(<Facepile personas={facepilePersonas} personaSize={PersonaSize.size40} />);
    expect(getAllByRole('listitem')).toHaveLength(facepilePersonas.length);
    getAllByRole('listitem').forEach(node => {
      expect(node.querySelectorAll('.ms-Persona--size40')).toHaveLength(1);
    });
  });

  it('renders Persona control if exactly one persona is sent in props', () => {
    const { getAllByRole } = render(<Facepile personas={facepilePersonas.slice(0, 1)} overflowPersonas={[]} />);

    expect(getAllByRole('listitem')).toHaveLength(1);
  });

  it('renders no Persona or PersonaCoin if 0 is passed in for maxDisplayablePersonas', () => {
    const { queryAllByRole } = render(<Facepile personas={facepilePersonas} maxDisplayablePersonas={0} />);

    expect(queryAllByRole('listitem')).toHaveLength(0);
  });
});
