const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const readlineSync = require('readline-sync');


const serverUrl = 'http://localhost:1225';

async function main() {
  // Prompt the user to enter their name
  const name = readlineSync.prompt("Enter your name:");

  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();

  // Get the index of the name in the nice list
  const index = niceList.indexOf(name);

  // Make the request to the server, including the name as a body parameter
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    root,
    index,
  });

  console.log({ gift });
}

main();
