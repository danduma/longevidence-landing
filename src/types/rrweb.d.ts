declare module '@rrweb/types' {
  export type eventWithTime = Record<string, unknown>;
  export type blockClass = string;
  export type maskTextClass = string;
  export type hooksParam = Record<string, unknown>;
  export type PackFn = (...args: unknown[]) => unknown;
  export type SamplingStrategy = Record<string, unknown>;
  export type RecordPlugin = unknown;
  export type KeepIframeSrcFn = (src: string) => boolean;
}
