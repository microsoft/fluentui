import * as React from 'react';
import { Icon as FabricIcon, Label as FabricLabel, IIconProps, ILabelProps, IPersonaPresenceProps } from 'office-ui-fabric-react';

// PersonaPresence is not exported by OUFR, so we have to import it directly.
import { PersonaPresence as FabricPersonaPresence } from 'office-ui-fabric-react/lib/PersonaPresence';

import { createFactory, IFactoryComponent } from '../Foundation';
import { Text as FabricText, ITextProps } from '../Text';

// TODO: All contents of this file should be moved to each respective component after Slots utilities are promoted.
// TODO: This means that components would also have to be modified not to generate rendered output if their props don't call for it.
// TODO: This typing is not allowing components to use them in JSX (see PersonaCoin.view.tsx)

// Generally to avoid a bunch of "if slot prop exists" checks in parent components, components should
// make sure they have content to render based on their props. For example here, if Icon has no iconName,
// it has no rendered content and returns null. This prevents Button.view from having to check to
// see if its icon Slot is defined.
// TODO: This check for content to render should be moved into Icon.
export const Icon: IFactoryComponent<IIconProps> = props => (props.iconName ? <FabricIcon {...props} /> : null);
Icon.create = createFactory(Icon, { defaultProp: 'iconName' });

export const Label: IFactoryComponent<ILabelProps> = props =>
  React.Children.count(props.children) > 0 ? <FabricLabel {...props} /> : null;
Label.create = createFactory(Label);

export const PersonaPresence: IFactoryComponent<IPersonaPresenceProps> = props => <FabricPersonaPresence {...props} />;
PersonaPresence.create = createFactory(PersonaPresence, { defaultProp: 'presence' });

// TODO: move this to Text component
// TODO: do all Foundation components need factories? if not, why? this should be clearly known and documented.
export const Text: IFactoryComponent<ITextProps> = props => <FabricText {...props} />;
Text.create = createFactory(Text);
