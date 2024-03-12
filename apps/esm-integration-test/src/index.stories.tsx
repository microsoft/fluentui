import { tokens } from '@fluentui/react-theme';

export const Hello = () => {
  return (
    <div>
      <label htmlFor="a">Select token</label>
      <select name="" id="a">
        {Object.keys(tokens).map(value => {
          return <option value={value}>{value}</option>;
        })}
      </select>
    </div>
  );
};

export default {
  component: Hello,
  title: 'Hello',
  subcomponents: {},
};
