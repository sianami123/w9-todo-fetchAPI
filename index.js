const userName = document.getElementById("name");
const userCity = document.getElementById("city");
const userSubmit = document.getElementById("submit");
const userList = document.getElementById("users");
const baseUrl = "http://api.alikooshesh.ir:3000";

async function addUser(name, city) {
  try {
    const response = await fetch(`${baseUrl}/api/records/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_key:
          "sia_eZWDa4hREfN9WPEF8vKk0HID5QGxt2zv5YfJNgrGW6UDuTwkRoQmZcZS1KHdLGpzh4bI7sJ4nKnksQ8S1AWjyAczX9ZdWGn7DKEfWvAVVQ9bIupaGVTD06yIneVN",
      },
      body: JSON.stringify({ name, city }),
    });
    console.log(response);
    await renderUsers();
  } catch (error) {
    console.log(error);
  }
}

async function getUsers() {
  try {
    const response = await fetch(`${baseUrl}/api/records/todo`, {
      method: "GET",
      headers: {
        api_key:
          "sia_eZWDa4hREfN9WPEF8vKk0HID5QGxt2zv5YfJNgrGW6UDuTwkRoQmZcZS1KHdLGpzh4bI7sJ4nKnksQ8S1AWjyAczX9ZdWGn7DKEfWvAVVQ9bIupaGVTD06yIneVN",
      },
    });
    console.log("response:", response);
    console.log("response.json():", await response.json());
    const data = await response.json();
    return data.records;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id) {
  try {
    const response = await fetch(`${baseUrl}/api/records/todo/${id}`, {
      method: "DELETE",
      headers: {
        api_key:
          "sia_eZWDa4hREfN9WPEF8vKk0HID5QGxt2zv5YfJNgrGW6UDuTwkRoQmZcZS1KHdLGpzh4bI7sJ4nKnksQ8S1AWjyAczX9ZdWGn7DKEfWvAVVQ9bIupaGVTD06yIneVN",
      },
    });
    console.log("delete response:", response);
    await renderUsers();
  } catch (error) {
    console.log("delete error:", error);
  }
}

async function renderUsers() {
  try {
    const users = await getUsers();
    if (!users) return;

    userList.innerHTML = "";
    users.forEach((user) => {
      userList.innerHTML += `<div>${user.name} from ${user.city}</div> <button onclick="deleteUser(${user.id})">Delete</button> <br>`;
    });
  } catch (error) {
    console.log("Error rendering users:", error);
  }
}

userSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  if (userName.value !== "" && userCity.value !== "") {
    addUser(userName.value, userCity.value);
  }
});

renderUsers();
