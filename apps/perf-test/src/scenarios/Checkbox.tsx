import * as React from 'react';
import { Checkbox, ICheckboxStyles } from 'office-ui-fabric-react';

const styles: Partial<ICheckboxStyles> = { root: { background: 'red' } };
const Scenario = () => <Checkbox label="I am a checkbox" styles={styles} />;

export default Scenario;
