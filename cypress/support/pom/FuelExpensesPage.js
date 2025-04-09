import LeftNavBar from './LeftNavBar'

export default class FuelExpenses {
    pageUrl = '/panel/expenses';

    navBar = new LeftNavBar();

    selectFuelExpenses() {
        this.navBar.selectGenericNavBarElement(this.navBar.navTabs.fuelExpenses);
    }

    selectors = {
        vehicleDropdownButton: () => cy.get('#carSelectDropdown'),
        addExpenseButton: () => cy.contains('button[class*="btn-primary"]', 'Add an expense'),
        addExpenseDialogVehicleSelect: () => cy.get('select[id="addExpenseCar"]'),
        addExpenseDialogReportDateInput: () => cy.get('input[id="addExpenseDate"]'),
        addExpenseDialogMileageInput: () => cy.get('input[id="addExpenseMileage"]'),
        addExpenseDialogNumberOfLitersInput: () => cy.get('input[id="addExpenseLiters"]'),
        addExpenseDialogTotalCostInput: () => cy.get('input[id="addExpenseTotalCost"]'),
        addExpenseDialogCancelButton: () => cy.contains('[class*="modal-footer"] button', 'Cancel'),
        addExpenseDialogAddButton: () => cy.contains('[class*="modal-footer"] button', 'Add'),
        genericExpenseElement: () => cy.get('tbody tr'),
        genericExpenseElementDeleteButton: () => cy.get('button[class="btn btn-delete"]'),
        genericExpenseElementDeleteExpenseConfirmButton: () => cy.contains('[class*="modal-footer"] button', 'Remove')
    }

    get getDateCellValueFromExpensesTable() {
        return cy.get('tbody tr').find('td').eq(0).invoke('text')
    }

    get getMileageCellValueFromExpensesTable() {
        return cy.get('tbody tr').find('td').eq(1).invoke('text')
    }

    get getLitersCellValueFromExpensesTable() {
        return cy.get('tbody tr').find('td').eq(2).invoke('text')
    }

    get getTotalCostCellValueFromExpensesTable() {
        return cy.get('tbody tr').find('td').eq(3).invoke('text')
    }

    //**
    // * Add expense
    // * @param expenseData {
    // "carId": 322538,
    // "reportedAt": "6.04.2025",
    // "mileage": 125,
    // "liters": 10,
    // "totalCost": 10
    // }
    // */

    selectCarInVehicleDropdown(carName) {
        this.selectors.vehicleDropdownButton().click();
        cy.contains('li', `${carName}`).invoke('removeClass', 'disabled').click();
    }

    addFuelExpenses(expenseData) {
        cy.wait(500)
        this.selectors.addExpenseButton().should('be.visible').click();
        cy.wait(1000);
        this.selectors.addExpenseDialogVehicleSelect().select(expenseData.vehicle);
        cy.wait(1000);
        this.selectors.addExpenseDialogReportDateInput().clear().type(expenseData.reportedAt);
        this.selectors.addExpenseDialogMileageInput().clear().type(expenseData.mileage);
        this.selectors.addExpenseDialogNumberOfLitersInput().type(expenseData.liters);
        this.selectors.addExpenseDialogTotalCostInput().type(expenseData.totalCost);
        this.selectors.addExpenseDialogAddButton().click();
    }

    clearCarExpenses() {
        cy.wait(500);
        cy.get('body').then(($body) => {
            const isGarageEmpty = $body.find('p.panel-empty_message:contains("You don’t have any fuel expenses filed in")').length > 0;

            if (!isGarageEmpty) {
                this.selectors.genericExpenseElementDeleteButton().each(($btn) => {
                    cy.wrap($btn).click({ force: true });
                    cy.wait(500);
                    this.selectors.genericExpenseElementDeleteExpenseConfirmButton().each(($btn) => {
                        cy.wrap($btn).click();
                    });
                });
            } else {
                cy.log('Garage is already empty — skipping car expenses removal');
            }
        });

    }
}