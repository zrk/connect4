export function elementInARow<T = unknown>(
  array: T[],
  length: number,
): T | undefined {
  let last: T | undefined;
  let count = 0;

  for (let i = 0; i < array.length; i += 1) {
    // eslint-disable-next-line no-continue
    if (array[i] === null || array[i] === undefined) continue;

    if (last !== array[i]) {
      count = 1;
      last = array[i];
    } else {
      count += 1;
    }

    if (count >= length) return array[i];
  }

  return undefined;
}
