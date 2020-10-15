import * as React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/compat/Button';

const styles = { root: { background: 'red' } };
const Scenario = () => <PrimaryButton styles={styles}>I am a button</PrimaryButton>;

export default Scenario;
