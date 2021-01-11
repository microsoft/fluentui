import * as React from 'react';
import { BaseButton } from '@fluentui/react/lib/compat/Button';

const styles = {
  root: { background: 'red', height: '50px', minWidth: '80px', padding: '10px', margin: '8px', fontWeight: '600' },
};
const Scenario = () => <BaseButton text="I am a button" styles={styles} />;

export default Scenario;
