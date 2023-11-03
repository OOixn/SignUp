const container = document.querySelector("#container");
const registerBtn = document.querySelector("#register");
const loginBtn = document.querySelector("#login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

const signUpForm = document.querySelector(".form-container.sign-up form");

// 로컬 스토리지에서 기존 사용자 정보를 가져옴, 기존 사용자 정보가 없으면 빈 배열을 기본값으로 사용
// parse - 필요한 데이터를 추출하는 함수
const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

function handleSignUp(event) {
  event.preventDefault(); // 폼 제출시 새로 고침 방지를 위함

  const nameInput = signUpForm.querySelector("#name");
  const emailInput = signUpForm.querySelector("#email");
  const passwordInput = signUpForm.querySelector("#password");

  // 새 사용자 정보를 객체로 저장
  const newUser = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  // 이미 가입된 사용자인지 확인
  const isUserExist = storedUsers.some((user) => user.email === newUser.email);
  const isUserName = storedUsers.some((user) => user.name === newUser.name);

  // 이메일 or 닉네임이 같을 경우 가입된 정보로 처리
  if (isUserExist || isUserName) {
    alert("이미 가입된 정보입니다.");
  } else {
    // 만약 가입된 정보가 아니라면 배열에 추가함
    storedUsers.push(newUser);

    // 로컬 스토리지에 업데이트된 사용자 목록을 저장
    // 로컬 스토리지에는 문자열로만 저장 가능함 stringify - 객체를 문자열로 변환해줌
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // 로컬 스토리지에 저장 후 입력 필드 초기화
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";

    alert("회원가입이 완료되었습니다.");
  }
}

// 회원가입 후 사용자 정보 제출시 로컬 스토리지에 저장하는 함수 실행
signUpForm.addEventListener("submit", handleSignUp);

// 로컬 스토리지에서 사용자 정보를 가져옴
const storedUser = JSON.parse(localStorage.getItem("user"));

const signInForm = document.querySelector(".form-container.sign-in form");

function handleSignIn(event) {
  event.preventDefault();

  const emailInput = signInForm.querySelector('input[placeholder="Email"]');
  const passwordInput = signInForm.querySelector('input[placeholder="Password"]');

  // 사용자가 입력한 이메일과 비밀번호
  const enteredEmail = emailInput.value;
  const enteredPassword = passwordInput.value;

  // 저장된 사용자 정보 중에서 입력한 이메일과 일치하는 사용자 찾기
  // find - 배열에서 조건을 만족하는 첫 번째 요소를 찾아서 리턴
  const matchingUser = storedUsers.find((user) => user.email === enteredEmail);

  console.log(matchingUser.password);

  if (matchingUser && enteredPassword === matchingUser.password) {
    console.log(matchingUser.password);
    alert("확인 되었습니다!");
    window.location.href = "https://aquamarine-pavlova-913963.netlify.app/";
  } else {
    alert("이메일 또는 비밀번호가 올바르지 않습니다.");
  }

  emailInput.value = "";
  passwordInput.value = "";

  console.log(enteredEmail);
  console.log(enteredPassword);
  console.log(matchingUser);
  console.log(localStorage.getItem("users"));
}

// 로그인시 이메일, 비밀번호 확인 하는 함수 실행
signInForm.addEventListener("submit", handleSignIn);

const changeBtn = document.querySelector("#mode-change");
const change = document.getElementsByClassName("change");

changeBtn.addEventListener("click", function () {
  changeBtn.classList.toggle("bi-moon");
  changeBtn.classList.toggle("bi-brightness-high-fill");

  for (let i = 0; i < change.length; i++) {
    change[i].classList.toggle("light");
  }
});
