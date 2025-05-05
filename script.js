document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expense")) || [];
    let totalAmount = calculateTotal();

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if(amount !== "" && !isNaN(amount) && amount>0){
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            };
            expenses.push(newExpense);
            saveExpenses();
            renderExpenses();
            updateTotal();

            //clears input
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        }
    })

    function calculateTotal(){
        return expenses.reduce((sum, expense) => sum + expense.amount, 0)
    }

    function updateTotal(){
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    function saveExpenses(){
        localStorage.setItem("expense", JSON.stringify(expenses))
    }
})