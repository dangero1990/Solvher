export function getCount(refCount, partialWeight, refWeight, tare, rolls) {
  const actualPartialWeight = partialWeight - tare * rolls;
  const answer = (refCount * actualPartialWeight) / refWeight;

  return Math.floor(answer).toLocaleString('en-US');
}
