import * as React from 'react';
import { DefaultButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { IPersonaProps, Persona } from 'office-ui-fabric-react/lib/Persona';
import { IBasePickerSuggestionsProps, NormalPeoplePicker } from 'office-ui-fabric-react/lib/Pickers';
import { people } from '@uifabric/example-data';

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts',
};

const checkboxStyles = {
  root: {
    marginTop: 10,
  },
};

const defaultButtonStyles: Partial<IButtonStyles> = { root: { height: 'auto' } };

export const PeoplePickerControlledExample: React.FunctionComponent = () => {
  const [currentSelectedItems, setCurrentSelectedItems] = React.useState<IPersonaProps[]>([]);
  const [delayResults, setDelayResults] = React.useState(false);
  const [isPickerDisabled, setIsPickerDisabled] = React.useState(false);
  const [peopleList] = React.useState<IPersonaProps[]>(people);

  const picker = React.useRef(null);

  const onFilterChanged = (
    filterText: string,
    currentPersonas: IPersonaProps[],
    limitResults?: number,
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = filterPersonasByText(filterText);

      filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.slice(0, limitResults) : filteredPersonas;
      return filterPromise(filteredPersonas);
    } else {
      return [];
    }
  };

  const filterPersonasByText = (filterText: string): IPersonaProps[] => {
    return peopleList.filter(item => doesTextStartWith(item.text as string, filterText));
  };

  const filterPromise = (personasToReturn: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (delayResults) {
      return convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  };

  const onItemsChange = (items: any[]): void => {
    setCurrentSelectedItems(items);
  };

  const controlledItems = [];
  for (let i = 0; i < 5; i++) {
    const item = peopleList[i];
    if (currentSelectedItems!.indexOf(item) === -1) {
      controlledItems.push(peopleList[i]);
    }
  }

  const onDisabledButtonClick = (): void => {
    setIsPickerDisabled(!isPickerDisabled);
  };

  const onToggleDelayResultsChange = (): void => {
    setDelayResults(!delayResults);
  };

  return (
    <div>
      <div>
        <NormalPeoplePicker
          onResolveSuggestions={onFilterChanged}
          getTextFromItem={getTextFromItem}
          pickerSuggestionsProps={suggestionProps}
          className={'ms-PeoplePicker'}
          key={'controlled'}
          selectedItems={currentSelectedItems}
          onChange={onItemsChange}
          inputProps={{
            onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
            onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          }}
          componentRef={picker}
          resolveDelay={300}
          disabled={isPickerDisabled}
        />
        <label> Click to Add a person </label>
        {controlledItems.map((item, index) => (
          <div key={index}>
            <DefaultButton
              styles={defaultButtonStyles}
              // tslint:disable-next-line:jsx-no-lambda
              onClick={() => setCurrentSelectedItems(currentSelectedItems.concat([item]))}
            >
              <Persona {...item} />
            </DefaultButton>
          </div>
        ))}
      </div>
      <Checkbox
        label="Disable People Picker"
        checked={isPickerDisabled}
        onChange={onDisabledButtonClick}
        styles={checkboxStyles}
      />
      <Checkbox
        label="Delay Suggestion Results"
        defaultChecked={delayResults}
        onChange={onToggleDelayResultsChange}
        styles={checkboxStyles}
      />
    </div>
  );
};

function doesTextStartWith(text: string, filterText: string): boolean {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

function removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
  return personas.filter(persona => !listContainsPersona(persona, possibleDupes));
}

function listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }
  return personas.filter(item => item.text === persona.text).length > 0;
}

function convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
  return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
}

function getTextFromItem(persona: IPersonaProps): string {
  return persona.text as string;
}
