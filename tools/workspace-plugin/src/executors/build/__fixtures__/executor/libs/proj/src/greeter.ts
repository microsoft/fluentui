import { useStyles } from './greeter.styles';
export function greeter(greeting: string) {
  const styles = useStyles();
  return `<h1 class="${styles}">${greeting}</h1>`;
}
