#
#  Feature: Calculator
#      As a person
#    I want somethinng.
#
#
#    Scenario: Calculates Stuff
#      Given something
#      When I use the calculator
#      Then I works.


@todo
Feature: myTodo. In order to avoid miss any important thing. As a user. I want to record my daily work item

  Scenario: Add one Task
    Given Go to MyToDo Page
    And Input what I want to do in the textbox
    When I click [add] button
    Then one task record is generated.

  Scenario: Remove one task
    Given I add one task
    And At least one record exists in MyToDo Page
    When I press [X] button of one record
    Then The task record is removed.





