/*import io from 'socket.io-client';

const socket = io('http://139.91.81.121:8080');

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
import {dmtools} from "stores/dmtools";
import {combatStore} from "stores/combat";
import {useTokenStore} from "stores/tokenInfo";
import {pxTranslate} from "stores/px2feet";
const socket = io('http://139.91.81.121:8080');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('loadscene', (scene) => {
  dmtools().setscene(scene.map, '', '', '',)
  console.log('grid size is ' + scene.gridsize  + 'px')
  pxTranslate().setpxPerFoot(scene.gridsize)
});

socket.on('rolldie', (id) => {
  console.log('rolling d20');
  combatStore().addToGrouproll(id, 'Skill');
  combatStore().rollMyDice(1, 20, 0, 0)
});
socket.on('loadnpc', (npcID) => {
  const char = useTokenStore().getTokenIcon(npcID, 'npcs');
  console.log(char);
});
socket.on('exploremode', () => {
  console.log('exploration time')
  combatStore().combatBool = false;
});
socket.on('pausegame', () => {
  console.log("pausing game");
  combatStore().pauseCombat();
});
socket.on('combatmode', () => {
  console.log('heaven or hell bitches');
  combatStore().combatStart('Perception');
});
socket.emit('givemeTokens');
socket.on('insertTokens', (tokens) => {
  console.log('wtfffff')
  useTokenStore().insertTokens(tokens);
});
socket.on('updateTableToken', (token, tokencat) => {
  useTokenStore().setToken(token.id, tokencat, token);
} );
socket.on('updateTokensTable', (token) => {
  console.log('updateTokensTable', token)
  useTokenStore().tokens.npcs[token.id] = token;
});
export default socket;
