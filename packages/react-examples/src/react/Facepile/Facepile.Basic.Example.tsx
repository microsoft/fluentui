import * as React from 'react';
import { Checkbox, ICheckboxStyles } from '@fluentui/react/lib/Checkbox';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Facepile, IFacepilePersona } from '@fluentui/react/lib/Facepile';
import { PersonaSize, PersonaPresence } from '@fluentui/react/lib/Persona';
import { Slider } from '@fluentui/react/lib/Slider';
import { facepilePersonas } from '@fluentui/example-data';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { useBoolean } from '@fluentui/react-hooks';

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

const getPersonaPresence = (personaName: string): PersonaPresence => {
  const presences = [
    PersonaPresence.away,
    PersonaPresence.busy,
    PersonaPresence.online,
    PersonaPresence.offline,
    PersonaPresence.offline,
  ];
  return presences[personaName.charCodeAt(1) % 5];
};

export const FacepileBasicExample: React.FunctionComponent = () => {
  const [imagesFadeIn, { toggle: toggleImagesFadeIn }] = useBoolean(true);
  const [numberOfFaces, setNumberOfFaces] = React.useState(3);
  const [personaSize, setPersonaSize] = React.useState(PersonaSize.size32);

  const personas = React.useMemo(() => facepilePersonas.slice(0, numberOfFaces), [numberOfFaces]);
  const overflowPersonas = React.useMemo(() => facepilePersonas.slice(numberOfFaces), [numberOfFaces]);

  const getPersonaProps = React.useCallback(
    (persona: IFacepilePersona) => ({
      imageShouldFadeIn: imagesFadeIn,
      presence: getPersonaPresence(persona.personaName!),
    }),
    [imagesFadeIn],
  );

  const onChangePersonaSize = (event: React.FormEvent<HTMLDivElement>, value: IDropdownOption): void => {
    setPersonaSize(value.key as PersonaSize);
  };

  const onChangePersonaNumber = (value: number): void => {
    setNumberOfFaces(value);
  };

  return (
    <div className={styles.container}>
      <Facepile
        personaSize={personaSize}
        personas={personas}
        overflowPersonas={overflowPersonas}
        getPersonaProps={getPersonaProps}
        ariaDescription="To move through the items use left and right arrow keys."
        ariaLabel="Example list of Facepile personas"
      />
      <div className={styles.control}>
        <Slider
          label="Number of Personas:"
          className={styles.slider}
          min={1}
          max={5}
          step={1}
          showValue
          value={numberOfFaces}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={onChangePersonaNumber}
        />
        <Dropdown
          label="Persona Size:"
          selectedKey={personaSize}
          className={styles.dropdown}
          options={dropdownOptions}
          // eslint-disable-next-line react/jsx-no-bind
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
