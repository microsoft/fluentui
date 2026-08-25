import { shout } from './helper';

export function greeter(name: string): string {
  return shout(`hello ${name}`);
}
