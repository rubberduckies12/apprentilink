import './style.css'

const LogoutButton = document.getElementById('LogoutButton') as HTMLButtonElement;
if (LogoutButton) {
  LogoutButton.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();

    // 1. Clear session data
    localStorage.clear(); 
    sessionStorage.clear();

    // 2. Redirect to login
    window.location.replace("/LoginPage.html"); 
    // .replace prevents 'Back' button access
  });
}


const RegisterButton = document.getElementById('RegisterButton') as HTMLInputElement;
if (RegisterButton) {
  RegisterButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "RegisterPage.html"
  });
}

const LoginButton = document.getElementById('LoginButton') as HTMLInputElement;
if (LoginButton) {
  LoginButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "LoginPage.html"
  });
}

// Check for Landing Button
const landingSubmitButton = document.getElementById('SubmitButton') as HTMLInputElement;
if (landingSubmitButton) {
  landingSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "LoginPage.html"
  });
}

const loginSubmitButton = document.getElementById('LoginSubmitButton') as HTMLInputElement;
if (loginSubmitButton) {
  loginSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    // 1. Grab the username input element
    const usernameInput = document.getElementById('Username') as HTMLInputElement;
    
    // 2. Get the actual text typed in (and maybe .trim() it to remove accidental spaces)
    const username = usernameInput.value.trim();

    // 3. Selection statement logic
    if (username === "student") {
      window.location.href = "PagesStudent/studentHome.html";
    } 
    else if (username === "company") {
      window.location.href = "PagesCompany/companyHome.html";
    } 
    else {
      alert("Invalid Username. Please enter 'user' or 'company'.");
    }
  });
}


