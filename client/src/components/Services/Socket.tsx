import { io } from 'socket.io-client';
import { API_URL } from '../../config/index';
const Endpoint = API_URL;

const socket = io(Endpoint, {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});
export default socket;
