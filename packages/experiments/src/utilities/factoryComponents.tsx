import * as React from 'react';
import { Icon as FabricIcon, IIconProps, IPersonaPresenceProps } from 'office-ui-fabric-react';
import { PersonaPresence as FabricPersonaPresence } from 'office-ui-fabric-react/lib/PersonaPresence';

import { createFactory, IFactoryComponent } from '../Foundation';
import { Text as FabricText, ITextProps } from '../Text';

// TODO: All contents of this file should be moved to each respective component after Slots utilities are promoted.
// TODO: This typing is not allowing components to use them in JSX (see PersonaCoin.view.tsx)

// Generally to avoid a bunch of "if slot prop exists" checks in parent components, components should
// make sure they have content to render based on their props. For example here, if Icon has no iconName,
// it has no rendered content and returns null. This prevents Button.view from having to check to
// see if it's icon Slot is defined.
// TODO: This check for content to render should be moved into Icon.
export const Icon: IFactoryComponent<IIconProps> = props => (props.iconName ? <FabricIcon {...props} /> : null);
Icon.create = createFactory(Icon, { defaultProp: 'iconName' });

export const PersonaPresence: IFactoryComponent<IPersonaPresenceProps> = props => <FabricPersonaPresence {...props} />;
PersonaPresence.create = createFactory(PersonaPresence, { defaultProp: 'presence' });

export const Text: IFactoryComponent<ITextProps> = props => <FabricText {...props} />;
Text.create = createFactory(Text);
