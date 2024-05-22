import { Component } from '@angular/core';
import { Contact } from '../model/contact.model';
import { FormsModule } from '@angular/forms'; 



@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {

  contacts: Contact[] = [];
  newContact: Contact = new Contact(0, '', '');
  selectedContact: Contact | null = null;
  isModalOpen: boolean = false;

  constructor() {}

  openContactModal(contact?: Contact) {
    this.selectedContact = contact ? { ...contact } : null;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedContact = null;
  }

  saveContact() {
    if (this.newContact.name && this.newContact.phoneNumber) {
      if (this.selectedContact) {
        const index = this.contacts.findIndex(c => c.id === this.selectedContact!.id);
        if (index !== -1) {
          this.contacts[index] = { ...this.newContact };
        }
      } else {
        this.contacts.push({ ...this.newContact });
      }
      this.newContact = new Contact(0, '', '');
      this.isModalOpen = false;
      this.selectedContact = null;
    }
  }

  editContact(contact: Contact) {
    this.selectedContact = contact;
    this.newContact = { ...contact };
    this.isModalOpen = true;
  }

  deleteAllContacts() {
    this.contacts = [];
  }
}
