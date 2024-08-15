import * as React from 'react';
import { Title3, Text } from '@fluentui/react-components';
import { useWhatsNewStyles } from './WhatsNewBoxes.styles';

type Box = {
  image: 'string';
  text: 'string';
};

interface WhatsNewBoxProps {
  boxes: Box[];
}

export const WhatsNewBoxes: React.FC<WhatsNewBoxProps> = props => {
  const styles = useWhatsNewStyles();

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
  const styles = useWhatsNewStyles();

  return (
    <div className={styles.whatsNew}>
      <div className={styles.box}>
        <img className={styles.image} role="presentation" src={props.image} />
      </div>
      <Text>{props.text}</Text>
    </div>
  );
};
