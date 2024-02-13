const form=document.querySelector(".appointmentform");
const userObjects=[];
const outputSection=document.getElementById("output-section")
const outputList=document.getElementById("ulist");


form.addEventListener('submit', function(e){
    e.preventDefault();

    const userId = form.getAttribute('data-edit-user-id');

   
        createUserData();
    

    resetForm();
});


window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/04a6cbff685e44d98c11fe86c8cc0266/appointmentUser")
    .then((response)=>{
        console.log(response);
        for(var i=0;i<response.data.length;i++)
        {
            showUserDetails(response.data[i]);
        }
    }).catch((error)=>{
        console.log(error);
    })
})

function showUserDetails(userObject) {
    const outputList = document.getElementById("output-list");

    const userBlock = document.createElement('div');
    userBlock.classList.add('user-block');
    userBlock.setAttribute('data-user-id', userObject._id); // Add this line

    const userContent = document.createElement('p');
    userContent.innerHTML = ` <strong>UserID:</strong> ${userObject._id}<br>
                            <strong>Name:</strong> ${userObject.name}<br>
                            <strong>Email:</strong> ${userObject.email}<br>
                            <strong>Phone:</strong> ${userObject.phone}<br>
                            <strong>Date:</strong> ${userObject.date}`;

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-warning', 'mx-2');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        editUserData(userObject._id)
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        deleteUserData(userObject._id);
    });

    userBlock.appendChild(userContent);
    userBlock.appendChild(editButton);
    userBlock.appendChild(deleteButton);

    outputList.appendChild(userBlock);
}

function resetForm() {
    form.reset();
    form.removeAttribute('data-edit-user-id');
}

function createUserData() {
    const userObject = {
        name: document.getElementById("username").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value
    };

    axios.post("https://crudcrud.com/api/04a6cbff685e44d98c11fe86c8cc0266/appointmentUser", userObject)
        .then((response) => {
            showUserDetails(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function editUserData(userId) {
    const userObject = {
        name: document.getElementById("username").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value
    };

    axios.put(`https://crudcrud.com/api/04a6cbff685e44d98c11fe86c8cc0266/appointmentUser/${userId}`, userObject)
        .then(() => {
            const userBlock = document.querySelector(`[data-user-id="${userId}"]`);
            if (userBlock) {
                userBlock.remove();
            }
            showUserDetails(userObject);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteUserData(userId) {
    axios.delete(`https://crudcrud.com/api/04a6cbff685e44d98c11fe86c8cc0266/appointmentUser/${userId}`)
        .then(() => {
            const userBlock = document.querySelector(`[data-user-id="${userId}"]`);
            if (userBlock) {
                userBlock.remove();
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function editUser(userId) {
    const userObject = {
        name: document.getElementById("username").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value
    };

    axios.get(`https://crudcrud.com/api/04a6cbff685e44d98c11fe86c8cc0266/appointmentUser/${userId}`)
        .then((response) => {
            const userObject = response.data;
            // Populate the form fields with user details for editing
            document.getElementById("username").value = userObject.name;
            document.getElementById("email").value = userObject.email;
            document.getElementById("phone").value = userObject.phone;
            document.getElementById("date").value = userObject.date;

            // Set the user ID as an attribute to indicate editing
            form.setAttribute('data-edit-user-id', userId);
        })
        .catch((error) => {
            console.log(error);
        });
}


