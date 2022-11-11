import * as React from 'react';
import { Persona, PersonaProps } from '@fluentui/react-persona';
import { makeStyles, Button } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    columnGap: '10px',
    rowGap: '10px',
  },
  b: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const PresenceSize = () => {
  const styles = useStyles();
  const [textAlignment, setTextAlignment] = React.useState<PersonaProps['textAlignment']>('start');
  const [textPosition, setTextPosition] = React.useState<PersonaProps['textPosition']>('after');

  return (
    <div className={styles.root}>
      <div className={styles.b}>
        <Button size="small" onClick={() => setTextPosition('before')}>
          before
        </Button>
        <Button size="small" onClick={() => setTextPosition('below')}>
          below
        </Button>
        <Button size="small" onClick={() => setTextPosition('after')}>
          after
        </Button>
      </div>
      <div className={styles.b}>
        <Button size="small" onClick={() => setTextAlignment('start')}>
          start
        </Button>
        <Button size="small" onClick={() => setTextAlignment('center')}>
          center
        </Button>
      </div>
      <Persona
        size="extra-small"
        presenceOnly
        textAlignment={textAlignment}
        textPosition={textPosition}
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
        tertiaryText="blah blah"
        quaternaryText="blah blah"
      />
      <Persona
        size="small"
        presenceOnly
        textAlignment={textAlignment}
        textPosition={textPosition}
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
        tertiaryText="blah blah"
        quaternaryText="blah blah"
      />
      <Persona
        size="medium"
        presenceOnly
        textAlignment={textAlignment}
        textPosition={textPosition}
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
        tertiaryText="blah blah"
        quaternaryText="blah blah"
      />
      <Persona
        size="large"
        presenceOnly
        textAlignment={textAlignment}
        textPosition={textPosition}
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
        tertiaryText="blah blah"
        quaternaryText="blah blah"
      />
      <Persona
        size="extra-large"
        presenceOnly
        textAlignment={textAlignment}
        textPosition={textPosition}
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
        tertiaryText="blah blah"
        quaternaryText="blah blah"
      />
      <Persona
        size="huge"
        presenceOnly
        textAlignment={textAlignment}
        textPosition={textPosition}
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
        tertiaryText="blah blah"
        quaternaryText="blah blah"
      />
    </div>
  );
};

PresenceSize.parameters = {
  docs: {
    description: {
      story:
        `A Persona supports size different sizes, medium being the default. When a size is specified for presence` +
        `, the size is respected.`,
    },
  },
};
