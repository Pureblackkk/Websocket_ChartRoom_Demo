class Socket {
    static instance = null;

    static getInstance() {
        if(!Socket.instance) {
            Socket.instance = new Socket();
        }
        return Socket.instance;
    }

    constructor() {
        this.socket = null;
    }

    initial(address, keep=false) {
        this.socket = new WebSocket(address);
        this.socket.onopen = () => {
            console.log('Websocket open');
        }
        this.socket.onerror = () => {
            console.log('Connection failed');
            keep && this.initial() && this.addRecCallback();
        }
        this.socket.onmessage = (response) => {
            console.log('Recieve Message:', response);
        }
        this.socket.onclose = () => {
            console.log('Connection Close');
        }
    }

    addRecCallback(callBack) {
        this.socket.onmessage = (response) => {
            callBack(response);
        }
    }

    getSocketState() {
        return this.socket.readyState;
    }

    close() {
        this.socket.close();
    }
}

const SocketInstance = Socket.getInstance();

export default SocketInstance;