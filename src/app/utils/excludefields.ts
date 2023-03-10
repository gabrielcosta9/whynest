function excludeFields<T, Key extends keyof T>(
  model: T,
  keys: Key[],
): Omit<T, Key> {
  const obj = model;

  keys.map((key) => delete obj[key]);

  return obj;
}

export { excludeFields };
