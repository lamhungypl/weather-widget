export const temperatureRounded = (
  temp: number,
  unit: 'metric' | 'imperial' | undefined = 'metric',
) => {
  return Math.round(temp);
};

export function kelvinToCelsius(k: number) {
  return Math.round(k - 273.15);
}

export function celsiusToFahrenheit(c: number) {
  return Math.round(c * (9 / 5) + 32);
}

export function fahrenheitToCelsius(f: number) {
  return Math.round(((f - 32) * 5) / 9);
}

export function kmToMile(n: number) {
  return Math.round(n / 1.60934);
}

export function mileToKm(n: number) {
  return Math.round(n * 1.60934);
}
