const form = document.getElementById("form1");
const tableBody = document.querySelector('table tbody');

const tableUpdate = (contacts) => {
    tableBody.innerHTML = "";

    const headerRow = document.createElement('tr');
    const lastNameHeader = document.createElement('th');
    lastNameHeader.textContent = 'Last Name';
    const firstNameHeader = document.createElement('th');
    firstNameHeader.textContent = 'First Name';
    const emailHeader = document.createElement('th');
    emailHeader.textContent = 'Email';
    const contactHeader = document.createElement('th');
    contactHeader.textContent = 'Contact #';

    headerRow.appendChild(lastNameHeader);
    headerRow.appendChild(firstNameHeader);
    headerRow.appendChild(emailHeader);
    headerRow.appendChild(contactHeader);

    tableBody.appendChild(headerRow);

    contacts.forEach((contact) => {
        const newRow = document.createElement('tr');
        const lastCell = document.createElement('td');
        const firstCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const contactCell = document.createElement('td');

        lastCell.textContent = contact.lastName; 
        firstCell.textContent = contact.firstName; 
        emailCell.textContent = contact.email;
        contactCell.textContent = contact.contact;

        newRow.appendChild(lastCell);
        newRow.appendChild(firstCell);
        newRow.appendChild(emailCell);
        newRow.appendChild(contactCell);

        tableBody.appendChild(newRow);
    });
};

const addContact = () => {
    const newLastName = prompt("Enter contact last name");
    const newFirstName = prompt("Enter contact first name");
    const newEmail = prompt("Enter contact email");
    let newContact = prompt("Enter contact number");
    newContact = Number(newContact);
    const emailMust = ["@gmail.com"];

    let containDomain = false;

    for(let domain of emailMust) {
        if(newEmail.indexOf(domain) !== -1) {
            containDomain = true;
            break;
        } else {
            break;
        }
    }

    if (
        newLastName !== null && newLastName !== '' &&
        newFirstName !== null && newFirstName !== '' &&
        newEmail !== null && newEmail !== '' 
        && Number.isInteger(newContact) && containDomain === true
    ) {

        const newContactObject = {
            last_name: newLastName,
            first_name: newFirstName,
            email: newEmail,
            contact_num: newContact,
        };

        $.ajax({
            url: 'add.php',
            method: 'POST',
            data: newContactObject,
            success: function(response) {
                if (response === 'successful connectionData entry successful') {
                    alert("Contact added to Database");
                    loadContacts();
                } else {
                    alert("Failed to add contact to the database");
                }
            },
        });
    } else {
        alert("INVALID INPUT, ONLY GMAIL IS ACCEPTED");
    }
};

const deleteContact = () => {
    const delCon = prompt("Enter lastname to delete");
    if(delCon != []) {
        const delObj = {
            delLast: delCon,
        };
        $.ajax({
            url: 'delete.php',
            method: 'POST',
            data: delObj,
            success: function(response) {
                console.log(response); //Whatever PHP echos it returns as the response
                if (response === 'Deleted successful') {
                    alert("Contact successfully deleted");
                    loadContacts();
                } else {
                    alert("Delete failed");
                }
            }
        });
    } else {
        alert("FIELD CANNOT BE EMPTY");
    }
};

const updateContact = () => {
    const updateCon = prompt("Enter lastname to update");
    let choice = prompt("What to update? 1-Lastname, 2-Firstname, 3-Email, 4-Contact");
    choice = Number(choice);
    let updateField;

    if(choice < 5 && choice > 0 && updateCon != []) {
        switch(choice) {
            case 1:
                updateField = prompt("Change lastname to?: ");
                break;
            case 2:
                updateField = prompt("Change firstname to?: ");
                break;
            case 3:
                updateField = prompt("Change emailname to?: ");
                break;
            case 4:
                updateField = prompt("Change contactname to?: ");
                break;

            default:
                alert("Invalid choice");
                return; // Exit the function if the choice is invalid
        }    
    } else {
            alert("Invalid input");
        }
        const updateObj = {
            updateLast: updateCon,
            updateChoice: choice,
            newUpdate: updateField,
        }
        $.ajax({
            url: 'update.php',
            method: 'POST',
            data: updateObj,
            success: function(response) {
                if(response === 'Update successful') {
                    alert(`${response}`);
                    loadContacts();
                } 
            }
        })
    };

const loadContacts = () => {
    $.ajax({
        url: 'load.php', 
        method: 'GET',
        dataType: 'json',
        success: function(contacts) {
            tableUpdate(contacts);
        },
    });
};

// Initial load of contacts
loadContacts();

form.addEventListener('submit', function(event) {
    addContact();
});
