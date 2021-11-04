import * as React from 'react';
import { Body, Caption } from '@fluentui/react-text';
import { Button } from '@fluentui/react-button';
import { MoreHorizontal16Regular } from '@fluentui/react-icons';
import { makeStyles } from '@fluentui/react-make-styles';
import { Card, CardHeader, CardPreview } from '../index';

import powerpointLogo from '../../assets/powerpoint_logo.svg';
import salesTemplate from '../../assets/sales_template.png';

const useStyles = makeStyles({
  actionCard: {
    minWidth: '368px',
  },
  gridViewCard: {
    minWidth: '254px',
    maxWidth: '368px',
  },
  gray: {
    color: 'gray',
  },
  logo: {
    background: 'white',
    padding: '6px',
    width: '20px',
    height: '20px',

    '> img': {
      width: '100%',
      height: '100%',
    },
  },
});

export const GridCard = () => {
  const styles = useStyles();

  return (
    <Card className={styles.gridViewCard}>
      <CardPreview>
        <img src={salesTemplate} alt="Preview of a sales slide deck" />
      </CardPreview>
      <CardHeader
        image={<img src={powerpointLogo} alt="Microsoft PowerPoint logo" />}
        header={
          <Body>
            <b>Sales Analysis</b>
          </Body>
        }
        description={<Caption className={styles.gray}>Elvia replied to a comment</Caption>}
        action={<Button appearance="transparent" icon={<MoreHorizontal16Regular />} />}
      />
    </Card>
  );
};
