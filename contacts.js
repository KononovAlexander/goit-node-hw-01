const fs = require('fs');
const path = require('path');

  // Раскомментируй и запиши значение
  const contactsPath = path.resolve('db/contacts.json') ;
  // console.log('contactsPath: ', contactsPath);


// TODO: задокументировать каждую функцию
function listContacts() {
      fs.readFile(contactsPath, 'utf8', (error,data) => {
        error ? console.log(error) : console.table(JSON.parse(data))

      })
  }
  
  function getContactById(contactId) {
    fs.readFile(contactsPath, 'utf8', (error,data) => {
      if(error) {
        console.log(error.message);
      }
      const contacts = JSON.parse(data);

      contacts.find(contact => {
           if (contact.id === contactId)
            { 
              console.log(contact)
            }
        }
      )
    })
    
  }
  
  function removeContact(contactId) {
     fs.readFile(contactsPath, 'utf8', (error,data) => {
      if(error) {
        console.log(error.message);
      }
      const contacts = JSON.parse(data);

      const  newContacts = contacts.filter((contact) => {
        return contact.id !== contactId.toString()
        
      })
      try{
        fs.writeFile(contactsPath, JSON.stringify(newContacts), (error) => {if(error)console.log(error);});

      }catch (error){
        console.log('error: ', error.message);

      }
    })
  
  }
  
  function addContact(name, email, phone) {
    fs.readFile(contactsPath, 'utf8', (error,data) => {
      if(error) {
        console.log(error.message);
      }

      const contacts = JSON.parse(data);

       const  addContact = {
         id: (contacts.length + 1).toString(),
          name,
          email,
          phone
        };

        contacts.push(addContact)
        try{
          fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {if(error)console.log(error);});
  
        }catch (error){
          console.log('error: ', error.message);
  
        }

  })
}

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }