import * as React from 'react';
import { FontIcon as FabricFontIcon, Icon as FabricIcon, Label as FabricLabel } from '@fluentui/react';
// PersonaPresence is not exported by OUFR, so we have to import it directly.
import { PersonaPresence as FabricPersonaPresence } from '@fluentui/react/lib/PersonaPresence';
import { createFactory } from '@fluentui/foundation-legacy';
import type { IFontIconProps, IIconProps, ILabelProps, IPersonaPresenceProps } from '@fluentui/react';
import type { ISlottableComponentType, ISlotFactory } from '@fluentui/foundation-legacy';

// TODO: All contents of this file should be moved to each respective component as they are converted to use slots.
// TODO: createFactory should no longer have to be explicitly called with component options containing defaultProp.
//       (Consider adding a defaultProp option to styled so that createFactory can be internalized similar
//       to createComponent)
// TODO: displayName will also be covered by createComponent argument.
// TODO: These components will also have to be modified not to generate rendered output if their props don't call for it
//       to eliminate the wrapper functions below.

// Generally to avoid a bunch of "if slot prop exists" checks in parent components, components should
// make sure they have content to render based on their props. For example here, if Icon has no iconName,
// it has no rendered content and returns null. This prevents Button.view from having to check to
// see if its icon Slot is defined.

// These wrappers will temporarily add a layer to the hierarchy (identified with displayName) until their functionality
// can be absorbed into their respective OUFR components.
export const FontIcon: ISlottableComponentType<IFontIconProps, string> = props =>
  props.iconName ? <FabricFontIcon {...props} /> : null;
FontIcon.displayName = 'FontIcon';
const fontIconFactory: ISlotFactory<IFontIconProps, string> = createFactory(FontIcon, { defaultProp: 'iconName' });
FontIcon.create = fontIconFactory;

export const Icon: ISlottableComponentType<IIconProps, string> = props =>
  props.iconName ? <FabricIcon {...props} /> : null;
Icon.displayName = 'Icon';
const iconFactory: ISlotFactory<IIconProps, string> = createFactory(Icon, { defaultProp: 'iconName' });
Icon.create = iconFactory;

export const Label: ISlottableComponentType<ILabelProps, string> = props =>
  React.Children.count(props.children) > 0 ? <FabricLabel {...props} /> : null;
Label.displayName = 'Label';
const labelFactory = createFactory(Label) as ISlotFactory<ILabelProps, string>;
Label.create = labelFactory;

export const PersonaPresence: ISlottableComponentType<IPersonaPresenceProps, number> =
  // TODO: This is a bug in PersonaPresence that needs to be fixed. 'presence' prop comment mentions that it
  // won't render if presence is undefined, but it does render. Check for undefined here for now.
  props => (props.presence !== undefined ? <FabricPersonaPresence {...props} /> : null);
PersonaPresence.displayName = 'PersonaPresence';
const personaPresenceFactory: ISlotFactory<IPersonaPresenceProps, number> = createFactory(PersonaPresence, {
  defaultProp: 'presence',
});
PersonaPresence.create = personaPresenceFactory;
