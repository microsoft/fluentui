import { ExampleComponent } from './ExampleComponent';

export interface IExampleComponentProps extends React.HTMLProps<HTMLDivElement | ExampleComponent> {
  className?: string;
}