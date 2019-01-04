import * as React from 'react';
import { Icon as FabricIcon, IIconProps, IPersonaPresenceProps } from 'office-ui-fabric-react';
import { PersonaPresence as FabricPersonaPresence } from 'office-ui-fabric-react/lib/PersonaPresence';

import { createFactory, IFactoryComponent } from '../Foundation';
import { Text as FabricText, ITextProps } from '../Text';

// TODO: All contents of this file should be moved to each respective component after Slots utilities are promoted.
// TODO: This typing is not allowing components to use them in JSX (see PersonaCoin.view.tsx)
export const Icon: IFactoryComponent<IIconProps> = props => <FabricIcon {...props} />;
Icon.create = createFactory(Icon, { defaultProp: 'iconName' });

export const PersonaPresence: IFactoryComponent<IPersonaPresenceProps> = props => <FabricPersonaPresence {...props} />;
PersonaPresence.create = createFactory(PersonaPresence, { defaultProp: 'presence' });

export const Text: IFactoryComponent<ITextProps> = props => <FabricText {...props} />;
Text.create = createFactory(Text);
