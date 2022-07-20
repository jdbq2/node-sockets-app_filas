const lblEscritorio = document.querySelector("h1");
const btnAtender = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlerta = document.querySelector(".alert");
const lblPendientes = document.getElementById("lblPendientes");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
    window.location = "index.html";
    throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");
lblEscritorio.innerText = `Escritorio ${escritorio}`;
divAlerta.style.display = "none";

const socket = io();

socket.on("connect", () => {
    btnAtender.disabled = false;
});

socket.on("disconnect", () => {
    btnAtender.disabled = true;
});

socket.on("total-tickets", (payload) => {
    lblPendientes.innerText = payload;
});

btnAtender.addEventListener("click", () => {
    socket.emit("atender-ticket", { escritorio }, (payload) => {
        if (!payload.ok) {
            divAlerta.style.display = "";
            lblTicket.innerText = `Nadie que atender`;
        } else {
            divAlerta.style.display = "none";
            lblTicket.innerText = `Ticket: ${payload.ticket.numero}`;
        }
        lblPendientes.innerText = payload.total;
    });
});
