// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add('login', {}, (email = Cypress.env('email'), password = Cypress.env('password')) => {
    cy.contains('button', 'Sign In').click()
    cy.get('#signinEmail').type(email);
    cy.get('#signinPassword').type(password);
    cy.contains('button', 'Login').click()
})

Cypress.Commands.add('showErrorMessage', { prevSubject: true }, (subject, isInvalid = true) => {
    cy.wrap(subject)
        .focus()
        .blur()
        .should((isInvalid) ? 'have.class' : 'not.have.class', 'is-invalid')
        .next()
        .should((isInvalid) ? 'exist' : 'not.exist')
});

Cypress.Commands.add('createExpense', (carId, expenseData) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('baseUrl')}/api/expenses`,
        body: {
            carId: carId,
            reportedAt: expenseData.reportedAt,
            mileage: expenseData.mileage,
            liters: expenseData.liters,
            totalCost: expenseData.totalCost,
            forceMileage: expenseData.forceMileage
        }
    });
});

Cypress.Commands.overwrite('visit', (originalFn) => {
    originalFn(Cypress.env('baseUrl'), {
        auth: {
            username: 'guest',
            password: 'welcome2qauto'
        }
    })
})

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        options.log = false
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        })
    }

    return originalFn(element, text, options)
})

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })