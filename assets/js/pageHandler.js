// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18

document.addEventListener('polymer-ready', function () {


    var urlList = {

        // Add navbar items here in the form of name: "what you see in the navbar", link: "The url of the page.", id: pageIdentifier"
        urls: [{
            id: 0,
            name: "Thuis",
            link: ""
        }, {
            id: 1,
            name: "Login",
            link: "login"
        }, {
            id: 2,
            name: "Contact",
            link: "contact"
        }
        ]
    };

    document.querySelector("#urlTemplate").model = urlList;


});

function navigate(name, id) {
    document.querySelector("#pageTitle").innerHTML = name;
    var p = document.querySelector('core-animated-pages');
    p.selected = id;

}