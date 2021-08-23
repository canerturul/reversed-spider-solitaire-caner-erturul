/// <reference types="cypress" />

const HOMEPAGE_URL = "http://localhost:3000/home";

describe("homepage-tests", () => {
  beforeEach(() => {
    cy.visit(HOMEPAGE_URL);
  });

  it("should open http://localhost:3000/home", () => {
    cy.url().should("equal", HOMEPAGE_URL);
  });

  it("should have title on home page", () => {
    cy.title().should("not.be.empty").and("equal", "Spider Solitaire");
  });

  it("should have 'Spider Solitaire' text in header on homepage", () => {
    cy.get(".header").contains("Spider Solitaire");
  });

  it("should have rank text each card", () => {
    cy.get(".card-rank-left").each(($el, index, $list) => {
      const rank = $el.text();
      assert.isNotEmpty(rank);
    });
  });

  it("should have 00:00 timer text when game start", () => {
    cy.get(".second").should("have.text", "00");
    cy.get(".minute").should("have.text", "00");
  });

  it("should have 00:00 timer text when restart clicked", () => {
    cy.get(".Restart").click();
    cy.get(".second").should("have.text", "00");
  });

  it("should decrease by one the deck of pile when clicking on the card distribute", () => {
    cy.get(".card-pile").click();
    cy.get(".card-pile-down").should("have.length", 4);
  });

  it("should be 5 the stack card count when clicking restart", () => {
    cy.get(".Restart").click();
    cy.get(".card-pile-down").should("have.length", 5);
  });
});
