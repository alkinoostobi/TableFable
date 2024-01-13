/*import io from 'socket.io-client';

const socket = io('http://localhost:8080');

// Connect to the server
socket.on('connect', () => {
    console.log('Connected to server');
});

// Send combat initiatives and combat logs
import {combatStore} from "stores/combat";
socket.emit('combatInitiatives', combatStore.initiatives);
socket.emit('combatLogs', combat.logs);

// Send player names from tokenInfo.js
import {useTokenStore} from "stores/tokenInfo";
socket.emit('playerNames', useTokenStore.playerNames);

// Add a character to the initiative board
socket.on('addCharacter', (character) => {
    combat.initiatives.push(character);
    socket.emit('combatInitiatives', combat.initiatives);
});

// Remove a character from the initiative board
socket.on('removeCharacter', (character) => {
    const index = combat.initiatives.findIndex((c) => c.name === character.name);
    if (index !== -1) {
        combat.initiatives.splice(index, 1);
        socket.emit('combatInitiatives', combat.initiatives);
    }
});

export default socket;*/


// socket.js
import io from 'socket.io-client';

const socket = io('http://139.91.81.103:8080');

socket.on('connect', () => {
    console.log('Connected to server');
});
export default socket;
