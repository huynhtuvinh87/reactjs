export default function validate(fields, isValid, type) {
  let errors = {};
  // if (type == 'update' || type == 'create') {
  //   //first_name
  //   if (!fields['first_name']) {
  //     isValid = false;
  //     errors['first_name'] = 'Fist Name cannot be empty';
  //   }

  //   //last_name
  //   if (!fields['last_name']) {
  //     isValid = false;
  //     errors['last_name'] = 'Last Name cannot be empty';
  //   }

  //   //phone
  //   if (!fields['phone']) {
  //     isValid = false;
  //     errors['phone'] = 'Phone cannot be empty';
  //   }

  //   //address
  //   if (!fields['address']) {
  //     isValid = false;
  //     errors['address'] = 'Address cannot be empty';
  //   }

  //   //phone
  //   if (!fields['website']) {
  //     isValid = false;
  //     errors['website'] = 'Website cannot be empty';
  //   }

  //   //email
  //   if (!fields['email']) {
  //     isValid = false;
  //     errors['email'] = 'email cannot be empty';
  //   }

  //   //Email
  //   if (!fields['email']) {
  //     isValid = false;
  //     errors['email'] = 'Email cannot be empty';
  //   }

  //   if (typeof fields['email'] !== 'undefined') {
  //     let lastAtPos = fields['email'].lastIndexOf('@');
  //     let lastDotPos = fields['email'].lastIndexOf('.');

  //     if (
  //       !(
  //         lastAtPos < lastDotPos &&
  //         lastAtPos > 0 &&
  //         fields['email'].indexOf('@@') === -1 &&
  //         lastDotPos > 2 &&
  //         fields['email'].length - lastDotPos > 2
  //       )
  //     ) {
  //       isValid = false;
  //       errors['email'] = 'Email is not valid';
  //     }
  //   }
  // }
  return {
    errors: errors,
    isValid: isValid
  };
}
