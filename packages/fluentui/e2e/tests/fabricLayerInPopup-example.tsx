import { Button, Popup, Flex, Ref } from '@fluentui/react-northstar';
import { ContextualMenu } from '@fluentui/react';
import * as React from 'react';

const selectors = {
  buttonInPopup: 'button-in-popup',
  menuTrigger: 'menu-trigger',
  popupTrigger: 'popup-trigger',
};

const FabricLayerInPopupExample = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const buttonRef = React.useRef(null);

  return (
    <>
      <Popup
        content={
          <Flex vAlign="center" column>
            <Ref innerRef={buttonRef}>
              <Button
                content="Open Fabric Menu"
                id={selectors.menuTrigger}
                onClick={() => {
                  setMenuOpen(state => !state);
                }}
              />
            </Ref>
            <Button id={selectors.buttonInPopup} content="A button" />
            <ContextualMenu
              items={[
                {
                  key: 'item-1',
                  text: 'item-1',
                  onClick: () => console.log('Item 1: click'),
                },
                {
                  key: 'item-2',
                  text: 'item-2',
                  onClick: () => console.log('Item 2: click'),
                },
              ]}
              hidden={!menuOpen}
              onDismiss={() => {
                setMenuOpen(false);
                console.log('Menu: dismiss');
              }}
              target={buttonRef}
            />
          </Flex>
        }
        onOpenChange={(e, data) => setPopupOpen(data.open)}
        open={popupOpen}
        position="below"
        trigger={<Button content="Open N* Popup" id={selectors.popupTrigger} />}
      />
      <div id="outside" style={{ border: '1px solid green', position: 'fixed', top: 5, right: 5 }}>
        An element outside
      </div>
    </>
  );
};

export default FabricLayerInPopupExample;
