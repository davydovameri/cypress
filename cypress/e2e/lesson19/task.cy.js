import SignUpForm from '../../support/pom/SignUpForm';
import { faker } from '@faker-js/faker';
import { ERROR_MESSAGES } from '../../fixtures/errorMessages';
import { PASSWORDS } from '../../fixtures/passwords';
import { INVALID_NAMES } from '../../fixtures/invalidNames';

const signUpForm = new SignUpForm();

describe('User Registration Form', () => {
  beforeEach(() => {
    cy.visit();
    signUpForm.openRegistrationForm();
    cy.fixture('signupData').as('data');
  });

  it('should display the Registration title', () => {
    signUpForm.selectors.registrationLabel().should('be.visible');
  });

  context('Validating the Name field', () => {
    it('should not show validation errors for a valid name', () => {
      signUpForm.typeName(faker.person.firstName());
      signUpForm.selectors
        .signUpFormNameInput()
        .showErrorMessage(false);
    });

    it('should show an error for an empty Name field', () => {
      signUpForm.selectors
        .signUpFormNameInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.nameEmpty);

    });

    it('should show an error for Name with non-English characters', () => {
      signUpForm.typeName(INVALID_NAMES.nameInvalidSymbols);
      signUpForm.selectors
        .signUpFormNameInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.nameInvalid);
    });

    it('should show an error for Name shorter than the minimum length', () => {
      signUpForm.typeName(INVALID_NAMES.nameShort);
      signUpForm.selectors
        .signUpFormNameInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.nameInvalidLength);
    });

    it('should show an error for Name exceeding the maximum length', () => {
      signUpForm.typeName(INVALID_NAMES.nameLong);
      signUpForm.selectors
        .signUpFormNameInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.nameInvalidLength);
    });
  });

  context('Validating the Last Name field', () => {
    it('should not show validation errors for a valid Last Name', () => {
      signUpForm.typeLastName(faker.person.lastName());
      signUpForm.selectors
        .signUpFormLastNameInput()
        .showErrorMessage(false);
    });

    it('should show an error for an empty Last Name field', () => {
      signUpForm.selectors
        .signUpFormLastNameInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.lastNameEmpty);

    });

    it('should show an error for Last Name with non-English characters', () => {
      signUpForm.typeLastName(INVALID_NAMES.nameInvalidSymbols);
      signUpForm.selectors
        .signUpFormLastNameInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.lastNameInvalid);
    });

    it('should show an error for Last Name shorter than the minimum length', () => {
      signUpForm.typeLastName(INVALID_NAMES.nameShort);
      signUpForm.selectors
        .signUpFormLastNameInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.lastNameInvalidLength);
    });

    it('should show an error for Last Name exceeding the maximum length', () => {
      signUpForm.typeLastName(INVALID_NAMES.nameLong);
      signUpForm.selectors
        .signUpFormLastNameInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.lastNameInvalidLength);
    });
  });

  context('Validating the Email field', () => {
    it('should not show validation errors for a valid Email', () => {
      signUpForm.typeEmail(faker.internet.email());
      signUpForm.selectors
        .signUpFormEmailInput()
        .showErrorMessage(false);
    });

    it('should show an error for an empty Email field', () => {
      signUpForm.selectors
        .signUpFormEmailInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.emailEmpty);
    });

    it('should show an error for an invalid Email format', function () {
      signUpForm.typeEmail(this.data.invalidUser.email);
      signUpForm.selectors
        .signUpFormEmailInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.emailInvalid);
    });
  });

  context('Validating the Password field', () => {
    it('should not show validation errors for a valid Password', () => {
      signUpForm.typePassword(PASSWORDS.passwordValid);
      signUpForm.selectors
        .signUpFormPasswordInput()
        .showErrorMessage(false);
    });

    it('should show an error for an empty Password field', () => {
      signUpForm.selectors
        .signUpFormPasswordInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.passwordEmpty);
    });

    it('should show an error for a Password shorter than 8 characters without a number', () => {
      signUpForm.typePassword(PASSWORDS.passwordNoNumber);
      signUpForm.selectors
        .signUpFormPasswordInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.passwordInvalid);
    });

    it('should show an error for a Password longer than 15 characters without an uppercase letter', () => {
      signUpForm.typePassword(PASSWORDS.passwordNoUppercase);
      signUpForm.selectors
        .signUpFormPasswordInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.passwordInvalid);
    });
  });

  context('Validating the Re-enter Password field', () => {
    it('should not show validation errors when Passwords match', () => {
      signUpForm.typePassword(PASSWORDS.passwordValid);
      signUpForm.typeRepeatPassword(PASSWORDS.passwordValid);
      signUpForm.selectors
        .signUpFormRepeatPasswordInput()
        .showErrorMessage(false);
    });

    it('should show an error when Passwords do not match', () => {
      signUpForm.typePassword(PASSWORDS.passwordValid);
      signUpForm.typeRepeatPassword(PASSWORDS.passwordRepeatInvalid);
      signUpForm.selectors
        .signUpFormRepeatPasswordInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.passwordRepeatInvalid);
    });

    it('should show an error for an empty Re-enter Password field', () => {
      signUpForm.typePassword(PASSWORDS.passwordValid);
      signUpForm.selectors
        .signUpFormRepeatPasswordInput()
        .showErrorMessage()
        .contains(ERROR_MESSAGES.passwordRepeatEmpty);
    });
  });

  context('Register Button Behavior', () => {
    it('should disable the Register button when all fields are empty', () => {
      signUpForm.selectors.signUpFormRegisterButton().should('be.disabled');
    });

    it('should disable the Register button when some fields have errors', function () {
      signUpForm.typeName(this.data.invalidUser.name);
      signUpForm.typeLastName(this.data.invalidUser.lastName);
      signUpForm.typeEmail(this.data.invalidUser.email);
      signUpForm.typePassword(this.data.invalidUser.password);
      signUpForm.typeRepeatPassword(this.data.invalidUser.repeatPassword);
      signUpForm.selectors.signUpFormRegisterButton().should('be.disabled');
    });

    it('should enable the Register button when all fields are valid', function () {
      signUpForm.typeName(this.data.validUser.name);
      signUpForm.typeLastName(this.data.validUser.lastName);
      signUpForm.typeEmail(faker.internet.email());
      signUpForm.typePassword(this.data.validUser.password);
      signUpForm.typeRepeatPassword(this.data.validUser.password);
      signUpForm.selectors.signUpFormRegisterButton().should('not.be.disabled');
    });
  });

  context('Successful User Registration and Login', function () {
    it('should successfully register a user and send a POST request', function () {
      cy.intercept('POST', '/api/auth/signup').as('signupRequest');
      signUpForm.typeName(this.data.validUser.name);
      signUpForm.typeLastName(this.data.validUser.lastName);
      signUpForm.typeEmail(faker.internet.email());
      signUpForm.typePassword(this.data.validUser.password);
      signUpForm.typeRepeatPassword(this.data.validUser.password);
      signUpForm.clickRegisterButton();
      cy.wait('@signupRequest').its('response.statusCode').should('eq', 201);
      cy.url().should('include', '/panel/garage');
    });

    it('should successfully log in a user and send a POST request', function () {
      cy.intercept('POST', '/api/auth/signin').as('signinRequest');
      cy.visit();
      cy.login(this.data.validUser.email, this.data.validUser.password);
      cy.wait('@signinRequest').its('response.statusCode').should('eq', 200);
      cy.url().should('include', '/panel/garage');
    });
  });
});