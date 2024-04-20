export function getCount(refCount, partialWeight, refWeight, tare = 0, rolls = 1) {
  const actualPartialWeight = partialWeight - tare * rolls;
  const answer = (refCount * actualPartialWeight) / (refWeight - tare);

  return Math.round(answer).toLocaleString('en-US');
}
