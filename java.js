// ----------------------acounts------------------------
// ----------------------acounts------------------------
const acount1 = {
  owner: "melika rajabi",
  movement: [5700, 50, 80, 110],
  date: [
    "2021/12/05 , 15:54:12",
    "2021/12/05 , 15:54:12",
    "2021/12/05 , 15:54:12",
    "2021/12/05 , 15:54:12",
  ],
  InterestRate: 1.2,
  pin: 1111,
  local: "fa-ir",
};
const acount2 = {
  owner: "mahdi ebrahimi",
  movement: [6000, 3600, -150, -790, -3410, -1000, 8700, -30],
  InterestRate: 1.5,
  date: [
    "2022/12/05 , 15:54:12",
    "2022/12/05 , 15:54:12",
    "2022/12/05 , 15:54:12",
    "2022/12/05 , 15:54:12",
    "2022/12/05 , 15:54:12",
    "2022/12/05 , 15:54:12",
    "2022/12/05 , 15:54:12",
    "2022/12/05 , 15:54:12",
  ],
  pin: 2222,
  local: "fa-ir",
};
const acount3 = {
  owner: "hoda nahidi",
  movement: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  date: [
    "2023/12/05 , 15:54:12",
    "2023/12/05 , 15:54:12",
    "2023/12/05 , 15:54:12",
    "2023/12/05 , 15:54:12",
    "2023/12/05 , 15:54:12",
    "2023/12/05 , 15:54:12",
    "2023/12/05 , 15:54:12",
    "2023/12/05 , 15:54:12",
  ],
  InterestRate: 0.7,
  pin: 3333,
  local: "fa-ir",
};
const acount4 = {
  owner: "saman firoozi",
  movement: [-3130, -1500, 10500, -60],
  date: [
    "2024/12/05 , 15:54:12",
    "2024/12/05 , 15:54:12",
    "2024/12/05 , 15:54:12",
    "2024/12/05 , 15:54:12",
  ],
  InterestRate: 1,
  pin: 4444,
  local: "fa-ir",
};
const acounts = [acount1, acount2, acount3, acount4];

//----------select elements--------//
//header
const welcomMessage = document.getElementById("welcome");
const usernameInput = document.getElementById("username-input");
const passInput = document.getElementById("pass-input");
const loginBtn = document.getElementById("login-btn");
//main
const mainDiv = document.getElementById("main-div");
const sumery = document.getElementById("current-money");
const transferToInput = document.getElementById("transfer-to");
const transferAmountInput = document.getElementById("transfer-amount");
const transferbtn = document.getElementById("transfer-money-btn");
const requestAmount = document.getElementById("request-amount");
const requestBtn = document.getElementById("request-btn");
const leftGrid = document.getElementById("left-grid");
const displayIncome = document.getElementById("display-income");
const displayOutcome = document.getElementById("display-outcome");
const DeleteAcountBtn = document.getElementById("delete-acount-btn");
const inputConfirmUser = document.getElementById("confirm-user");
const inputConfirmPin = document.getElementById("confirm-pin");
const inputLoan = document.getElementById("request-amount");
const sort = document.getElementById("sort");
const btnLoan = document.getElementById("request-btn");
const dateCurrentMoney = document.getElementById("date-current-money");

//---------------date----------------//

const okDate = function (now) {
  let date = `${now.getDate()}`.padStart(2, 0);
  let month = `${now.getMonth()}`.padStart(2, 0);
  let year = now.getFullYear();
  let houre = `${now.getHours()}`.padStart(2, 0);
  let minutes = `${now.getMinutes()}`.padStart(2, 0);
  let second = `${now.getSeconds()}`.padStart(2, 0);

  return `${date}/${Number(month) + 1}/${year} , ${houre}:${minutes}:${second}`;
};

//---------------creat id for acounts--------------//
const creatId = function (name) {
  name.forEach(function (nam) {
    nam.id = nam.owner
      .toLowerCase()
      .split(" ")
      .map((nam) => nam[0])
      .join("");
  });
};

creatId(acounts);

//--------------login---------------//
let currentAcount;
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const login = function (account) {
    currentAcount = account.find((acc) => acc.id === usernameInput.value);
    if (currentAcount?.pin == passInput.value) {
      mainDiv.style.opacity = 100;
      welcomMessage.textContent = `welcome back ${
        currentAcount.owner.split(" ")[0]
      } (:`;
      callBacks(currentAcount);
      usernameInput.value = "";
      passInput.value = "";
    }
  };
  login(acounts);
});

//------------------add row dives and sorting-----------------//
const addRowDives = function (movement) {
  leftGrid.textContent = "";
  movement.forEach(function (mov, i) {
    const positeOrDeposite = mov > 0 ? "deposite" : "mines";
    const style = mov > 0 ? "green" : "red";
    const html = `
  <div id="row-div">
  <p class="${style}">${positeOrDeposite}</p>
  <p class="p2-row">${mov}$</p>
  <p class="date">${currentAcount.date[i]}</p>
  </div>
  `;
    leftGrid.insertAdjacentHTML("afterbegin", html);
  });
};

//---------------calc sumery---------------//
const calcSumery = function (acc) {
  const balance = acc.movement.reduce((ac, cur) => ac + cur, 0);
  acc.balance = balance;
  sumery.textContent = balance;
  const sumeryStyle = balance > 0 ? "green" : "red";
  sumery.classList.add(sumeryStyle);
  dateCurrentMoney.textContent = new Intl.DateTimeFormat(
    currentAcount.local,
    Option
  );
  dateCurrentMoney.textContent = okDate(new Date());
};

//--------------calc income---------------//
const calcIncome = function (account) {
  const income = account.movement
    .filter((acc) => acc > 0)
    .reduce((acc, cur) => acc + cur, 0);
  displayIncome.textContent = income;
};

//-------------calc outcome--------------//
const calcOutcome = function (account) {
  const outCome = account.movement
    .filter((acc) => acc < 0)
    .reduce((acc, cur) => acc + cur, 0);
  displayOutcome.textContent = outCome;
};
// ---------all call backs--------//
const callBacks = function (call) {
  /*call back sumery*/ calcSumery(call);
  /*call back add row dives*/ addRowDives(call.movement);
  /*call back income */ calcIncome(call);
  /*call back outcome*/ calcOutcome(call);
};

//---------------transfer money----------------//
transferbtn.addEventListener("click", function () {
  const amount = Number(transferAmountInput.value);
  const recieverAcount = acounts.find((acc) => acc.id == transferToInput.value);

  if (
    amount > 0 &&
    recieverAcount &&
    currentAcount.balance >= amount &&
    recieverAcount !== currentAcount
  ) {
    now = new Date();
    currentAcount.date.push(okDate(new Date()));
    recieverAcount.date.push(okDate(new Date()));
    recieverAcount.movement.push(amount);
    currentAcount.movement.push(-amount);
    callBacks(currentAcount);
  }
  transferToInput.value = "";
  transferAmountInput.value = "";
});

//---------------deleting acount---------------//
DeleteAcountBtn.addEventListener("click", function () {
  if (
    inputConfirmUser.value == currentAcount.id &&
    inputConfirmPin.value == currentAcount.pin
  ) {
    const index = acounts.findIndex((acc) => acc.id === inputConfirmUser.value);
    acounts.splice(index, 1);
    mainDiv.style.opacity = 0;
    welcomMessage.textContent = "Login to your acount";
    console.log(acounts);
  }
});
//-------------------loan----------------------//
btnLoan.addEventListener("click", function () {
  loanAmount = Number(inputLoan.value);
  if (
    loanAmount > 0 &&
    currentAcount.movement.some((mov) => mov >= loanAmount * 0.1)
  ) {
    currentAcount.date.push(okDate(new Date()));
    currentAcount.movement.push(loanAmount);
    callBacks(currentAcount);
  }
});
let allBankMovements = [];
