import socketIOClient from 'socket.io-client'

const server = 'http://127.0.0.1:4000'
// const server = 'http://192.168.0.13:4000'
const SocketIO = socketIOClient(server)

export default SocketIO
