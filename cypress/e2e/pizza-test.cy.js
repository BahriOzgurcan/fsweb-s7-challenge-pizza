describe('My First Test', () => {
  beforeEach(() => {
      cy.visit("/");
  })

 
    it("Navigation yonlendirmelerini kontrol et", () => {
      cy.get('.top-nav-bar').within(()=>{
        cy.get('[href="/"]')
        .should('have.attr', 'href')
        .and('include', '/')
        cy.get('[href="/pizza"]')
        .should('have.attr', 'href')
        .and('include', '/pizza')
        cy.get('[href="/success"]')
        .should('have.attr', 'href')
        .and('include', '/success')
      })
    });
    it("Aciktim butonunu kontrol et", () => {
      cy.get('#order-pizza').click()
      cy.url().should('include', 'pizza');
    });


    it("Siparis olusturma senaryosu kontrol eder", function siparisTesti() {
      cy.get('.top-nav-bar > [href="/pizza"]').click()
      cy.get('#order-button').should("be.disabled")
      cy.get('#2').click()
      cy.get('#size-dropdown').select(2)
      cy.wrap(Math.floor(Math.random() * 10)).then((num)=>{
        const randomSelection = ".form-check-label > #" + num.toString();
        cy.get(randomSelection).click();
      })
      cy.get('#order-button').should("be.disabled")
      cy.get('#name-input').type("Ninja Turtles")
      cy.get('#special-text').type("Acele olsun")
      cy.get('#order-button').should("not.be.disabled")
      cy.get('#decrease').should("be.disabled")
      cy.get('#increase').click()
      cy.get('#decrease').should("not.be.disabled")
      cy.get('#order-button').click()
    })

    describe("Siparis ozetini kontrol eder",() => {
      it("Siparis yokken Siparis Takip kontrolu saglar", () => {
        cy.get('.top-nav-bar > [href="/success"]').click()
        cy.get(".checkout").contains('HENÜZ')
      });
      

      it("Siparis olusturup Siparis Takip kontrolu saglar", () => {cy.visit("/pizza")
      cy.get('#order-button').should("be.disabled")
      cy.get('#2').click()
      cy.get('#size-dropdown').select(2)
      cy.wrap(Math.floor(Math.random() * 10)).then((num)=>{
        const randomSelection = ".form-check-label > #" + num.toString();
        cy.get(randomSelection).click();
      })
      cy.get('#order-button').should("be.disabled")
      cy.get('#name-input').type("Ninja Turtles")
      cy.get('#special-text').type("Acele olsun")
      cy.get('#order-button').should("not.be.disabled")
      cy.get('#decrease').should("be.disabled")
      cy.get('#increase').click()
      cy.get('#decrease').should("not.be.disabled")
      cy.get('#order-button').click()
      cy.get(".checkout").should("not.have.text", "HENÜZ")
      cy.get(".checkout").should("have.text", "TEBRİKLER!SİPARİŞİNİZ ALINDI!")})
    } )
  
});