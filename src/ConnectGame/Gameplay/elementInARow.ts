export function elementInARow<T = unknown>(
  array: T[],
  length: number,
): T | undefined {
  let last: T | undefined;
  let count = 0;

  for (let i = 0; i < array.length; i += 1) {
    if (last !== array[i]) {
      count = 1;
      last = array[i];
    } else {
      count += 1;
    }

    if (
      count >= length
      && array[i] !== undefined
      && array[i] !== null
    ) return array[i];
  }

  return undefined;
}
