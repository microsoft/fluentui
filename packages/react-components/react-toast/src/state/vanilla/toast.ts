// TODO convert to closure
export class Toast {
  public running = false;
  public onUpdate: () => void = () => null;

  public play() {
    this.running = true;
  }

  public pause() {
    this.running = false;
  }
}
