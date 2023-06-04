// Fonction pour créer une fenêtre
function createWindow() {
    chrome.windows.create({
        type: 'popup',
        url: 'index.html',
        width: 1400,
        height: 1000
    }).then(windowInfo => {
        console.log("Fenêtre créée avec l'ID :", windowInfo.id);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Sélectionnez les boutons par leur ID
    const generateBTN = document.getElementById("generateBTN");
    const moreButton = document.getElementById("moreButton");

    // Ajoutez les gestionnaires d'événements aux boutons
    generateBTN.addEventListener("click", generatePassword);

    // Ajouter un gestionnaire d'événement au clic sur le bouton "More"
    moreButton.addEventListener("click", function () {
        const url = "https://gen-mdp.netlify.app/"; // Remplacez cette URL par celle que vous souhaitez ouvrir
        chrome.tabs.create({ url: url });
    });
});

function generatePassword() {
    const regex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&;|_~&%§*"-`+=]()).{8,}$/;
    const characters =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#?!@$%^&;|_~&%§*"-`+=';

    let password = "";
    while (!regex.test(password)) {
        password = "";
        const randomLength = Math.floor(Math.random() * 8) + 8; // Random length between 8 and 15
        for (let i = 0; i < randomLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
    }
    document.getElementById("genMDP").value = password;
    console.log(password);
}