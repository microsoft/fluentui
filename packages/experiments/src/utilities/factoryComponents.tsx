import * as React from 'react';
import { Icon as FabricIcon, IIconProps } from 'office-ui-fabric-react';
import { createFactory, IFactoryComponent } from '../Foundation';
import { Text as FabricText, ITextProps } from '../Text';

// TODO: All contents of this file should be moved to each respective component after Slots utilities are promoted.

////////////////////////////////////////////////////////////////////////////////////////////////////
// Icon Definitions
////////////////////////////////////////////////////////////////////////////////////////////////////
export const Icon: IFactoryComponent<IIconProps> = props => <FabricIcon {...props} />;
Icon.create = createFactory(Icon, { defaultProp: 'iconName' });

////////////////////////////////////////////////////////////////////////////////////////////////////
// Text Definitions
////////////////////////////////////////////////////////////////////////////////////////////////////
export const Text: IFactoryComponent<ITextProps> = props => <FabricText {...props} />;
Text.create = createFactory(Text);
