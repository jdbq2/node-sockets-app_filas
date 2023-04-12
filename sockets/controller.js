const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    console.log("Cliente Conectado", socket.id);

    socket.on("disconnect", () => {
        console.log("Cliente Desconectado", socket.id);
    });

    socket.emit("ultimo-ticket", ticketControl.ultimo);
    socket.emit("estado-actual", ticketControl.ultimos4);
    socket.emit("total-tickets", ticketControl.tickets.length);

    socket.on("siguiente-ticket", (payload, callback) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        socket.broadcast.emit("ultimo-ticket", ticketControl.ultimo);
        socket.broadcast.emit("total-tickets", ticketControl.tickets.length);
    });

    socket.on("atender-ticket", (payload, callback) => {
        if (!payload) {
            return callback({
                ok: false,
                msg: "El escritorio es obligatorio",
            });
        }

        const ticket = ticketControl.atenderTicket(payload);

        if (!ticket) {
            return callback({
                ok: false,
                msg: "No hay tickets pendientes",
            });
        }

        callback({
            ok: true,
            ticket,
            total: ticketControl.tickets.length,
        });

        socket.broadcast.emit("estado-actual", ticketControl.ultimos4);
        socket.broadcast.emit("total-tickets", ticketControl.tickets.length);
    });
};

module.exports = {
    socketController,
};
