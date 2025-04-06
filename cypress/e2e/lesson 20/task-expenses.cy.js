import FuelExpenses from '../../support/pom/FuelExpensesPage'

const fuelExpenses = new FuelExpenses();

describe('Fuel expenses Page', () => {
    beforeEach(() => {
        cy.visit();
        cy.login();
        fuelExpenses.selectFuelExpenses();
        fuelExpenses.clearAllExpenses();
        cy.fixture('expenses').as('data');
    });

    it('should add fuel expenses', function () {
        fuelExpenses.addFuelExpenses(this.data)
    })
})