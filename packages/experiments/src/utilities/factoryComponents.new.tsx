import * as React from 'react';
import { IFactoryComponent } from './slots';
import { createFactoryNew } from './slots.new';
import { Text as FabricText, ITextProps } from '../Text';
import { Icon as FabricIcon, IIconProps } from 'office-ui-fabric-react';

// TODO: All contents of this file should be moved to each respective component after Slots utilities are promoted.
// TODO: can these just be rewritten as render functions and then just use the CmoponentType passed in?

////////////////////////////////////////////////////////////////////////////////////////////////////
// Icon Definitions
////////////////////////////////////////////////////////////////////////////////////////////////////
export const Icon: IFactoryComponent<IIconProps> = props => <FabricIcon {...props} />;
Icon.create = createFactoryNew(Icon, { defaultProp: 'iconName' });

////////////////////////////////////////////////////////////////////////////////////////////////////
// Text Definitions
////////////////////////////////////////////////////////////////////////////////////////////////////
export const Text: IFactoryComponent<ITextProps> = props => <FabricText {...props} />;
// TODO: remove
Text.displayName = "Text";
Text.create = createFactoryNew(Text);
