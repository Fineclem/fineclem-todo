const display = document.getElementById("todoDisplay");
const form = document.getElementById("saveForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const list = document.getElementById("item").value.trim();
    const description = document.getElementById("description").value.trim();

    if(!list || !description){
        Swal.fire({
            icon: "warning",
            title: "Error",
            text: "All fields are required",
            timer: 3000,
            width: "350px",
            height: "350px"
        })
        return;
    } else{
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Item successfully added",
            showConfirmButton: true
        })
           const newItem = list.value;
           const newDescription = description.value;
        display.innerHTML += `
        <span>${newItem}</span>
        `
    }




})