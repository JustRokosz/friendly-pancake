describe('Login flow', () => {
  it('can displays error', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy=login-id-input] input').type('alice')
    cy.get('[data-cy=login-password-input] input').type('1235')
    cy.get('[data-cy=login-submit]').click()

    cy.get('[data-cy=login-error]')
  })

  it('passes and redirects to users list page', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy=login-id-input] input').type('alice')
    cy.get('[data-cy=login-password-input] input').type('1234')
    cy.get('[data-cy=login-submit]').click()

    cy.get('[data-cy=users-list-page]')
  })
})
