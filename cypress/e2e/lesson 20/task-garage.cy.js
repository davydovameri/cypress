import Garage from '../../support/pom/GaragePage'

const garage = new Garage();

describe('Garage Page', () => {
    beforeEach(() => {
        cy.visit();
        cy.login();
        garage.selectGarage();
        garage.clearAllCars();
        cy.fixture('cars').as('data');
    });

    it('should add a new car', function () {
        garage.createCar(this.data);
    });

})