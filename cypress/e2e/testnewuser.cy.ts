import { faker } from "@faker-js/faker";

describe('Teste de novo usuário', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
    Cypress._.times(10, () => { 
        it('Registro usuário', () => {
            

            cy.visit('http://localhost:5173')
            cy.wait(2000)
            cy.get('[data-cy=go-register]').click()
            cy.wait(2000)
            cy.get('[data-cy=email-input]').type(email)
            cy.get('[data-cy=password-input]').type(password)
            cy.get('[data-cy=name-input]').type(firstName)
            cy.get('[data-cy=lastname-input]').type(lastName)

            cy.get('[data-cy=bnt-register]').click()
        })
    })

})