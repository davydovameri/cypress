export default class SignUpForm {

  selectors = {
    signInButton: () => cy.contains('button', 'Sign In'),
    registrationButton: () => cy.contains('button', 'Registration'),
    registrationLabel: () => cy.get('[class="modal-title"]'),
    signUpFormNameInput: () => cy.get('#signupName'),
    signUpFormLastNameInput: () => cy.get('#signupLastName'),
    signUpFormEmailInput: () => cy.get('#signupEmail'),
    signUpFormPasswordInput: () => cy.get('#signupPassword'),
    signUpFormRepeatPasswordInput: () => cy.get('#signupRepeatPassword'),
    signUpFormRegisterButton: () => cy.contains('button', 'Register')
  }

  openRegistrationForm() {
    this.selectors.signInButton().click()
    this.selectors.registrationButton().click()
  }

  typeName(name) {
    this.selectors.signUpFormNameInput().type(name);
    return this;
  }

  typeLastName(lastName) {
    this.selectors.signUpFormLastNameInput().type(lastName);
    return this;
  }

  typeEmail(email) {
    this.selectors.signUpFormEmailInput().type(email);
    return this;
  }

  typePassword(password) {
    this.selectors.signUpFormPasswordInput().type(password, { sensitive: true });
    return this;
  }

  typeRepeatPassword(repeatPassword) {
    this.selectors.signUpFormRepeatPasswordInput().type(repeatPassword, { sensitive: true });
    return this;
  }

  clickRegisterButton() {
    this.selectors.signUpFormRegisterButton().click();
  }

}