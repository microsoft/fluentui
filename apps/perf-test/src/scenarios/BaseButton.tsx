import * as React from 'react';
import { BaseButton } from '@fluentui/react/lib/Button';

const styles = { root: { background: 'red' } };
const Scenario = () => <BaseButton text="I am a button" styles={styles} />;

export default Scenario;
