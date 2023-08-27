describe('Change user data flow', () => {
  it('passes and redirects to users list page', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy=login-id-input] input').type('alice')
    cy.get('[data-cy=login-password-input] input').type('1234')
    cy.get('[data-cy=login-submit]').click()

    cy.get('[data-cy=users-list-page]')
    cy.get('[data-cy=user-details-card-alice] [data-cy=user-details-button]').click()
    cy.get('[data-cy=user-detais-show-form]').click()

    cy.get('[data-cy=user-update-name-input] input').type('New Alice')
    cy.get('[data-cy=user-update-password-input] input').type('1234')
    cy.get('[data-cy=user-update-password-confirm-input] input').type('1234')
    cy.get('[data-cy=user-update-submit]').click()

    cy.get('[data-cy=user-details-update-success]')
  })
})
