import * as React from 'react';
import { Facepile, IFacepileProps, OverflowButtonType } from 'office-ui-fabric-react/lib/Facepile';
import { facepilePersonas } from './FacepileExampleData';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export interface IFacepileAddFaceExampleState {
  numberOfFaces: number;
}

export class FacepileButtonStylesExample extends React.Component<{}, IFacepileAddFaceExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      numberOfFaces: 0
    };
  }

  public render(): JSX.Element {
    const { numberOfFaces } = this.state;
    const facepileProps: IFacepileProps = {
      personas: facepilePersonas.slice(0, numberOfFaces),
      maxDisplayablePersonas: 5,
      overflowButtonProps: {
        ariaLabel: 'More users',
        onClick: (ev: React.MouseEvent<HTMLButtonElement>) => alert('overflow icon clicked'),
        styles: {
          root: {
            background: DefaultPalette.purpleLight
          },
          rootHovered: {
            backgroundColor: DefaultPalette.tealLight,
            boxShadow: `0px 0px 5px 5px ${DefaultPalette.tealDark}`
          }
        }
      },
      overflowButtonType: OverflowButtonType.descriptive,
      showAddButton: true,
      addButtonProps: {
        ariaLabel: 'Add a new person',
        onClick: (ev: React.MouseEvent<HTMLButtonElement>) =>
          this.setState({
            numberOfFaces: this.state.numberOfFaces + 1
          }),
        styles: {
          root: {
            selectors: {
              '.ms-Persona-initials': {
                background: DefaultPalette.orange
              }
            }
          },
          rootHovered: {
            selectors: {
              '.ms-Persona-initials': {
                background: DefaultPalette.orangeLighter,
                color: DefaultPalette.black
              }
            }
          }
        }
      },
      styles: {
        descriptiveOverflowButton: {
          // not overridden since overflowButtonProps.styles contains no marginLeft property
          marginLeft: 8,

          // overridden by overflowButtonProps.styles.root.background
          background: DefaultPalette.red,

          // overridden on hover by overflowButtonProps.styles.rootHovered.boxShadow
          boxShadow: `0px 0px 5px 5px ${DefaultPalette.purpleDark}`
        },
        itemButton: {
          selectors: {
            '.ms-Persona-initials': {
              background: DefaultPalette.magenta
            }
          }
        }
      },
      ariaDescription: 'To move through the items use left and right arrow keys.'
    };

    return <Facepile {...facepileProps} />;
  }
}
