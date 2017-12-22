const KEY = 'will0684';
const myslf = {fullname: 'Jordan Willis', email: 'jordan.walcaraz@gmail.com', phone: '613-796-6617'}
var contacts = [];

let app = {
    init: function(){
        if(localStorage.getItem(KEY)){
            app.updateList();
        }else{
            let str = JSON.stringify(myslf);
            localStorage.setItem(KEY, str);
            contacts.push(myslf);
            app.updateList();
        }
        document.querySelector('.fab').addEventListener('click', app.showForm);
        document.querySelector('#button-save').addEventListener('click', app.addContact);
        document.querySelector('#button-cancel').addEventListener('click', app.hideForm);
    },
    updateList: function(){
        let ul = document.querySelector('.contacts');
        ul.innerHTML = '';
        let df = new DocumentFragment();
        contacts.forEach((contact)=>{
            df.appendChild(app.createContact(contact));
        });
        ul.appendChild(df);
    },
    showForm: function(ev){
        ev.preventDefault();
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('.contactform').style.display = 'block';
    },
    hideForm: function(ev){
        ev.preventDefault();
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.contactform').style.display = 'none';
        document.querySelector('.contactform form').reset();
    },
    addContact: function(ev){
        ev.preventDefault();
        let fullname = document.getElementById('input-name').value.trim();
        let email = document.getElementById('input-email').value.trim();
        let phone = document.getElementById('input-phone').value.trim();
        if (fullname && email && phone){
            let container = {fullname, email, phone};
            console.log(contacts.push(container));
            localStorage.setItem(KEY, JSON.stringify(contacts));
            document.querySelector('.contactform form').reset();
            app.hideForm(ev);
            app.updateList();
        }
    },
    deleteContact: (ev)=>{
        ev.preventDefault();
        let email = ev.target.getAttribute('data-key');
        contacts = contacts.filter((contact)=>{
            return !(contact.email == email);
        });
        localStorage.setItem(KEY, contacts);
        app.updateList();
    },
    createContact: function(contact){
        let li = document.createElement('li');
        li.className = 'contact';
        let span = document.createElement('span');
        span.className = 'delete';
        span.setAttribute('data-key', contact.email);
        span.addEventListener('click', app.deleteContact);
        li.appendChild(span);
        let h3 = document.createElement('h3');
        h3.innerText = contact.fullname;
        li.appendChild(h3);
        let email = document.createElement('p');
        email.className = 'email'
        email.innerText = contact.email;
        li.appendChild(email);
        let num = document.createElement('p');
        num.className = 'phone';
        num.innerText = contact.phone;
        li.appendChild(num);
        return li;
    }
}   

document.addEventListener('DOMContentLoaded', app.init);