import * as React from 'react';
import { Icon, Stack, TooltipHost } from '@fluentui/react';
import {
  CollapsibleSection,
  CollapsibleSectionTitle,
  ICollapsibleSectionTitleProps,
} from '@fluentui/react-experiments/lib/CollapsibleSection';

// TODO: convert this example to use extendComponent

// This is our customized component making use of default CollapsibleSectionTitle while using slots
// to add the tooltip and icon. This would also have to be modified to add a prop for tooltip content (not done here)
const CustomizedCollapsibleSectionTitle: React.FunctionComponent<ICollapsibleSectionTitleProps> = props => {
  const titleText: ICollapsibleSectionTitleProps['slots'] = {
    text: {
      render: (renderProps, DefaultComponent) => (
        // Supplement the default title text with an icon. Wrap in a Stack for proper placement.
        <Stack grow horizontal horizontalAlign="space-between">
          <DefaultComponent {...renderProps}>{props.text}</DefaultComponent>
          <Icon iconName="warning" styles={{ root: { color: 'red' } }} />
        </Stack>
      ),
    },
  };

  // Wrap the entire title in a Tooltip
  return (
    <TooltipHost content="This is the tooltip">
      <CollapsibleSectionTitle {...props} slots={titleText} />
    </TooltipHost>
  );
};

export class CollapsibleSectionSlotsExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <p>
          This CollapsibleSection has been customized with a TooltipHost around its entire title and an icon in its
          title.
        </p>
        <Stack maxWidth={200} styles={{ root: { border: '1px solid black' } }}>
          <CollapsibleSection
            key={1}
            defaultCollapsed={true}
            title="Shorthand Title Text"
            slots={{
              title: {
                component: CustomizedCollapsibleSectionTitle,
              },
            }}
          >
            Content 1
          </CollapsibleSection>
        </Stack>
      </div>
    );
  }
}
