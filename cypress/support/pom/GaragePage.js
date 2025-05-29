import LeftNavBar from './LeftNavBar'

export default class Garage {
    pageUrl = '/panel/garage';

    navBar = new LeftNavBar();

    selectGarage() {
        this.navBar.selectGenericNavBarElement(this.navBar.navTabs.garage);
    }

    selectors = {
        addCarButton: () => cy.contains('button[class*="btn-primary"]', 'Add car'),
        addCarDialogCarBrandselect: () => cy.get('select[id="addCarBrand"]'),
        addCarDialogCarModelSelect: () => cy.get('select[id="addCarModel"]'),
        addCarDialogCarMileageInput: () => cy.get('input[id="addCarMileage"]'),
        addCarDialogCancelButton: () => cy.contains('[class*="modal-footer"] button', 'Cancel'),
        addCarDialogAddButton: () => cy.contains('[class*="modal-footer"] button', 'Add'),
        genericCarElement: () => cy.get('li app-car'),
        genericCarElementEditButton: () => cy.get('[class="car_edit btn btn-edit"]'),
        genericCarElementEditDialogRemovecarButton: () => cy.contains('[class*="modal-footer"] button', 'Remove car'),
        genericCarElementEditDialogRemovecarConfirmButton: () => cy.contains('[class*="modal-footer"] button', 'Remove'),
    }
    //**
    // * Create car
    // * @param carData = {
    //   carBrand: Audi,
    //   carModel: Q7,
    //   mileage: 123
    // }
    // */

    createCar(carData) {
        cy.intercept('POST', `${Cypress.env('baseUrl')}/api/cars`).as('createCarRequest');
        console.log(`${Cypress.env('baseUrl')}/api/cars/`)

        cy.wait(500);
        this.selectors.addCarButton().should('be.visible').click();
        cy.wait(1000);
        this.selectors.addCarDialogCarBrandselect().select(carData.carBrand);
        cy.wait(1000);
        this.selectors.addCarDialogCarModelSelect().select(carData.carModel);
        this.selectors.addCarDialogCarMileageInput().type(carData.mileage);
        this.selectors.addCarDialogAddButton().click();

        cy.wait('@createCarRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(201);

            const carId = interception.response.body.data.id;
            if (Cypress.env('baseUrl').includes("2"))
                cy.writeFile(`cypress/fixtures/createdCar.qauto2.json`, { id: carId });
            else
                cy.writeFile(`cypress/fixtures/createdCar.qauto.json`, { id: carId });
        });
    }

    clearAllCars() {
        cy.get('body').then(($body) => {
            const isGarageEmpty = $body.find('p.panel-empty_message:contains("You don’t have any cars in your garage")').length > 0;

            if (!isGarageEmpty) {
                this.selectors.genericCarElementEditButton().each(($btn) => {
                    cy.wrap($btn).click();
                    cy.wait(500);
                    this.selectors.genericCarElementEditDialogRemovecarButton().each(($btn) => {
                        cy.wrap($btn).click();
                        cy.wait(500);
                        this.selectors.genericCarElementEditDialogRemovecarConfirmButton().each(($btn) => {
                            cy.wrap($btn).click();
                        });
                    });
                });
            } else {
                cy.log('Garage is already empty — skipping car removal');
            }
        });
    }

}