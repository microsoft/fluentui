import { useStyles } from './greeter.styles';
export function greeter(greeting: string, user: User): string {
  const styles = useStyles();
  return `<h1 class="${styles}">${greeting} ${user.name} from ${user.hometown?.name}</h1>`;
}

type User = {
  name: string;
  hometown?: {
    name: string;
  };
};
