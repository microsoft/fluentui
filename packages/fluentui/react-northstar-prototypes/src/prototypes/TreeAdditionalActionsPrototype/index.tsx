import * as React from 'react';
import { Provider, Segment, Header } from '@fluentui/react-northstar';
import TreeActionsUsingPopup from './components/TreeActionsUsingPopup';
import TreeActionsModifyAriaDisabled from './components/TreeActionsModifyAriaDisable';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';
import { themeOverrides } from './styles';

const TreeAdditionalActionsPrototype = () => {
  return (
    <Provider theme={themeOverrides}>
      <Segment>
        <Header content="Tree item navigation prototypes" />
        <p>
          You can navigate from three item to MuteAll button by pressing RightArrow button and back pressing LeftArrow
        </p>
        <PrototypeSection>
          <ComponentPrototype
            title="Tree item navigation - using popup"
            description="Pressing the right arrow creates a popup in the place of the MuteAll button, which is temporarily hidden after the action. This popup button is the same as the old one, but it lies outside of the tree and is focusable."
          >
            <TreeActionsUsingPopup />
          </ComponentPrototype>
        </PrototypeSection>

        <PrototypeSection>
          <ComponentPrototype
            title="Tree item navigation - modifying aria-hidden and data-is-focusable"
            description="Pressing the right arrow modifies attributes aria-hidden and data-is-focusable of the MuteAll button."
          >
            <TreeActionsModifyAriaDisabled />
          </ComponentPrototype>
        </PrototypeSection>
      </Segment>
    </Provider>
  );
};

export default TreeAdditionalActionsPrototype;
