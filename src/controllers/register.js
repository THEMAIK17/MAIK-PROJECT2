import { endpointUsers } from "../services/api"; // import users URL

export function settingsRegister() {
  const $form = document.getElementById("form-register"); // get register form

  const $registerName = document.getElementById("register-name"); // name input
  const $registerUser = document.getElementById("register-username"); // username input
  const $registerEmail = document.getElementById("register-email"); // email input
  const $registerPassword = document.getElementById("register-password"); // password input

  $form.addEventListener("submit", async function (event) {
    event.preventDefault(); // stop normal form action

    // 👉 check if email or username already exists
    const exists = await existUser($registerEmail, $registerUser);
    if (exists) return; // stop if exists

    const newUser = {
      name: $registerName.value,
      userName: $registerUser.value,
      email: $registerEmail.value,
      password: $registerPassword.value,
      rolId: 2 // role visitor
    };

    try {
      const response = await fetch(endpointUsers, {
        method: "POST", // send data
        headers: {
          "content-type": "application/json" // send as JSON
        },
        body: JSON.stringify(newUser) // convert object to string
      });

      if (response.status === 201) {
        alert("Usuario registrado correctamente"); // show success message
        const savedUser = await response.json(); // get user created
        localStorage.setItem("currentUser", JSON.stringify(savedUser)); // save user in storage
        history.pushState(null, null, "/dashboard"); // go to dashboard
        window.dispatchEvent(new Event("popstate")); // reload page
      } else {
        alert("Reintente más tarde"); // show error
        throw new Error("Error en la petición"); // throw error
      }
    } catch (error) {
      console.error(error.message); // show error
    }
  });
}

// ✅ function to check duplicate email and username
async function existUser($registerEmail, $registerUser) {
  const response = await fetch(endpointUsers); // get all users
  const users = await response.json(); // convert to JSON

  const emailExists = users.some(user => user.email === $registerEmail.value); // check email
  const userExists = users.some(user => user.userName === $registerUser.value); // check username

  if (emailExists) {
    alert("Email ya registrado"); // show message
    return true;
  } else if (userExists) {
    alert("Nombre de usuario ya existe"); // show message
    return true;
  }

  return false; // all good
}