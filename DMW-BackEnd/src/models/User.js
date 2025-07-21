const mongoose = require('mongoose');

// Validator to ensure there are no leading or trailing spaces
const noLeadingOrTrailingSpacesValidator = (value) => {
  return value === value.trim();
};

// Validator to ensure there are no spaces anywhere in the value
const noSpacesValidator = (value) => {
  return !/\s/.test(value);
};

// Regular expression to validate email format
const emailValidator = (value) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(value);
};

// Function to validate that the phone number is a valid Indian number (starting with 6-9 and exactly 10 digits)
const indianPhoneValidator = (value) => {
  const indianPhoneRegex = /^[6-9]\d{9}$/;
  return indianPhoneRegex.test(value);
};

const mediumPasswordValidator = (value) => {
  // Minimum 8 characters, at least one lowercase letter, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
  return passwordRegex.test(value);
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: [
      {
        validator: noLeadingOrTrailingSpacesValidator,
        message: 'Name should not have leading or trailing spaces'
      }
    ]
  },
  username: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator: noLeadingOrTrailingSpacesValidator,
        message: 'Username should not have leading or trailing spaces'
      },
      {
        validator: noSpacesValidator,
        message: 'Username should not contain spaces'
      }
    ]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator: noLeadingOrTrailingSpacesValidator,
        message: 'Email should not have leading or trailing spaces'
      },
      {
        validator: noSpacesValidator,
        message: 'Email should not contain spaces'
      },
      {
        validator: emailValidator,
        message: 'Please provide a valid email format'
      }
    ]
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: indianPhoneValidator,
      message: 'Phone number must be a valid Indian number starting with 6-9 and exactly 10 digits'
    }
  },
  altPhone: {
    type: String,
    validate: {
      validator: indianPhoneValidator,
      message: 'Alternative phone number must be a valid Indian number starting with 6-9 and exactly 10 digits'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(value) {
        // Validate password strength only if it's in plain text (before hashing)
        if (this.isNew || this.isModified('password')) {
          return mediumPasswordValidator(value);
        }
        return true; // If password is already hashed, bypass validation
      },
      message: 'Password must be at least 8 characters long and contain at least one lowercase letter.'
    }
  },
  profileImage: { // Field for storing the profile image path
    type: String,
    default: null
  }
});

module.exports = mongoose.model('User', UserSchema);
