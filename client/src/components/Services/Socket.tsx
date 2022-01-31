import { io } from 'socket.io-client';
import { API_URL } from '../../config/index';
const Endpoint = API_URL;

const socket = io(Endpoint);
export default socket;
