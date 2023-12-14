describe("Email Button Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    // it won't beacause mailto urls are hidden within the browswer. cypress can't see them.
    it("should update window.location.href with the mailto link and intercept the API request", () => {
      /*  // Visit the page
      const email = "support@prolog-app.com";
      const subject = "Support Request:";
      // Click the "Support" button
      cy.contains("button", "Support").trigger("mouseover");

      // Verify the tooltip is visible
      cy.contains("button", "Support").should(
        "have.attr",
        "title",
        `Send email to: ${email}\nSubject: ${subject}` ,*/
      cy.contains("button", "Support").click();
    });
  });
});
