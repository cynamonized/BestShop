function Calculator(leftParent, rightParent) {
  this.prices = {
    product: 0.5,
    month: 0.25,
    packageBasic: 0,
    packageProfessional: 25,
    packagePremium: 60,
    accounting: 35,
    terminalRental: 5,
  };
  this.accountingChecked = false;
  this.terminalChecked = false;
  this.totalRowValue = 0;
  this.inputFields = {
    productsQuantity: leftParent.querySelector(
      ".input__number--products-quantity"
    ),
    estimatedMonths: leftParent.querySelector(
      ".input__number--estimated-months"
    ),
    package: leftParent.querySelector(".form__input-select"),
    accounting: leftParent.querySelector(".checkbox--accounting input"),
    terminalRental: leftParent.querySelector(".checkbox--rentall input"),
  };
  this.SelectionList = leftParent.querySelector(
    ".calculator__columns .form-select-options"
  );
  this.SelectionListElements = this.SelectionList.querySelectorAll("li");
  this.SelectionListOpened = false;
  this.arrowIcon = leftParent.querySelector(".input-select__icon");
  this.resultRows = rightParent.querySelectorAll(".right-column__row");
  this.totalRowContainer = rightParent.querySelector(".right-column__total");
  this.totalRowValueLabel =
    this.totalRowContainer.querySelector(".total__price");
  this.addEventListeners();
}

// Selection list methods for visuals
Calculator.prototype.OpenSelectionList = function () {
  this.SelectionList.style.display = "block";
  this.arrowIcon.style.transition = "0.3s";
  this.arrowIcon.style.transform = "rotate(180deg)";
};

Calculator.prototype.CloseSelectionList = function () {
  this.SelectionList.style.display = "none";
  this.arrowIcon.style.transform = "rotate(0deg)";
};

Calculator.prototype.UpdateTotal = function () {
  let products = Number(this.inputFields.productsQuantity.value);
  let months = Number(this.inputFields.estimatedMonths.value);

  let productsPrice = 0;
  let monthsPrice = 0;
  let currentPackage = 0;
  let accounting = 0;
  let terminal = 0;

  // Updating rows
  // Below showing and hiding part is crap --> can do anything to improve?
  // or shorten... (1)
  if (products >= 0) {
    productsPrice = products * this.prices.product;
    this.resultRows[0].querySelector(".price--products").innerText =
      "$" + productsPrice;
    this.resultRows[0].querySelector(".math--products").innerText =
      products + "* $" + this.prices.product;
  }

  if (products >= 1) {
    this.resultRows[0].style.display = "flex";
  } else {
    this.resultRows[0].style.display = "none";
  }

  if (months >= 0) {
    monthsPrice = months * this.prices.month;
    this.resultRows[1].querySelector(".price--months").innerText =
      "$" + monthsPrice;
    this.resultRows[1].querySelector(".math--months").innerText =
      months + "* $" + this.prices.month;
  }

  if (months >= 1) {
    this.resultRows[1].style.display = "flex";
  } else {
    this.resultRows[1].style.display = "none";
  }

  // Updating selectionlist
  let SelectionListValue =
    this.inputFields.package.querySelector("p").innerText;

  if (
    SelectionListValue == "Basic" ||
    SelectionListValue == "Professional" ||
    SelectionListValue == "Premium"
  ) {
    this.resultRows[2].querySelector(".math--package").innerText =
      SelectionListValue;
  } else {
    this.resultRows[2].querySelector(".math--package").innerText = "";
  }

  // This is crap too (2)

  switch (SelectionListValue) {
    case "Basic":
      this.resultRows[2].style.display = "flex";
      this.resultRows[2].querySelector(".price--package").innerText =
        "$" + this.prices.packageBasic;
      currentPackage = this.prices.packageBasic;
      break;

    case "Professional":
      this.resultRows[2].style.display = "flex";
      this.resultRows[2].querySelector(".price--package").innerText =
        "$" + this.prices.packageProfessional;
      currentPackage = this.prices.packageProfessional;
      break;

    case "Premium":
      this.resultRows[2].style.display = "flex";
      this.resultRows[2].querySelector(".price--package").innerText =
        "$" + this.prices.packagePremium;
      currentPackage = this.prices.packagePremium;

      break;

    default:
      this.resultRows[2].querySelector(".price--package").innerText = "$0";
      currentPackage = 0;
  }

  //Checkboxes Rows Update
  if (this.accountingChecked == true) {
    accounting = this.prices.accounting;
  }

  if (this.terminalChecked == true) {
    terminal = this.prices.terminalRental;
  }

  //Updating totals
  this.totalRowValue =
    productsPrice + monthsPrice + currentPackage + accounting + terminal;
  this.totalRowValueLabel.innerText = "$" + this.totalRowValue;

  //Udpating total visibility
  if (this.validateTotalVisibility() > 0) {
    this.totalRowContainer.style.display = "flex";
  } else {
    this.totalRowContainer.style.display = "none";
  }
};

Calculator.prototype.valueValidation = function (e) {
  const value = e.currentTarget.value;
  if (value < 0 && value != "") {
    e.currentTarget.value = 0;
  }
};

Calculator.prototype.UpdateCheckboxes = function (e) {
  const checkbox = e.currentTarget;

  if (checkbox.checked == true && checkbox.id == "accounting") {
    this.accountingChecked = true;
    this.resultRows[3].querySelector(".values__price").innerText =
      "$" + this.prices.accounting;
    this.resultRows[3].style.display = "flex";
  } else if (checkbox.checked == false && checkbox.id == "accounting") {
    this.accountingChecked = false;
    this.resultRows[3].querySelector(".values__price").innerText = "$0";
    this.resultRows[3].style.display = "none";
  }

  if (checkbox.checked == true && checkbox.id == "terminal") {
    this.terminalChecked = true;
    this.resultRows[4].querySelector(".values__price").innerText =
      "$" + this.prices.terminalRental;
    this.resultRows[4].style.display = "flex";
  } else if (checkbox.checked == false && checkbox.id == "terminal") {
    this.terminalChecked = false;
    this.resultRows[4].querySelector(".values__price").innerText = "$0";
    this.resultRows[4].style.display = "none";
  }
};

Calculator.prototype.hideAllResults = function () {
  this.resultRows.forEach(function (element) {
    element.style.display = "none";
  });
  this.totalRowContainer.style.display = "none";
};

Calculator.prototype.validateTotalVisibility = function () {
  let visibleRowsCounter = 0;
  this.resultRows.forEach(function (element) {
    if (element.style.display == "flex") {
      visibleRowsCounter++;
    }
  });
  return visibleRowsCounter;
};

Calculator.prototype.addEventListeners = function () {
  // SELECT PACKAGE - OPEN/CLOSE THE LIST USING ORIGINAL ELEMENT
  const calculatorThis = this;

  this.inputFields.package.addEventListener("click", function () {
    if (calculatorThis.SelectionListOpened == false) {
      calculatorThis.OpenSelectionList();
      calculatorThis.SelectionListOpened = true;
    } else {
      calculatorThis.CloseSelectionList();
      calculatorThis.SelectionListOpened = false;
    }
  });

  this.SelectionListElements.forEach(function (listElement) {
    listElement.addEventListener("click", function () {
      calculatorThis.CloseSelectionList();
      calculatorThis.SelectionListOpened = false;
      let listElementValue = listElement.innerText;
      calculatorThis.inputFields.package.querySelector("p").innerText =
        listElementValue;
      calculatorThis.inputFields.package.querySelector("p").style.color =
        "black";

      calculatorThis.UpdateTotal();
    });
  });

  this.inputFields.productsQuantity.addEventListener("keyup", function (e) {
    calculatorThis.valueValidation(e);
    calculatorThis.UpdateTotal();
  });

  this.inputFields.productsQuantity.addEventListener("change", function (e) {
    calculatorThis.valueValidation(e);
    calculatorThis.UpdateTotal();
  });

  this.inputFields.estimatedMonths.addEventListener("keyup", function (e) {
    calculatorThis.valueValidation(e);
    calculatorThis.UpdateTotal();
  });

  this.inputFields.estimatedMonths.addEventListener("change", function (e) {
    calculatorThis.valueValidation(e);
    calculatorThis.UpdateTotal();
  });

  this.inputFields.accounting.addEventListener("change", function (e) {
    calculatorThis.UpdateCheckboxes(e);
    calculatorThis.UpdateTotal();
  });

  this.inputFields.terminalRental.addEventListener("change", function (e) {
    calculatorThis.UpdateCheckboxes(e);
    calculatorThis.UpdateTotal();
  });
};

document.addEventListener("DOMContentLoaded", function () {
  let rightParentElement = document.querySelector(
    ".calculator__columns .columns__right-column"
  );
  let leftParentElement = document.querySelector(".left-column__form");

  const priceCalculator = new Calculator(leftParentElement, rightParentElement);
  priceCalculator.hideAllResults();
});

// TO DO:
// Crap (1)
// Crap (2)
