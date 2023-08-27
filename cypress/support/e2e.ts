Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('NEXT_REDIRECT')) {
    return false
  }
})
