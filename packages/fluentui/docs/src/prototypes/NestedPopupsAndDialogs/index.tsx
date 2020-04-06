import { Button, Dialog, Popup } from '@fluentui/react-northstar';
import * as React from 'react';

import { ComponentPrototype, PrototypeSection } from '../Prototypes';

const PopupAndDialog: React.FC = () => (
  <Popup
    content={
      <>
        <p>
          This <code>Popup</code> will be kept open after <code>Dialog</code> will be opened.
        </p>
        <Dialog cancelButton="Close" header="A dialog" trigger={<Button content="Open a dialog" />} />
      </>
    }
    trigger={<Button content="Open a popup" />}
  />
);

const ControlledPopupAndDialog: React.FC = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);

  return (
    <>
      <Popup
        content={
          <>
            <p>
              This <code>Popup</code> will be close after <code>Dialog</code> will be opened.
            </p>
            <Button
              content="Open a dialog & close popup"
              onClick={() => {
                setPopupOpen(false);
                setDialogOpen(true);
              }}
            />
          </>
        }
        onOpenChange={(e, data) => setPopupOpen(data.open)}
        open={popupOpen}
        trigger={<Button content="Open a popup" />}
      />
      <Dialog cancelButton="Close" header="A dialog" onCancel={() => setDialogOpen(false)} open={dialogOpen} />
    </>
  );
};

const NestedDialogs: React.FC = () => (
  <Dialog
    cancelButton="Close"
    header="An outer dialog"
    content={
      <>
        <p>
          This <code>Dialog</code> contains another <code>Dialog</code> inside.
        </p>
        <blockquote>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </blockquote>

        <Dialog
          cancelButton="Close"
          header="An inner dialog"
          content={
            <>
              <p>
                This <code>Dialog</code> is nested ヽ(^o^)ノ, if you will on an overlay only this <code>Dialog</code>{' '}
                will be closed.
              </p>

              <Popup content="You can have also Popups inside dialogs!" trigger={<Button content="Open a popup" />} />
            </>
          }
          trigger={<Button content="Open a dialog" />}
        />
      </>
    }
    trigger={<Button content="Open a dialog" />}
  />
);

const NestedPopupsAndDialogs: React.FC = () => {
  return (
    <PrototypeSection title="Nested Popups & Dialogs">
      <ComponentPrototype title="A popup with dialog" description="Popup will be kept open after Dialog">
        <PopupAndDialog />
      </ComponentPrototype>
      <ComponentPrototype
        title="A closable popup with dialog"
        description="Popup will be closed once Dialog will be opened"
      >
        <ControlledPopupAndDialog />
      </ComponentPrototype>
      <ComponentPrototype title="Nested dialogs" description="An example with nested dialogs">
        <NestedDialogs />
      </ComponentPrototype>
    </PrototypeSection>
  );
};

export default NestedPopupsAndDialogs;
