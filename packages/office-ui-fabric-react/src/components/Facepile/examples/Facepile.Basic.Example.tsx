import * as React from 'react';
import { Checkbox, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Facepile, IFacepilePersona, IFacepileProps } from 'office-ui-fabric-react/lib/Facepile';
import { PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { facepilePersonas } from '@uifabric/example-data';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean } from '@uifabric/react-hooks';

const styles = mergeStyleSets({
  container: {
    maxWidth: 300,
  },
  control: {
    paddingTop: 20,
  },
  slider: {
    margin: '10px 0',
  },
  checkbox: {
    paddingTop: 15,
  },
  dropdown: {
    paddingTop: 0,
    margin: '10px 0',
  },
});
const dropdownOptions = [
  { key: PersonaSize.size8, text: PersonaSize[PersonaSize.size8] },
  { key: PersonaSize.size24, text: PersonaSize[PersonaSize.size24] },
  { key: PersonaSize.size32, text: PersonaSize[PersonaSize.size32] },
  { key: PersonaSize.size40, text: PersonaSize[PersonaSize.size40] },
  { key: PersonaSize.size48, text: PersonaSize[PersonaSize.size48] },
];
const checkboxStyles: Partial<ICheckboxStyles> = { root: { margin: '10px 0' } };

export const FacepileBasicExample: React.FunctionComponent = () => {
  const [imagesFadeIn, { toggle: toggleImagesFadeIn }] = useBoolean(true);
  const [numberOfFaces, setNumberOfFaces] = React.useState(3);
  const [personaSize, setPersonaSize] = React.useState(PersonaSize.size32);
  const facepileProps: IFacepileProps = {
    personaSize: personaSize,
    personas: facepilePersonas.slice(0, numberOfFaces),
    overflowPersonas: facepilePersonas.slice(numberOfFaces),
    getPersonaProps: (persona: IFacepilePersona) => {
      return {
        imageShouldFadeIn: imagesFadeIn,
        presence: personaPresence(persona.personaName!),
      };
    },
    ariaDescription: 'To move through the items use left and right arrow keys.',
    ariaLabel: 'Example list of Facepile personas',
  };
  const onChangePersonaSize = (event: React.FormEvent<HTMLDivElement>, value: IDropdownOption): void => {
    setPersonaSize(value.key as PersonaSize);
  };
  const onChangePersonaNumber = (value: number): void => {
    setNumberOfFaces(value);
  };
  const personaPresence = (personaName: string): PersonaPresence => {
    const presences: any = [
      PersonaPresence.away,
      PersonaPresence.busy,
      PersonaPresence.online,
      PersonaPresence.offline,
      PersonaPresence.offline,
    ];
    return presences[personaName.charCodeAt(1) % 5];
  };
  return (
    <div className={styles.container}>
      <Facepile {...facepileProps} />
      <div className={styles.control}>
        <Slider
          label="Number of Personas:"
          className={styles.slider}
          min={1}
          max={5}
          step={1}
          showValue
          value={numberOfFaces}
          onChange={onChangePersonaNumber}
        />
        <Dropdown
          label="Persona Size:"
          selectedKey={personaSize}
          className={styles.dropdown}
          options={dropdownOptions}
          onChange={onChangePersonaSize}
        />
        <Checkbox
          className={styles.checkbox}
          styles={checkboxStyles}
          label="Fade In"
          checked={imagesFadeIn}
          onChange={toggleImagesFadeIn}
        />
      </div>
    </div>
  );
};
