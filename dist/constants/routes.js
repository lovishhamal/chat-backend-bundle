"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
exports.routes = {
    users: {
        auth: {
            login: "/user/login",
            register: "/user/register",
        },
        connection: {
            findFriends: "/user/findFriends/:id",
        },
    },
    connection: {
        findFriends: "/user/findFriends/:id",
        getAllConnection: "/users/connection/:id",
        setConnection: "/user/connection",
        setGroupConnection: "/user/groupConnection",
    },
    messages: {
        create: "/message/create",
        find: "/message/find",
    },
};
//# sourceMappingURL=routes.js.map