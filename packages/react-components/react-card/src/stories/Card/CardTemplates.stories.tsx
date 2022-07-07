import * as React from 'react';
import { action } from '@storybook/addon-actions';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Text,
  Caption1,
  Badge,
  Radio,
  Body1,
  mergeClasses,
} from '@fluentui/react-components';
import {
  AlertUrgent16Filled,
  Attach16Regular,
  CalendarLtr16Regular,
  CheckmarkCircle16Regular,
  CircleHalfFill16Regular,
  Comment16Regular,
  MoreHorizontal16Filled,
} from '@fluentui/react-icons';
import { Card, CardHeader } from '@fluentui/react-card';
import AppLogo from '../../../assets/app_logo.svg';
import Logo1 from '../../../assets/logo.svg';
import Logo2 from '../../../assets/logo2.svg';

export const ASSET_URL =
  'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card';

const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...shorthands.gap('16px'),
  },
  fixedWidth: {
    height: 'fit-content',
    width: '280px',
  },
  caption: {
    color: tokens.colorNeutralForeground3,
  },
  headerImage: {
    maxWidth: '44px',
    maxHeight: '44px',
    ...shorthands.borderRadius('4px'),
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.gap('4px'),
  },
  appIcon: {
    height: '32px',
    ...shorthands.borderRadius('4px'),
  },
  spacedContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskHeader: {
    display: 'flex',
  },
});

export const Templates = () => {
  const styles = useStyles();

  return (
    <div className={styles.mainContainer}>
      <Card className={styles.fixedWidth}>
        <CardHeader
          image={{ as: 'img', src: powerpointLogoURL }}
          header={<Text weight="semibold">Team offsite 2020</Text>}
          description={<Caption1 className={styles.caption}>Onedrive &gt; Files</Caption1>}
          action={
            <Button
              appearance="transparent"
              icon={<MoreHorizontal16Filled />}
              onClick={action('Example 1 button pressed')}
            />
          }
        />
      </Card>
      <Card className={styles.fixedWidth}>
        <CardHeader
          image={{ as: 'img', className: styles.headerImage, src: AppLogo }}
          header={<Text weight="semibold">App Name</Text>}
          description={<Caption1 className={styles.caption}>Developer</Caption1>}
          action={
            <Button
              appearance="transparent"
              icon={<MoreHorizontal16Filled />}
              onClick={action('Example 1 button pressed')}
            />
          }
        />
        <span>
          Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar
          plum.
        </span>
      </Card>
      <Card className={styles.fixedWidth}>
        <div className={styles.flexContainer}>
          <img className={styles.appIcon} src={Logo1} />
          <img className={styles.appIcon} src={Logo2} />
        </div>
        <CardHeader
          header={<Text weight="semibold">Alert in Teams when a new document is uploaded in channel</Text>}
          description={<Caption1 className={styles.caption}>By Microsoft</Caption1>}
        />
        <div className={mergeClasses(styles.flexContainer, styles.spacedContainer)}>
          <span>Automated</span>
          <span>3290</span>
        </div>
      </Card>

      <Card className={styles.fixedWidth}>
        <div className={styles.flexContainer}>
          <Badge color="severe" shape="rounded" appearance="tint">
            Red
          </Badge>
          <Badge color="success" shape="rounded" appearance="tint">
            Green
          </Badge>
          <Badge color="brand" shape="rounded" appearance="tint">
            Blue
          </Badge>
        </div>
        <div className={styles.taskHeader}>
          <Radio />
          <div>
            <Text block weight="semibold">
              Task title
            </Text>
            <Caption1 block className={styles.caption}>
              Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar
              plum.
            </Caption1>
          </div>
        </div>
        <div className={mergeClasses(styles.flexContainer, styles.spacedContainer)}>
          <AlertUrgent16Filled primaryFill="#C4314B" />
          <CircleHalfFill16Regular primaryFill="#0078DB" />
          <div className={styles.flexContainer}>
            <CalendarLtr16Regular />
            <Body1>03/22/20</Body1>
          </div>
          <Comment16Regular />
          <div className={styles.flexContainer}>
            <Attach16Regular />
            <Body1>4</Body1>
          </div>
          <div className={styles.flexContainer}>
            <CheckmarkCircle16Regular />
            <Body1>2/12</Body1>
          </div>
        </div>
      </Card>
    </div>
  );
};
