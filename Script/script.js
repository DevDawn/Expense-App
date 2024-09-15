let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

// Budget Setting
totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    // Empty or negative input check
    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        // Set Budget
        amount.innerHTML = `₦${tempAmount}`;
        // Balance Calculation
        balanceValue.innerText = `₦${tempAmount - expenditureValue.innerText.replace('₦', '')}`;
        // Clear Input Box
        totalAmount.value = "";
    }
});

// Function to Disable Edit and Delete Buttons
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach(element => {
        element.disabled = bool;
    });
};

// Function to Modify List Element
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText.replace('₦', '');
    let currentExpense = expenditureValue.innerText.replace('₦', '');
    let parentAmount = parentDiv.querySelector(".amount").innerText.replace('₦', '');

    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }

    balanceValue.innerText = `₦${parseInt(currentBalance) + parseInt(parentAmount)}`;
    expenditureValue.innerText = `₦${parseInt(currentExpense) - parseInt(parentAmount)}`;
    parentDiv.remove();
};

// Function to create List
const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement('div');
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);

    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">₦${expenseValue}</p>`;

    // Create Edit Button
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });

    // Create Delete Button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });

    // Append buttons to the sublist content
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
};

// Function to Add Expenses
checkAmountButton.addEventListener("click", () => {
    // Empty check using if statement
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }
    // Remove error message if inputs are filled
    productTitleError.classList.add("hide");

    // Calculate Expense
    let expenditure = parseInt(userAmount.value);
    let sum = parseInt(expenditureValue.innerText.replace('₦', '')) + expenditure;
    expenditureValue.innerText = `₦${sum}`;

    // Update Balance
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = `₦${totalBalance}`;

    // Create the list item
    listCreator(productTitle.value, userAmount.value);

    // Clear Input Fields
    productTitle.value = "";
    userAmount.value = "";
});

// Enable Buttons after modification
disableButtons(false);
