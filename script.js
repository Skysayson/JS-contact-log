    const form = document.getElementById("form1");
    const tableBody = document.querySelector('table tbody');

    //to break down json string into an object and assign to var
    //this of type objects
    let existingContacts = JSON.parse(localStorage.getItem('Contacts'));

    //if var is empty, meaning no existing contacts it becomes an empty array;
    if(existingContacts === null) {
        existingContacts = [];
    }

    //turn object into json string
    const saveLocally = (contacts) => {
        localStorage.setItem('Contacts', JSON.stringify(contacts));
    }

    //update body of table with existing contacts if any
    const tableUpdate = (contacts) => {
        contacts.forEach((contact) => {

            const newRow = document.createElement('tr');
            const lastCell = document.createElement('td');
            const firstCell = document.createElement('td');
            const emailCell = document.createElement('td');
            const contactCell = document.createElement('td');

            lastCell.textContent = contact.last_name;
            firstCell.textContent = contact.first_name;
            emailCell.textContent = contact.email;
            contactCell.textContent = contact.contact_num; // Corrected property name

            newRow.appendChild(lastCell);
            newRow.appendChild(firstCell);
            newRow.appendChild(emailCell);
            newRow.appendChild(contactCell);

            tableBody.appendChild(newRow);
        });
    };

const addContact = () => {
    //if addContact button is clicked do this function
    form.addEventListener('submit', function(event) {

        const newLastName = prompt("Enter contact last name");
        const newFirstName = prompt("Enter contact first name");
        const newEmail = prompt("Enter contact email");
        const newContact = prompt("Enter contact number");

        if(isNaN(newContact)) {
            window.alert("Contact # Invalid");
            return;
        } else if (newEmail.includes('@') === false ) {
            window.alert("Invalid email");
            return;
        }

        if (
            newLastName !== null && newLastName !== '' &&
            newFirstName !== null && newFirstName !== '' &&
            newEmail !== null && newEmail !== '' &&
            newContact !== null && newContact !== ''
        ) {
            const newContactObject = {
                last_name: newLastName,
                first_name: newFirstName,
                email: newEmail,
                contact_num: newContact,
            };
            //since existingContacts is now an empty array, we can now pushh ting inside
            
            existingContacts.push(newContactObject);

            saveLocally(existingContacts);

            tableUpdate(existingContacts);
             
        } else {
            event.preventDefault(); // Prevent form submission
            alert("Empty fields are NOT ALLOWED");
        }
    });
}

const deleteContact = () => {

    const askDel = prompt("Enter lastname of contact to DELETE");
    //findIndex function iterates until specific condition is met
    const indexRemove = existingContacts.findIndex(contact => contact.last_name === askDel);

    //Returns -1 in javascript if index containing element is not found
    if(indexRemove === -1) {
        alert("Contact does not exist");
    } else {
        if(indexRemove != -1 && confirm("Are you sure you want to delete this contact?")) {
            existingContacts.splice(indexRemove, 1)
            saveLocally(existingContacts);
            tableUpdate(existingContacts);
        }
    }
}

const updateContact = () => {

    if(existingContacts.length === 0) {
        alert("List is empty");
        return;
    }

    const askUpdate = prompt("Enter lastname of contact to UPDATE");

    const indexUpdate = existingContacts.findIndex(contact => contact.last_name === askUpdate);

    if(indexUpdate != -1 && confirm("Proceed with UPDATE?")) {
        const updateChoice = prompt("What would you like to update? Lastname - 1, Firstname - 2, Email - 3, Contact - 4");
        const choice = parseInt(updateChoice);
        switch(choice) {
            case 1:
                const updateLastName = prompt("Enter updated LASTNAME");
                existingContacts[indexUpdate].last_name = updateLastName;
            break;

            case 2:
                const updateFirstName= prompt("Enter updated FIRSTNAME");
                existingContacts[indexUpdate].first_name = updateFirstName;
            break;

            case 3:
                const updateEmail = prompt("Enter updated EMAIL");
                existingContacts[indexUpdate].email = updateEmail;
            break;

            case 4:
                const updateContact = prompt("Enter updated CONTACT");
                existingContacts[indexUpdate].contact_num = updateContact;
            break;

            default:
                alert("Invalid choice. Please enter a valid option (1-4).");
        }

    }else {
        alert("No input");
    }

    saveLocally(existingContacts);
    tableUpdate(existingContacts);

}

tableUpdate(existingContacts);

