export const mod = (n: number, m: number): number => {
  const q = n % m;
  return q < 0 ? q + m : q;
};
