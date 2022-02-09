// GETTING THE ANIMAL MODAL BY ID
var animalModal = document.getElementById("animalModal");
// GETTING THE SPAN THAT CLOSES THE MODAL BY THE CLASS NAME
var span = document.getElementsByClassName("close")[0];
// ANIMAL IMAGES THAT APPEAR INSIDE THE MODAL AFTER IT OPENS
var imageArray = ["Images/tiger2.jpg", "Images/giantpanda.jpg", "", "Images/asianelephant.jpg", "Images/gorilla2.jpg", "Images/snow_leopard1.jpg", "Images/orangutan4.jpg", "", "Images/blackrhino.jpg", "Images/african_penguin2.jpg", "Images/redpanda7.jpg", "Images/polarbear10.jpg"];
// CONSERVATION STATUS IMAGE THAT APPEARS INSIDE THE MODAL
var statusImage = ["Images/status.jpg", "Images/status-vu.jpg", "", "Images/status.jpg", "Images/status-cr.jpg", "Images/status-vu.jpg", "Images/status-cr.jpg", "", "Images/status-cr.jpg", "Images/status.jpg", "Images/status.jpg", "Images/status-vu.jpg"];


// .ANIMAL-BUTTON IS THE CARD OF EACH ANIMAL On MAIN PAGE
$(".animal-button").click(function () {
    animalModal.style.display = "block";

    fetch('endangered.json')
        .then(response => response.json())
        .then(data => {

            let animals = data.allSpecies;
            var animalIndex = parseInt(this.value)
            $("#animal-name").text(animals[animalIndex].name)
            $("#animal-image").attr("src", imageArray[animalIndex])
            $("#status-img").attr("src", statusImage[animalIndex])
            $("#science").html("<b>Scientific Name: </b>" + animals[animalIndex].scientific_name);
            $("#status").html("<b>Endangered Status: </b>" + animals[animalIndex].status);
            $("#population").html("<b>Population: </b>" + animals[animalIndex].population);
            $("#habitat").html("<b>Habitat: </b>" + animals[animalIndex].habitat);
            $("#location").html("<b>Area Found: </b>" + animals[animalIndex].location);
            $("#animal-desc").text(animals[animalIndex].description)
            switch (animalIndex) {
                case 0: tigerRender();
                    break;
                case 1: pandaRender();
                    break;
                case 3: elephantRender();
                    break;
                case 4: gorillaRender();
                    break;
                case 5: snowRender();
                    break;
                case 6: orangRender();
                    break;     
                case 8: rhinoRender();
                    break;
                case 9: pengRender();
                    break;
                case 10: redRender();
                    break;
                case 11: polarRender();
                    break;
                default:
                    break;
            }
        });
});

// WHEN THE USER CLICKS ON <SPAN> (X), IT WILL CLOSE THE MODAL
span.onclick = function () {
    animalModal.style.display = "none";
    $('#graph').empty();
};

// WHEN USER CLICK ON THE SUBMIT BUTTON, IT WILL HIDE THE SUBSCRIBE MODAL
$('#subBtn').on('click', function () {
    $('#sub-box').hide()
    
});

// THIS WILL ATTACH THE USERS NAME TO THE THANK YOU MODAL AFTER THEY FILL OUT THE SUBSCRIBE FORM
let subName = document.getElementById('sub-name')
$('#subBtn').on('click', function () {
    $('#thx-sub-msg').prepend(subName.value)
});

// WHEN USER CLICK ON THE SUBMIT BUTTON, IT WILL HIDE THE CONTACT US MODAL
$('#conBtn').on('click', function () {
    $('#contact-box').hide()
});

// THIS WILL ATTACH THE USERS NAME TO THE THANK YOU MODAL AFTER THEY FILL OUT THE CONTACT US FORM
let conName = document.getElementById('con-name')
$('#conBtn').on('click', function () {
    $('#thx-con-msg').prepend(conName.value)
});

// ONCE THE USER CLOSES THE THANK YOU MODAL, THE WEB PAGE WILL RELOAD TO PREVENT THE PAGE FROM NOT BEING ABLE TO SCROLL
function refreshClose() {
    document.getElementById('thx-sub-box').style.display='none'
    window.location.reload()
};

// ONCE THE USER CLOSES THE THANK YOU MODAL, THE WEB PAGE WILL RELOAD TO PREVENT THE PAGE FROM NOT BEING ABLE TO SCROLL
function refreshClose() {
    document.getElementById('thx-con-box').style.display='none'
    window.location.reload()
};