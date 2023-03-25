document.addEventListener("DOMContentLoaded", function () {
  function Calculator() {
    this.prices = {
      product: 0.5,
      order: 0.25,
      packageBasic: 0,
      packageProfessional: 25,
      packagePremium: 60,
      accounting: 35,
      terminalRental: 5,
    };
    this.totalRowValue = 0;
  }

  // Calculator.prototype.AddToTotal = function (addvalue) {
  //   this.totalRowValue += addvalue;
  //   resultObjectsObj.totalRowValueLabel.innerText = "$" + this.totalRowValue;
  // };

  // Calculator.prototype.SubFromTotal = function (addvalue) {
  //   this.totalRowValue -= addvalue;
  //   resultObjectsObj.totalRowValueLabel.innerText = "$" + this.totalRowValue;
  // };

  function GrabSelectList() {
    this.SelectedList = document.querySelector(".form-select-options");
    this.ListElements = this.SelectedList.querySelectorAll("li");
    this.SelectListOpened = false;
  }

  GrabSelectList.prototype.ShowList = function (rotatedObject) {
    this.SelectedList.style.display = "block";
    rotatedObject.style.transition = "0.3s";
    rotatedObject.style.transform = "rotate(180deg)";
  };

  GrabSelectList.prototype.CloseList = function (rotatedObject) {
    this.SelectedList.style.display = "none";
    rotatedObject.style.transform = "rotate(0deg)";
  };

  function InputFields() {
    // Main form
    this.formParent = document.querySelector(".left-column__form");

    // All forms from the left I need
    this.forms = {
      productsQuantity: this.formParent.querySelector(
        ".input__number--products-quantity"
      ),
      estimatedMonths: this.formParent.querySelector(
        ".input__number--estimated-months"
      ),
      packageContainer: this.formParent.querySelector(".form__input-select"),
      packageLabel: this.formParent.querySelector(".input-select__text"),
      accounting: this.formParent.querySelector(".checkbox--accounting input"),
      terminalRental: this.formParent.querySelector(".checkbox--rentall input"),
    };

    // Arrow icon to rotate
    this.arrowIcon = this.formParent.querySelector(".input-select__icon");
  }

  function ResultObjects() {
    // Main container ( rightcolumn)
    this.parentElement = document.querySelector(
      ".calculator__columns .columns__right-column"
    );

    // All output rows
    this.rows = {
      product: this.parentElement.querySelector(".row--products"),
      months: this.parentElement.querySelector(".row--months"),
      package: this.parentElement.querySelector(".row--package"),
      packageMiddleLabel: this.parentElement.querySelector(".math--package"),
      packageValueLabel: this.parentElement.querySelector(".price--package"),
      accounting: this.parentElement.querySelector(".row--accounting"),
      terminal: this.parentElement.querySelector(".row--terminal"),
    };

    // Total value (inside a row)
    this.totalRow = this.parentElement.querySelector(".right-column__total");
    this.totalRowValueLabel = this.totalRow.querySelector(".total__price");
  }

  const inputFieldsObj = new InputFields();
  const priceCalculator = new Calculator();
  const resultObjectsObj = new ResultObjects();
  const grabList = new GrabSelectList();

  // EVENT LISTENERY:

  // SELECTLIST INTERACTIONS
  inputFieldsObj.forms.packageContainer.addEventListener("click", function () {
    if (grabList.SelectListOpened == false) {
      grabList.ShowList(inputFieldsObj.arrowIcon);
      grabList.SelectListOpened = true;
    } else {
      grabList.CloseList(inputFieldsObj.arrowIcon);
      grabList.SelectListOpened = false;
    }
  });

  grabList.ListElements.forEach(function (listElement) {
    listElement.addEventListener("click", function () {
      grabList.CloseList(inputFieldsObj.arrowIcon);
      grabList.SelectListOpened = false;
      let listElementValue = listElement.innerText;

      if (
        listElementValue == "Professional" &&
        inputFieldsObj.forms.packageLabel.innerText != "Professional"
      ) {
        priceCalculator.AddToTotal(priceCalculator.prices.packageProfessional);
      }

      if (
        listElementValue == "Premium" &&
        inputFieldsObj.forms.packageLabel.innerText != "Premium"
      ) {
        priceCalculator.AddToTotal(priceCalculator.prices.packagePremium);
      }

      ///////////////////////
      // THIS IS AWFUL --> MAYBE IT CAN BE DONE DIFFERENTLY?
      // CHECK HOW LMS HANDLES SELECTLIST THING

      // BTW HOW THIS CODE KNOWS WHEN I CHOOSE BASIC, IT CHANGES TOTAL ROW VALUE
      // TO 0???????

      if (
        listElementValue != "Professional" &&
        inputFieldsObj.forms.packageLabel.innerText == "Professional"
      ) {
        priceCalculator.SubFromTotal(
          priceCalculator.prices.packageProfessional
        );
      }

      if (
        listElementValue != "Premium" &&
        inputFieldsObj.forms.packageLabel.innerText == "Premium"
      ) {
        priceCalculator.SubFromTotal(priceCalculator.prices.packagePremium);
      }

      ////////////////////////

      inputFieldsObj.forms.packageLabel.innerText = listElementValue;
      inputFieldsObj.forms.packageLabel.style.color = "black";

      resultObjectsObj.rows.packageMiddleLabel.innerText = listElementValue;

      //HOW TO DIFFERENTIATE --> PUT PROPER VALUE IN THE LABEL?
      resultObjectsObj.rows.packageValueLabel.innerText =
        priceCalculator.prices.packagePremium;
      // CAN IT BE DONE WITHOUT IFS????
    });
  });
});
