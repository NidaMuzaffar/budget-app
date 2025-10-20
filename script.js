const errorMesgEl = document.querySelector('.error_message');
const budgetInputEl = document.querySelector('.budget_input');
const expenseDesEl = document.querySelector('.expenses_input');
const expenseAmountEl = document.querySelector('.expenses_amount');
const tableRecordEl = document.querySelector('.table_data');
const cardsContainer = document.querySelector('.cards');

// cards content
const budgetCardEl = document.querySelector('.budget_card');
const expenseCardEl = document.querySelector('.expenses_card');
const balanceCardEl = document.querySelector('.balance_card');

let itmeList = [];
let itemId = 0;


//======================================    button events   ==========================================//

function btnEvents() {
    const btnBudgetCal = document.querySelector('#btn_budget')
    const btnExpensesCal = document.querySelector('#btn_expenses');


    // budget events //
    btnBudgetCal.addEventListener('click', (e) => {
        e.preventDefault();
        budgetFun();
    });

    btnExpensesCal.addEventListener('click', (e) => {
        e.preventDefault();
        expensesFun();
    });

}

// ================================== Calling Btns Event ======================================//

document.addEventListener('DOMContentLoaded', btnEvents);

//================================== Expenses Function ====================================//
function expensesFun() {
    let expensesDescValue = expenseDesEl.value;
    let expenseAmountValue = expenseAmountEl.value;

    if (
        expensesDescValue === "" ||
        expenseAmountValue == "" ||
        budgetInputEl < 0) {
        errorMessage("Please Enter Expenses Desc or Expense Amout!")
    }
    else {
        let amount = parseInt(expenseAmountValue);

        expenseAmountEl.value = "";
        expenseDesEl.value = "";



        // Store the value inside the object
        let expenses = {
            id: itemId,
            title: expensesDescValue,
            amount: amount,
        };

        itemId++;
        itmeList.push(expenses);

        // add expenses inside the html page
        addExpenses(expenses);
        showBalance();
    }
}

//=================================== Add Expenses ======================================//
function addExpenses(expensesPara) {
    const html = ` <ul class="table_tr_content">
                    <li data-id =${expensesPara.id}>${expensesPara.id}</li>
                    <li>${expensesPara.title}</li>
                    <li><span>$</span>${expensesPara.amount}</li>
                    <li>
                        <button type="button" class="btn_edit">Edit</button>
                        <button type="button" class="btn_delete">Delete</button>
                    </li>
                </ul>`;

    tableRecordEl.insertAdjacentHTML("beforeend", html);

    //============================== Edit =========================================//
    const btnEdit = document.querySelectorAll('.btn_edit');
    const btnDel = document.querySelectorAll('.btn_delete');
    const content_id = document.querySelectorAll('.table_tr_content')

    // btn edit event
    btnEdit.forEach((btnedit) => {
        btnedit.addEventListener('click', (el) => {
            let id;

            content_id.forEach((ids) => {
                id = ids.firstElementChild.dataset.id;
            });

            let element = el.target.parentElement.parentElement;
            element.remove();


            let expenses = itmeList.filter(function (item) {
                return item.id == id;
            });

            expenseDesEl.value = expenses[0].title;
            expenseAmountEl.value = expenses[0].amount;

            let temp_list = itmeList.filter(function (item) {
                return item.id != id;
            });

            itmeList = temp_list;
        });
    });

    //============================== btn delete ======================================//
    btnDel.forEach((btndel) => {
        btndel.addEventListener('click', (el) => {
            let id;

            content_id.forEach((ids) => {
                id = ids.firstElementChild.dataset.id;
            });

            let element = el.target.parentElement.parentElement;
            element.remove();


            let temp_list = itmeList.filter(function (item) {
                return item.id != id;
            });

            itmeList = temp_list;
            showBalance();
        });
    });

}


//=================================== Budget Function ====================================//
function budgetFun() {
    const budgetValue = budgetInputEl.value;

    if (budgetValue == "" || budgetValue < 0) {
        errorMessage("Please Enter Your Budget or More Than 0")
    }
    else {
        budgetCardEl.textContent = budgetValue;
        budgetInputEl.value = "";
        showBalance();
    }
}

//================================= Show Balance ============================================//
function showBalance() {
    const expenses = totalExpenses();
    const total = parseInt(budgetCardEl.textContent) - expenses;
    balanceCardEl.textContent = total;
}

//=============================== Total Expenses ======================================//
function totalExpenses() {
    let total = 0;

    if (itmeList.length > 0) {
        total = itmeList.reduce(function (acc, curr) {
            acc += curr.amount;
            return acc;
        }, 0);
    }

    expenseCardEl.textContent = total;

    return total;
}

//=============================== Error Message Function ======================================//
function errorMessage(message) {
    errorMesgEl.innerHTML = `<p>${message}</p>`;
    errorMesgEl.classList.add('error');
    setTimeout(() => {
        errorMesgEl.classList.remove('error');
    }, 2500);
}