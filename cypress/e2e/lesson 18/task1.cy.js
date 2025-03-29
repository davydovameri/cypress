describe('Testing buttons in the header', () => {
  beforeEach(() => {
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    })
  })
  
  it('checks all header buttons', () => {
    cy.get('app-header [class^="btn"], app-header button').as('headerButtons');
    cy.get('@headerButtons').each(($item) => {
      cy.wrap($item).should('be.visible')
    });
  })

})

describe('Testing buttons in the footer', () => {
  beforeEach(() => {
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    })
  })

  it('checks Facebook icon', () => {
    cy.get('[class$="icon-facebook"]').as('iconFacebook');
    cy.get('@iconFacebook').should('be.visible');
    cy.get('@iconFacebook').parent().should('have.attr', 'href');
  })

  it('checks Telegram icon', () => {
    cy.get('[class$="icon-telegram"]').as('iconTelegram');
    cy.get('@iconTelegram').should('be.visible');
    cy.get('@iconTelegram').parent().should('have.attr', 'href');
  })

  it('checks Youtube icon', () => {
    cy.get('[class$="icon-youtube"]').as('iconYoutube');
    cy.get('@iconYoutube').should('be.visible');
    cy.get('@iconYoutube').parent().should('have.attr', 'href');
  })

  it('checks Instagram icon', () => {
    cy.get('[class$="icon-instagram"]').as('iconInstagram');
    cy.get('@iconInstagram').should('be.visible');
    cy.get('@iconInstagram').parent().should('have.attr', 'href');
  })

  it('checks Linkedin icon', () => {
    cy.get('[class$="icon-linkedin"]').as('iconLinkedin');
    cy.get('@iconLinkedin').should('be.visible');
    cy.get('@iconLinkedin').parent().should('have.attr', 'href');
  })

  it('checks footer links', () => {
    cy.get('[class^="contacts_link"]').as('footerLinks');
    cy.get('@footerLinks').each(($item) => {
      cy.wrap($item).should('be.visible').and('have.attr', 'href');
    });
  })
})