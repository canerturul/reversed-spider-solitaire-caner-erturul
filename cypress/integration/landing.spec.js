/// <reference types="cypress" />

const LANDINGPAGE_URL = "http://localhost:3000/";

describe("landingpage-tests", () => {
  beforeEach(() => {
    cy.visit(LANDINGPAGE_URL);
  });

  it("should open http://localhost:3000/", () => {
    cy.url().should("equal", LANDINGPAGE_URL);
  });

  it("should have landing class", () => {
    cy.get(".landing").should("exist");
  });
});
