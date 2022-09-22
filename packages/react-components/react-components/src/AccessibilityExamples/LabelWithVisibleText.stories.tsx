import * as React from 'react';

import { Text, Divider, Button, Avatar, makeStyles, Link } from '@fluentui/react-components';
import { Scenario } from './utils';
import { PersonDelete24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    marginTop: '10px',
    display: 'flex',
    width: '180px',
    justifyContent: 'space-between',
  },
});

export const LabelWithVisibleTextExample = () => {
  const styles = useStyles();
  return (
    <Scenario pageTitle="Label with visible text">
      <h1>Label component with visible text</h1>
      <h2>Bad example</h2>
      <>
        <h4>Members</h4>
        <div className={styles.container}>
          <Avatar />
          <span>Robert Tolbert</span>
          <Button icon={<PersonDelete24Regular />} aria-label="Remove Robert Tolbert" />
        </div>
        <div className={styles.container}>
          <Avatar />
          <span>Celeste Burton</span>
          <Button icon={<PersonDelete24Regular />} aria-label="Remove Celeste Burton" />
        </div>
      </>

      <h3>Screen reader narration</h3>
      <Text block>
        <Text weight="semibold">JAWS: </Text>
        Remove Robert Tolbert Button To activate press spacebar. <br />
        Remove Celeste Burton Button To activate press spacebar.
        <br />
      </Text>

      <h3>Implementation details</h3>
      <ul>
        <li> aria-label="Remove [user name]" was applied on each button</li>
      </ul>
      <Divider appearance="strong" />

      <h2>Good example</h2>
      <>
        <h4>Members</h4>
        <div className={styles.container}>
          <Avatar />
          <span id="user1">Robert Tolbert</span>
          <Button
            icon={<PersonDelete24Regular />}
            aria-label="Remove"
            id="remove-button"
            aria-labelledby="remove-button user1"
          />
        </div>
        <div className={styles.container}>
          <Avatar />
          <span id="user2">Celeste Burton</span>
          <Button
            icon={<PersonDelete24Regular />}
            aria-label="Remove"
            id="remove-button"
            aria-labelledby="remove-button user2"
          />
        </div>
      </>

      <h3>Screen reader narration</h3>
      <Text block>
        <Text weight="semibold">JAWS: </Text>
        Remove Robert Tolbert Button To activate press spacebar. <br />
        Remove Celeste Burton Button To activate press spacebar.
        <br />
      </Text>

      <h3>Implementation details</h3>
      <ul>
        <li> ID="user[number]" was applied on 'span' with user name </li>
        <li> ID="remove-button" was applied on remove button </li>
        <li> aria-labelledby="remove-button user[number]" was applied on each "remove" button </li>
      </ul>
      <Divider appearance="strong" />
      <h2>Problem explanation</h2>
      <ul>
        <li>Even though the screen reader narration is the same for both examples implementation is different.</li>
        <li>In generall we should reuse information visible/displayed in the UI.</li>
        <li>
          In this particular example aria-label was added to "remove" button and then we can refer to the "remove"
          button itself.
        </li>
        <li>
          Using aria-labelledby in many cases avoids translation the element accessibility name to the desired UI
          language.
        </li>
        <li>
          {' '}
          Approach when component refers with "aria-labelledby" to itself was taken from{' '}
          <Link href="https://www.w3.org/TR/accname-1.1/#terminology" inline>
            Accessible Name and Description Computation 1.1 page.
          </Link>{' '}
          To find the example there go to "4.3.1 Terminology{'>'} 2B {'>'} Example"
        </li>
      </ul>
    </Scenario>
  );
};
