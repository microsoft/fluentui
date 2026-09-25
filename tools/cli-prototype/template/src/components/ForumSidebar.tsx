import * as React from 'react';
import { Button, Card, Divider, InfoLabel, Link } from '@fluentui/react-components';
import { SettingsRegular } from '@fluentui/react-icons';

import { useAppStyles } from '../styles';

type ForumSidebarProps = {
  onOpenPreferences: () => void;
  onSimulateError: () => void;
};

export function ForumSidebar(props: ForumSidebarProps): React.ReactElement {
  const styles = useAppStyles();

  return (
    <aside className={styles.rightRail} aria-label="Forum information">
      <Card className={styles.sideCard}>
        <InfoLabel info="Fluent Forum uses fictional local data and never sends your posts to a server.">
          About this forum
        </InfoLabel>
        <p className={styles.subheading}>
          A welcoming place for people who care about interface craft, inclusive products, and maintainable systems.
        </p>
        <Link href="#guidelines">Read community guidelines</Link>
      </Card>

      <Card className={styles.sideCard} id="guidelines">
        <h2 className={styles.heading}>Community pulse</h2>
        <div>
          <strong>47</strong>
          <p className={styles.subheading}>thoughtful discussions this week</p>
        </div>
        <Divider />
        <Button icon={<SettingsRegular />} onClick={props.onOpenPreferences}>
          Preferences
        </Button>
        <Button appearance="subtle" data-testid="simulate-error" onClick={props.onSimulateError}>
          Simulate feed outage
        </Button>
      </Card>
    </aside>
  );
}
