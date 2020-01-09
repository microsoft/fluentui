import * as React from 'react';
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IDragOptions,
  DefaultButton,
  Checkbox,
  ContextualMenu,
  IconButton
} from 'office-ui-fabric-react';
import { FontSizes } from '@uifabric/styling';
import { getId } from 'office-ui-fabric-react/lib/Utilities';

export interface IModalModelessExampleState {
  showModal: boolean;
  isDraggable: boolean;
}

// Themed styles for the example.
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch'
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      fontSize: FontSizes.xLarge,
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px'
    }
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: {
        margin: '14px 0'
      },
      'p:first-child': {
        marginTop: 0
      },
      'p:last-child': {
        marginBottom: 0
      }
    }
  }
});

const iconButtonStyles = mergeStyleSets({
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px'
  },
  rootHovered: {
    color: theme.palette.neutralDark
  }
});

export class ModalModelessExample extends React.Component<{}, IModalModelessExampleState> {
  public state: IModalModelessExampleState = {
    showModal: false,
    isDraggable: false
  };
  // Use getId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings without getId() and manually ensure uniqueness.)
  private _titleId: string = getId('title');
  private _subtitleId: string = getId('subText');
  private _dragOptions: IDragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu
  };

  public render(): JSX.Element {
    const { showModal, isDraggable } = this.state;
    return (
      <div>
        <Checkbox
          styles={{ root: { marginBottom: '20px' } }}
          label="Is draggable"
          onChange={this._toggleDraggable}
          checked={isDraggable}
          disabled={showModal}
        />
        <DefaultButton secondaryText="Opens the Sample Modal" onClick={this._showModal} text="Open Modal" />
        <Modal
          titleAriaId={this._titleId}
          subtitleAriaId={this._subtitleId}
          isOpen={showModal}
          onDismiss={this._closeModal}
          isModeless={true}
          containerClassName={contentStyles.container}
          dragOptions={isDraggable ? this._dragOptions : undefined}
        >
          <div className={contentStyles.header}>
            <span id={this._titleId}>Lorem Ipsum</span>
            <IconButton
              styles={iconButtonStyles}
              iconProps={{ iconName: 'Cancel' }}
              ariaLabel="Close popup modal"
              onClick={this._closeModal as any}
            />
          </div>
          <div id={this._subtitleId} className={contentStyles.body}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lorem nulla, malesuada ut sagittis sit amet, vulputate in
              leo. Maecenas vulputate congue sapien eu tincidunt. Etiam eu sem turpis. Fusce tempor sagittis nunc, ut interdum ipsum
              vestibulum non. Proin dolor elit, aliquam eget tincidunt non, vestibulum ut turpis. In hac habitasse platea dictumst. In a
              odio eget enim porttitor maximus. Aliquam nulla nibh, ullamcorper aliquam placerat eu, viverra et dui. Phasellus ex lectus,
              maximus in mollis ac, luctus vel eros. Vivamus ultrices, turpis sed malesuada gravida, eros ipsum venenatis elit, et volutpat
              eros dui et ante. Quisque ultricies mi nec leo ultricies mollis. Vivamus egestas volutpat lacinia. Quisque pharetra eleifend
              efficitur.{' '}
            </p>
          </div>
        </Modal>
      </div>
    );
  }

  private _showModal = (): void => {
    this.setState({ showModal: true });
  };

  private _closeModal = (): void => {
    this.setState({ showModal: false });
  };

  private _toggleDraggable = (): void => {
    this.setState({ isDraggable: !this.state.isDraggable });
  };
}
