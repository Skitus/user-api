export const NEW_ID = 0;

export type Result<T> = T | undefined | null;

export function toDoublePrecisionFloat(a: number) {
  return Math.trunc(a * 100) / 100;
}
