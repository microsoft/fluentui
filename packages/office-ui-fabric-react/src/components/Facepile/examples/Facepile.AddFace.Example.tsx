import * as React from 'react';
import { Facepile, IFacepileProps, OverflowButtonType } from 'office-ui-fabric-react/lib/Facepile';
import { facepilePersonas } from '@uifabric/example-data';

export const FacepileAddFaceExample: React.FunctionComponent = () => {
  const [numberOfFaces, setNumberOfFaces] = React.useState(0);
  const facepileProps: IFacepileProps = {
    personas: facepilePersonas.slice(0, numberOfFaces),
    maxDisplayablePersonas: 5,
    overflowButtonProps: {
      ariaLabel: 'More users',
      onClick: (ev: React.MouseEvent<HTMLButtonElement>) => alert('overflow icon clicked'),
    },
    overflowButtonType: OverflowButtonType.descriptive,
    showAddButton: true,
    addButtonProps: {
      ariaLabel: 'Add a new person',
      onClick: (ev: React.MouseEvent<HTMLButtonElement>) => setNumberOfFaces(numberOfFaces + 1),
    },
    ariaDescription: 'To move through the items use left and right arrow keys.',
  };

  return <Facepile {...facepileProps} />;
};
