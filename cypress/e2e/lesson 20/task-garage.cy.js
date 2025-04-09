import Garage from '../../support/pom/GaragePage'

const garage = new Garage();
const file = Cypress.env('baseUrl').includes("2") ? 'qauto2' : 'qauto';

describe('Garage Page', () => {
    beforeEach(() => {
        cy.visit();
        cy.login();
        garage.selectGarage();
        garage.clearAllCars();
        cy.fixture('cars').as('inputData');
    });

    it('should add a new car and validate created car exists', function () {
        garage.createCar(this.inputData);

        cy.readFile(`cypress/fixtures/createdCar.${file}.json`).then((savedCar) => {
            const carId = savedCar.id;

            cy.request({
                method: 'GET',
                url: `${Cypress.env('baseUrl')}/api/cars`,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const createdCar = response.body.data.find(car => car.id === carId);

                expect(createdCar).to.exist;
                expect(createdCar.id).to.eq(carId);
                expect(createdCar.brand).to.eq(this.inputData.carBrand);
                expect(createdCar.model).to.eq(this.inputData.carModel);
                expect(createdCar.mileage).to.eq(this.inputData.mileage);
            });
        });
    });
})