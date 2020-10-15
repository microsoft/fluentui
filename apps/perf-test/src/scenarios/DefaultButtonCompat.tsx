import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/compat/Button';

const styles = { root: { background: 'red' } };
const Scenario = () => <DefaultButton text="I am a button" styles={styles} />;

export default Scenario;
