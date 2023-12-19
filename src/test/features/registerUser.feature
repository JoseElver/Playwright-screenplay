Feature: Register user

  @test
  Scenario: Register new user
    Given I navigate to the register page
    When I create a new user
    Then I confirm user registration is success