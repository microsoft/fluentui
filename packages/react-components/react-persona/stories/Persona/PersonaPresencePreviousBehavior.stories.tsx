import * as React from 'react';
import {
  makeStyles,
  Persona,
  presenceAvailableRegular,
  presenceOfflineRegular,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  statusAway: {
    color: tokens.colorPaletteMarigoldBackground3,
  },
  statusOffline: {
    color: tokens.colorNeutralForeground3,
  },

  root: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'repeat(2, max-content)',
    gridTemplateRows: 'repeat(3, auto)',
    columnGap: '20px',
    rowGap: '10px',
  },
});

export const PresencePreviousBehavior = () => {
  const styles = useStyles();
  const AwayFilledIcon = presenceAvailableRegular.small;
  const OfflineRegularIcon = presenceOfflineRegular.small;

  return (
    <div className={styles.root}>
      <span>Current Behavior</span>
      <Persona presence={{ status: 'away', outOfOffice: true }} name="Kevin Sturgis" secondaryText="Away - OOF" />
      <Persona presence={{ status: 'offline', outOfOffice: true }} name="Kevin Sturgis" secondaryText="Offline - OOF" />

      <span>Previous Behavior</span>
      <Persona
        presence={{
          status: 'away',
          outOfOffice: true,
          icon: <AwayFilledIcon />,
          className: styles.statusAway,
        }}
        name="Kevin Sturgis"
        secondaryText="Away - OOF"
      />
      <Persona
        presence={{
          status: 'offline',
          outOfOffice: true,
          icon: <OfflineRegularIcon />,
          className: styles.statusOffline,
        }}
        name="Kevin Sturgis"
        secondaryText="Offline - OOF"
      />
    </div>
  );
};

PresencePreviousBehavior.parameters = {
  docs: {
    description: {
      story: `PresenceBadge maps its presence to the behavior in v8. If the previous behavior is desired, it is
       possible to override the icon and className to match it. Note that Persona maps to one size
        smaller, such as \`huge\` to \`large\` and \`medium\` to \`small\`. As the size prop shows, Persona does not
        support tiny.`,
    },
  },
};
