export const phoneValidationRule = {
   pattern: /^(?:\d{3}[\s-]?){2}\d{3}$/,
   message: 'Invalid phone number',
};

export const priceValidationRule = {
   pattern: /^\s*\d{1,3}(\s\d{3})*(\s*[,.]\s*\d{1,2})?\s*$/,
   message: 'Invalid price',
};
