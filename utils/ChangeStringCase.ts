export const FirstLetterOfUpperCase = (value: string) => {
  const result = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  return result;
};
