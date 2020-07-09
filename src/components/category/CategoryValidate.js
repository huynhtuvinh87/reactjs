export default function validate(fields, isValid, type) {
  let errors = {};

    //last_name
    if (!fields['title']) {
      isValid = false;
      errors['title'] = 'Last Name cannot be empty';
    }
  return {
    errors: errors,
    isValid: isValid
  };
}
