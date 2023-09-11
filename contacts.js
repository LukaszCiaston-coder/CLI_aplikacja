const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return [];
    }

    try {
      const contacts = JSON.parse(data);
      console.table(contacts);
      return contacts;
    } catch (error) {
      console.error(error);
      return [];
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return null;
    }

    try {
      const contacts = JSON.parse(data);
      const contact = contacts.find((c) => c.id === contactId);
      console.log(contact);
      return contact || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    try {
      const contacts = JSON.parse(data);
      const updatedContacts = contacts.filter((c) => c.id !== contactId);
      fs.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, null, 2),
        (err) => {
          if (err) {
            console.error(err);
          }
          console.log("Contact removed successfully.");
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    try {
      const contacts = JSON.parse(data);
      const newContact = {
        id: Date.now(),
        name,
        email,
        phone,
      };
      contacts.push(newContact);

      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
        if (err) {
          console.error(err);
        }
        console.log("Contact added successfully.");
      });
    } catch (error) {
      console.error(error);
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
