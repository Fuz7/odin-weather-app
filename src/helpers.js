// eslint-disable-next-line import/no-extraneous-dependencies
import Fraction from 'fraction.js';

export function convertToCelcius(temp) {
  const fraction = new Fraction(5, 9); // Represents 5/9
  return Math.round((temp - 32) * fraction);
}

export function convertToFahrenheit(temp) {
  const fraction = new Fraction(9, 5); // Represents 9/5
  return Math.round(temp * fraction + 32);
}
