# Convertr Tech Test

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

## Install

Run `npm install` to install dependencies

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Notes

WIth time available I have attempted a vertical cross section of functionality to demonstrate best practices:

* Unit Tests (not full coverage)
* API Retry Stragtegy
* Online / Offline failover (scaffold)
* Logging service with capacity for reporting to error managemant middleware
* Feature based application architecture
* Basic routing including a 404 page 
* Angular Material components 

With more time I would have liked to have done the following, roughly in order of priority:

* Full test coverage
* Appropriate form validations (e.g. more than just "required")
* Inline error message feedback into the form inputs
* An error message if the API fails to load
* Extend the online / offline scaffolf with feeback to the user and auto-online
* Add autocomplete annotations to the form
* Continuious Integration (I usually use Circle + Codecov)
* E2E coverage
* Sortable table header
* Work on responsive design
