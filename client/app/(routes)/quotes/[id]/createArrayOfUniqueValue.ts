export const createArrayOFUniqueValues = (array: string[]) => {
  const valuesSet = new Set(array);
  return Array.from(valuesSet);
}
