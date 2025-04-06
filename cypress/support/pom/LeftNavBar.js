export default class LeftNavBar {
    pageUrl = undefined;

    navTabs = {
        garage: 'Garage',
        fuelExpenses: 'Fuel expenses',
        instructions: 'Instructions',
        profile: 'Profile',
        settings: 'Settings',
        logOut: 'Log out'
    }

    selectGenericNavBarElement(textContent) {
        return cy.contains('[class="panel-layout"] a', textContent).click()
    }

}