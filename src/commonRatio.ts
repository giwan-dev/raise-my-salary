/**
 * get common ratio in geometric sequence
 * when first value is "initial" and "index" + 1 th value is final.
 * @param initial
 * @param final
 * @param index
 */
export function getCommonRatio(initial: number, final: number, index: number): number {
  if (index === 0) {
    throw new Error('Argument index cannot be 0.');
  }
  if (initial === 0) {
    throw new Error('Argument initial cannot be 0.');
  }

  return Math.pow(final / initial, 1 / index);
}
