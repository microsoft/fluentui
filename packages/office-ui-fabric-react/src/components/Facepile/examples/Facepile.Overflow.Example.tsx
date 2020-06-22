import * as React from 'react';
import { Facepile, OverflowButtonType } from 'office-ui-fabric-react/lib/Facepile';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { facepilePersonas } from '@uifabric/example-data';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

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
  dropdown: {
    paddingTop: 0,
    margin: '10px 0',
  },
});
const dropdownOptions = [
  { key: OverflowButtonType.none, text: OverflowButtonType[OverflowButtonType.none] },
  { key: OverflowButtonType.descriptive, text: OverflowButtonType[OverflowButtonType.descriptive] },
  { key: OverflowButtonType.downArrow, text: OverflowButtonType[OverflowButtonType.downArrow] },
  { key: OverflowButtonType.more, text: OverflowButtonType[OverflowButtonType.more] },
];

export const FacepileOverflowExample: React.FunctionComponent = () => {
  const [displayedPersonas, setDisplayedPersonas] = React.useState(5);
  const [overflowButtonType, setOverflowButtonType] = React.useState(OverflowButtonType.none);

  const overflowButtonProps = {
    ariaLabel: 'More users',
    onClick: (ev: React.MouseEvent<HTMLButtonElement>) => alert('overflow icon clicked'),
  };

  const onChangeType = (event: React.FormEvent<HTMLDivElement>, value: IDropdownOption): void => {
    setOverflowButtonType(value.key as OverflowButtonType);
  };

  const onChangePersonaNumber = (value: number): void => {
    setDisplayedPersonas(value);
  };

  return (
    <div className={styles.container}>
      <Facepile
        personas={facepilePersonas}
        maxDisplayablePersonas={displayedPersonas}
        overflowButtonType={overflowButtonType}
        overflowButtonProps={overflowButtonProps}
        ariaDescription={'To move through the items use left and right arrow keys.'}
        ariaLabel={'Example list of Facepile personas'}
      />
      <div className={styles.control}>
        <Slider
          label="Number of Personas:"
          className={styles.slider}
          min={1}
          max={5}
          step={1}
          showValue
          value={displayedPersonas}
          onChange={onChangePersonaNumber}
        />
        <Dropdown
          label="Overflow Button Type:"
          className={styles.dropdown}
          selectedKey={overflowButtonType}
          options={dropdownOptions}
          onChange={onChangeType}
        />
      </div>
    </div>
  );
};
