"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
var app = (0, express_1.default)();
app.use(express_1.default.static(__dirname + '/../public'));
var PORT = process.env.PORT || 8899;
app.get('/teste', function (req, res) {
    var _a;
    var msg = ((_a = req.query.msg) === null || _a === void 0 ? void 0 : _a.toString()) || '';
    for (var _i = 0, clients_1 = clients; _i < clients_1.length; _i++) {
        var client = clients_1[_i];
        client.emit('msg', msg);
    }
    res.json({
        ok: true,
        msg: msg,
    });
});
var httpServer = http_1.default.createServer(app);
var io = (0, socket_io_1.default)(httpServer, {
    path: '/socket.io',
});
var clients = [];
io.on('connection', function (client) {
    client.on('join', function (params) {
        clients.push(client);
        console.log("Joined: ".concat(client.id, " ").concat(params));
    });
    client.on('disconnect', function () {
        clients.splice(clients.indexOf(client), 1);
        console.log("Disconnected: ".concat(client.id));
    });
});
httpServer.listen(PORT, function () {
    console.log('Server http started at ' + PORT);
});
