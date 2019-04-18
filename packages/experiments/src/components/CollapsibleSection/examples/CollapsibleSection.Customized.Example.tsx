import * as React from 'react';
import { Icon, Stack, TooltipHost } from 'office-ui-fabric-react';
import { CollapsibleSection, CollapsibleSectionTitle, ICollapsibleSectionTitleProps } from '@uifabric/experiments/lib/CollapsibleSection';

// This is our customized component making use of default CollapsibleSectionTitle while using slots
// to add the tooltip and icon. This would also have to be modified to add a prop for tooltip content (not done here)
const CustomizedCollapsibleSectionTitle: React.SFC<ICollapsibleSectionTitleProps> = props => {
  const titleText: ICollapsibleSectionTitleProps['text'] = {
    render: (renderProps, DefaultComponent) => (
      // Supplement the default title content with an icon. Wrap in a Stack for proper placement.
      // TODO: make sure type errors occur for invalid props on DefaultComponent before merge
      <Stack grow horizontal horizontalAlign="space-between">
        <DefaultComponent {...renderProps}>{props.text}</DefaultComponent>
        <Icon iconName="warning" styles={{ root: { color: 'red' } }} />
      </Stack>
    )
  };

  // Wrap the entire title in a Tooltip
  return (
    <TooltipHost content="This is the tooltip">
      <CollapsibleSectionTitle {...props} text={titleText} />
    </TooltipHost>
  );
};

export class CollapsibleSectionCustomizedExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Stack maxWidth={200} styles={{ root: { border: '1px solid black' } }}>
          <CollapsibleSection
            key={1}
            defaultCollapsed={true}
            title={{ props: { text: 'Shorthand Title Text' }, component: CustomizedCollapsibleSectionTitle }}
          >
            Content 1
          </CollapsibleSection>
        </Stack>
      </div>
    );
  }
}
