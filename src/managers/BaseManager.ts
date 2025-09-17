export type ManagerListener = () => void;

export abstract class BaseManager {
  private readonly listeners = new Set<ManagerListener>();

  subscribe(listener: ManagerListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  protected emitChange(): void {
    this.listeners.forEach((listener) => listener());
  }
}
