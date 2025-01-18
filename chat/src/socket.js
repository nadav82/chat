import io from 'socket.io-client';

// Create the socket instance and export it for use in other components
export const socket = io('http://localhost:5000');


// import io from 'socket.io-client';
// import { userService } from './user.service.local';

// export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg';
// export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg';
// export const SOCKET_EMIT_SET_TOPIC = 'chat-set-topic';
// export const SOCKET_EMIT_USER_IS_TYPING = 'set-user-is-typing';
// export const SOCKET_EVENT_USER_IS_TYPING = 'user-is-typing';

// export const SOCKET_EVENT_EDIT_MSG = 'chat-edit-msg';
// export const SOCKET_EMIT_EDIT_MSG = 'chat-emit-edit-msg';

// export const SOCKET_EMIT_REMOVE_MSG = 'chat-remove-msg';
// export const SOCKET_EMIT_NEW_MSG = 'chat-new-msg';
// export const SOCKET_EVENT_REMOVE_MSG = 'chat-msg-removed';

// export const SOCKET_EVENT_GROUP_MSG = 'group-chat-add-msg';
// export const SOCKET_EMIT_GROUP_MSG = 'group-chat-send-msg';
// export const SOCKET_EVENT_GROUP_MSG_REMOVE = 'group-chat-remove-msg';
// export const SOCKET_EMIT_GROUP_MSG_REMOVE = 'group-chat-emit-remove-msg';
// export const SOCKET_EMIT_JOIN_GROUP = 'join-group-chat';
// export const SOCKET_EMIT_LEAVE_GROUP = 'leave-group-chat';
// export const SOCKET_EVENT_USER_TYPING_GROUP = 'user-typing-group';
// export const SOCKET_EMIT_USER_TYPING_GROUP = 'set-user-typing-group';

// export const SOCKET_EMIT_USER_WATCH = 'user-watch';
// export const SOCKET_EVENT_USER_UPDATED = 'user-updated';

// export const SOCKET_EVENT_ORDER_FOR_YOU = 'order-for-you';
// export const SOCKET_EVENT_ORDER_UPDATED = 'order-status-update';
// export const SOCKET_EVENT_NEW_MESSAGE = 'new-order-notification';

// const SOCKET_EMIT_LOGIN = 'set-user-socket';
// const SOCKET_EMIT_LOGOUT = 'unset-user-socket';
// // const socket = io.connect('http://localhost:5000')
// const baseUrl = 'http://localhost:5000';
// export const socketService = createSocketService();

// window.socketService = socketService;
// socketService.setup();

// function createSocketService() {
//   var socket = null;
//   const socketService = {
//     setup() {
//       socket = io.connect(baseUrl);
//       setTimeout(() => {
//         const user = userService.getLoggedinUser();
//         if (user) this.login(user._id);
//       }, 500);
//     },
//     on(eventName, cb) {
//       socket.on(eventName, (data) => {
//         console.log(`Received event: ${eventName}`, data); // Add this line
//         cb(data);
//       });
//     },
//     off(eventName, cb = null) {
//       if (!socket) return;
//       if (!cb) socket.removeAllListeners(eventName);
//       else socket.off(eventName, cb);
//     },
//     emit(eventName, data) {
//       socket.emit(eventName, data);
//     },
//     login(userId) {
//       socket.emit(SOCKET_EMIT_LOGIN, userId);
//     },
//     logout() {
//       socket.emit(SOCKET_EMIT_LOGOUT);
//     },
//     terminate() {
//       socket = null;
//     },
//   };
//   return socketService;
// }