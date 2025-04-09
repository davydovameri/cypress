import FuelExpenses from '../../support/pom/FuelExpensesPage'
import moment from 'moment'

const fuelExpenses = new FuelExpenses();
const file = Cypress.env('baseUrl').includes("2") ? 'qauto2' : 'qauto';
const todayDate = moment().format('YYYY-MM-DD');

describe('Fuel expenses Page', () => {
    beforeEach(() => {
        cy.visit();
        cy.login();
        fuelExpenses.selectFuelExpenses();
        cy.fixture('expenses').as('inputData');
    });

    // it('should add fuel expenses via UI', function () {
    //     fuelExpenses.addFuelExpenses(this.inputData);
    // })

    it('should add fuel expenses via API and validate response', function () {

        cy.readFile(`cypress/fixtures/createdCar.${file}.json`).then((savedCar) => {
            const carId = savedCar.id;

            cy.fixture('expenses').then((expense) => {


                const { vehicle, mileage, liters, totalCost } = expense;


                const filteredExpense = {
                    reportedAt: todayDate,
                    mileage,
                    liters,
                    totalCost,
                    forceMileage: false
                };

                fuelExpenses.selectCarInVehicleDropdown(vehicle);
                fuelExpenses.clearCarExpenses();

                cy.wait(500)

                cy.createExpense(carId, filteredExpense).then((res) => {
                    expect(res.status).to.eq(200);
                    expect(res.body.status).to.eq('ok');
                    expect(res.body.data.carId).to.eq(carId);
                    expect(res.body.data.reportedAt).to.eq(todayDate);
                    expect(res.body.data.mileage).to.eq(mileage);
                    expect(res.body.data.liters).to.eq(liters);
                    expect(res.body.data.totalCost).to.eq(totalCost);
                });
            });
        });
    })

    it('should find car via UI and validate with expense created via API', function () {

        cy.readFile(`cypress/fixtures/createdCar.${file}.json`).then((savedCar) => {
            const carId = savedCar.id;

            cy.request({
                method: 'GET',
                url: `${Cypress.env('baseUrl')}/api/cars/${carId}`,
            }).then((car) => {
                fuelExpenses.selectCarInVehicleDropdown(car.body.data.brand + ' ' + car.body.data.model);
            });

            cy.request({
                method: 'GET',
                url: `${Cypress.env('baseUrl')}/api/expenses?carId=${carId}`,
            }).then((response) => {

                expect(response.status).to.eq(200);
                const resp = response.body.data[0];

                expect(resp).to.exist;

                fuelExpenses.getDateCellValueFromExpensesTable.then((date) => {
                    const formattedDate = moment(date.trim(), 'DD.MM.YYYY').format('YYYY-MM-DD');
                    expect(resp.reportedAt).to.eq(formattedDate);
                });

                fuelExpenses.getMileageCellValueFromExpensesTable.then((mileage) => {
                    expect(resp.mileage).to.eq(Number(mileage));
                });

                fuelExpenses.getLitersCellValueFromExpensesTable.then((liters) => {
                    expect(resp.liters).to.eq(Number(liters.slice(0, -1)));
                });

                fuelExpenses.getTotalCostCellValueFromExpensesTable.then((totalCost) => {
                    expect(resp.totalCost).to.eq(Number(totalCost.slice(0, -4)));
                });
            });
        });

    })

})
