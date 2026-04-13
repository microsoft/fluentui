import * as React from 'react';
import { Button, Caption1, Card, CardHeader, Text } from '@fluentui/react-components';
import { CAPThemeExamples } from './CAPStorybookUtil';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';

export const CAPCardStory = () => {
  return (
    <CAPThemeExamples
      examples={[
        {
          title: 'Default',
          render() {
            return (
              <Card>
                <CardHeader
                  header={
                    <Text as="h5" weight="semibold" style={{ margin: 0 }}>
                      App Name
                    </Text>
                  }
                  description={<Caption1>Developer</Caption1>}
                  action={
                    <Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />
                  }
                />
                <p>
                  Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee
                  sugar plum.
                </p>
              </Card>
            );
          },
        },
      ]}
    />
  );
};
