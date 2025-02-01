export const isNumber = (number) => {
  const value = parseInt(number);
  return { status: !isNaN(value), value: value };
};

export const isFloat = (number) => {
  const value = parseFloat(number);
  return { status: !isNaN(value), value: value };
};
