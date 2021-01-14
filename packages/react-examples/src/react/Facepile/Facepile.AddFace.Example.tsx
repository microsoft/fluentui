import * as React from 'react';
import { Facepile, OverflowButtonType } from '@fluentui/react/lib/Facepile';
import { facepilePersonas } from '@fluentui/example-data';
import { Announced } from '@fluentui/react';

const overflowButtonProps = {
  ariaLabel: 'More users',
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => alert('overflow icon clicked'),
};

export const FacepileAddFaceExample: React.FunctionComponent = () => {
  const [numberOfFaces, setNumberOfFaces] = React.useState(0);
  const [addFaceAnnounced, setAddFaceAnnounced] = React.useState<JSX.Element | undefined>();

  const personas = React.useMemo(() => facepilePersonas.slice(0, numberOfFaces), [numberOfFaces]);

  const addButtonProps = React.useMemo(
    () => ({
      ariaLabel: 'Add a new person to the Facepile',
      onClick: (ev: React.MouseEvent<HTMLButtonElement>) => {
        const currentFaces = numberOfFaces + 1;
        setNumberOfFaces(currentFaces);
        setAddFaceAnnounced(
          <Announced message={`New person added, currently ${currentFaces} in the Facepile.`} aria-live="assertive" />,
        );
      },
    }),
    [numberOfFaces],
  );

  return (
    <>
      {addFaceAnnounced}
      <Facepile
        personas={personas}
        maxDisplayablePersonas={5}
        overflowButtonProps={overflowButtonProps}
        overflowButtonType={OverflowButtonType.descriptive}
        showAddButton
        addButtonProps={addButtonProps}
        ariaDescription="To move through the items use left and right arrow keys."
      />
    </>
  );
};
