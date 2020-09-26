import * as React from 'react';
import { Facepile, OverflowButtonType } from 'office-ui-fabric-react/lib/Facepile';
import { facepilePersonas } from '@uifabric/example-data';

const overflowButtonProps = {
  ariaLabel: 'More users',
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => alert('overflow icon clicked'),
};

export const FacepileAddFaceExample: React.FunctionComponent = () => {
  const [numberOfFaces, setNumberOfFaces] = React.useState(0);

  const personas = React.useMemo(() => facepilePersonas.slice(0, numberOfFaces), [numberOfFaces]);

  const addButtonProps = React.useMemo(
    () => ({
      ariaLabel: 'Add a new person',
      onClick: (ev: React.MouseEvent<HTMLButtonElement>) => setNumberOfFaces(numberOfFaces + 1),
    }),
    [numberOfFaces],
  );

  return (
    <Facepile
      personas={personas}
      maxDisplayablePersonas={5}
      overflowButtonProps={overflowButtonProps}
      overflowButtonType={OverflowButtonType.descriptive}
      showAddButton
      addButtonProps={addButtonProps}
      ariaDescription="To move through the items use left and right arrow keys."
    />
  );
};
