export const splitPair = (pair: string) => {
  const base = pair.substring(0, 3);
  const dest = pair.substring(3, 6);

  return { base, dest };
};

export const calculateFeeAmount = (rate: number, feePercent: number) => {
  return rate * (feePercent / 100);
};

export const calculateFeeWithMarkUp = (rate: number, feePercent: number) => {
  return rate + calculateFeeAmount(rate, feePercent);
};
