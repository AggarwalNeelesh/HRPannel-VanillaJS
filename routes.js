const route = (event) =>{
    event = event || window.event; // Capture Click event of the link
    event.preventDefault();
    // This will update url on the browser
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}
const routes = {
    "/": "/index.html",
    "/login": "/login.html",
    "/register": "/register.html",
    "/search": "/search.html",
}
const handleLocation = async()=>{
    let path = window.location.pathname;
    console.log(path);
    if(path=="/search"){
        checking = sessionStorage.access;
        if(checking!="true"){
            path = "/";
            alert("Please Login/Register");
        }else{
            filter();
        }
    }else if(path=='/login'){
        if(sessionStorage.access=="true")path = "/search";
        else path = "/login";
    }
    else if(path=='/register'){
        if(sessionStorage.access=="true")path = "/search";
        else path = "/register";
    }
    const route = routes[path] || routes["/"];
    const html = await fetch(route).then((data)=>data.text());
    document.getElementById('main-page').innerHTML = html;
}

window.onpopstate = handleLocation;
// Give global access to our route function
window.route = route;
handleLocation();

function stringToHash(string) {
             
    var hash = 0;
     
    if (string.length == 0) return hash;
     
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
     
    return hash;
}

const register = async() =>{
    if(sessionStorage.access=="true"||sessionStorage.access==true){
        alert("User Already Logged in!");
        const route = routes["/search"];
        const html = await fetch(route).then((data)=>data.text());
        document.getElementById('main-page').innerHTML = html;
    }
    names = document.getElementById("Rname").value;
    email = document.getElementById("Remail").value;
    password = stringToHash(document.getElementById("Rpassword").value);
    sessionStorage.name = names;
    sessionStorage.email = email;
    sessionStorage.password = password;
    sessionStorage.access = false;
    alert("Registeration successfull! Please Login");
    const route = routes["/login"];
    const html = await fetch(route).then((data)=>data.text());
    document.getElementById('main-page').innerHTML = html;
}
const login = async() =>{
    email = document.getElementById("Lemail").value;
    password = stringToHash(document.getElementById("Lpassword").value);
    correctEmail = sessionStorage.email;
    correctPassword = sessionStorage.password;
    if(sessionStorage.access=="true"||sessionStorage.access==true){
        alert("User Already Logged in!");
        const route = routes["/search"];
        const html = await fetch(route).then((data)=>data.text());
        document.getElementById('main-page').innerHTML = html;
    }
    if(email!=correctEmail || password!=correctPassword){
        sessionStorage.access = false;
        alert("Incorrect Email/Password");
        const route = routes["/login"];
        const html = await fetch(route).then((data)=>data.text());
        document.getElementById('main-page').innerHTML = html;
    }
    else{ 
        sessionStorage.access = true;
        alert("Login Successfull");
        const route = routes["/search"];
        const html = await fetch(route).then((data)=>data.text());
        document.getElementById('main-page').innerHTML = html;
    }
}


var data = [
    {name:"John", profile:"Java Developer", location:"India", phone: "9898456735", email: "John@gmail.com"},
    {name:"Smith", profile:"PHP Developer", location:"India", phone: "6998456735", email: "Smith@gmail.com"},
    {name:"James", profile:"Java Developer", location:"Remote", phone: "7698456735", email: "James@gmail.com"},
    {name:"Maxx", profile:"Python Developer", location:"India", phone: "8098456735", email: "Maxx@gmail.com"},
    {name:"Luffy", profile:"Mern Developer", location:"Remote", phone: "998456735", email: "Luffy@gmail.com"},
    {name:"Zoro", profile:"PHP Developer", location:"Remote", phone: "9548456735", email: "Zoro@gmail.com"},
    {name:"Sanji", profile:"Mern Developer", location:"Remote", phone: "9498456735", email: "Sanji@gmail.com"},
    {name:"Charles", profile:"Java Developer", location:"India", phone: "8798456735", email: "Charles@gmail.com"},
    {name:"Kakashi", profile:"Python Developer", location:"Remote", phone: "8798456735", email: "Kakashi@gmail.com"},
]

const filter = ()=>{
    let element = document.getElementById("list");
    let filterLocation = document.getElementById('location').value;
    let filterProfile = document.getElementById('jobRole').value;
    filterData = data;
    if(filterProfile.length!=0)filterData = filterData.filter((candidate)=>{
        return candidate.profile==filterProfile;
        
    })
    if(filterLocation.length!=0)filterData = filterData.filter((candidate)=>{
        return candidate.location==filterLocation;
    })
    // console.log(filterData);
    let entry = `<table style="border: 1px solid black;"><tr><th>Name</th><th>Job Profile</th><th>Location</th>
        <th>Phone</th><th>Email</th></tr>`;
    filterData.forEach((candidate)=>{
        entry = entry + `<tr><td>${candidate.name}</td><td>${candidate.profile}</td><td>${candidate.location}</td><td>
        ${candidate.phone}</td><td>${candidate.email}</td></tr>`;
    })
    entry = entry + `</table>`;
    element.innerHTML = entry;
}

filter();