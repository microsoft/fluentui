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

export const LabelledReusingVisibleTextExample = () => {
  const styles = useStyles();
  return (
    <Scenario pageTitle="Component labelled reusing visible text">
      <h1>Component labelled reusing visible text</h1>
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

      <h3>Screen reader narration for each button</h3>
      <Text block>
        <Text weight="semibold">JAWS: </Text>
        Remove Robert Tolbert Button To activate press spacebar. <br />
        Remove Celeste Burton Button To activate press spacebar.
        <br />
      </Text>

      <h3>Implementation details</h3>
      <ul>
        <li>The aria-label="Remove [user name]" attribute was applied on each button</li>
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
            id="remove-button1"
            aria-labelledby="remove-button1 user1"
          />
        </div>
        <div className={styles.container}>
          <Avatar />
          <span id="user2">Celeste Burton</span>
          <Button
            icon={<PersonDelete24Regular />}
            aria-label="Remove"
            id="remove-button2"
            aria-labelledby="remove-button2 user2"
          />
        </div>
      </>

      <h3>Screen reader narration for each button</h3>
      <Text block>
        <Text weight="semibold">JAWS: </Text>
        Remove Robert Tolbert Button To activate press spacebar. <br />
        Remove Celeste Burton Button To activate press spacebar.
        <br />
      </Text>

      <h3>Implementation details</h3>
      <ul>
        <li>The id="user[number]" attribute was applied on the span element with user name.</li>
        <li>The id="remove-button[number]" attribute was applied on the "Remove" button.</li>
        <li>The aria-labelledby="remove-button[number] user[number]" attribute was applied on each "Remove" button.</li>
      </ul>
      <Divider appearance="strong" />
      <h2>Problem explanation</h2>
      <ul>
        <li>Even though the screen reader narration is the same for both examples, implementation is different.</li>
        <li>In general, for labelling we should reuse information that is visible/displayed in the UI.</li>
        <li>
          In this particular example, the aria-label attribute was added to the "Remove" button, and then, using the
          aria-labelledby attribute on the same button, we can refer to the "Remove" button itself.
        </li>
        <li>
          In many cases , using the aria-labelledby attribute avoids the translation of the element accessibility name
          to the desired UI language.
        </li>
        <li>
          {' '}
          The approach when a component refers to itself with the aria-labelledby attribute was taken from{' '}
          <Link href="https://www.w3.org/TR/accname-1.1/#terminology" inline>
            Accessible Name and Description Computation 1.1 page.
          </Link>{' '}
          To find the example on that page, go to "4.3.1 Terminology{'>'} 2B {'>'} Example"
        </li>
      </ul>
    </Scenario>
  );
};
