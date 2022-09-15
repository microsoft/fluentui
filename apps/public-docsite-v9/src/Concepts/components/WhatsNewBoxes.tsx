import * as React from 'react';
import { shorthands, makeStyles } from '@griffel/react';
import { Title3, Text, tokens } from '@fluentui/react-components';

type Box = {
  image: 'string';
  text: 'string';
};

interface IWhatsNewBoxProps {
  boxes: Box[];
}

const useStyles = makeStyles({
  title: {
    marginBottom: '32px',
    marginTop: '0',
    display: 'block',
  },
  wrapper: {
    display: 'flex',
    '@media (max-width: 460px)': {
      flexDirection: 'column',
    },
  },
  whatsNew: {
    marginRight: '40px',
    '@media (max-width: 900px)': {
      marginRight: '20px',
    },
    '@media (max-width: 460px)': {
      marginRight: 0,
      marginBottom: '40px',
    },
    flexBasis: '100%',
    ':last-child': {
      marginRight: 0,
      marginBottom: 0,
    },
  },
  box: {
    ...shorthands.borderRadius('16px'),
    marginBottom: '16px',
    backgroundColor: tokens.colorNeutralBackground3,
  },
  image: {
    width: '100%',
    height: 'auto',
  },
});

export const WhatsNewBoxes: React.FC<IWhatsNewBoxProps> = props => {
  const styles = useStyles();
  return (
    <div>
      <Title3 className={styles.title} as="h2">
        What's new
      </Title3>
      <div className={styles.wrapper}>
        {props.boxes.map((box, i) => (
          <WhatsNewBox key={i} {...box} />
        ))}
      </div>
    </div>
  );
};

const WhatsNewBox: React.FC<Box> = props => {
  const styles = useStyles();
  return (
    <div className={styles.whatsNew}>
      <div className={styles.box}>
        <img className={styles.image} role="presentation" src={props.image} />
      </div>
      <Text>{props.text}</Text>
    </div>
  );
};
