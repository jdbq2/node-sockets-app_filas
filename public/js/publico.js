const clblTicket1 = document.getElementById("lblTicket1");
const lblEscritorio1 = document.getElementById("lblEscritorio1");
const lblTicket2 = document.getElementById("lblTicket2");
const lblEscritorio2 = document.getElementById("lblEscritorio2");
const lblTicket3 = document.getElementById("lblTicket3");
const lblEscritorio3 = document.getElementById("lblEscritorio3");
const lblTicket4 = document.getElementById("lblTicket4");
const lblEscritorio4 = document.getElementById("lblEscritorio4");

const socket = io();

socket.on("estado-actual", (payload) => {
    const [ticket1, ticket2, ticket3, ticket4] = payload;

    if (ticket1) {
        clblTicket1.innerText = "Ticket: " + ticket1.numero;
        lblEscritorio1.innerText =
            "Escritorio: " + ticket1.escritorio.escritorio;
    }
    if (ticket2) {
        lblTicket2.innerText = "Ticket: " + ticket2.numero;
        lblEscritorio2.innerText =
            "Escritorio: " + ticket2.escritorio.escritorio;
    }
    if (ticket3) {
        lblTicket3.innerText = "Ticket: " + ticket3.numero;
        lblEscritorio3.innerText =
            "Escritorio: " + ticket3.escritorio.escritorio;
    }
    if (ticket4) {
        lblTicket4.innerText = "Ticket: " + ticket4.numero;
        lblEscritorio4.innerText =
            "Escritorio: " + ticket4.escritorio.escritorio;
    }
});
