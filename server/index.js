const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '0f375892c33c3c630693ef103efe846d37c66d1d13050703538476caaeedc99f';
const merkleTree = new MerkleTree(niceList);

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  // TODO: prove that a name is in the list 
  // Check if the name is in the list
  const name = body.name;
  if (niceList.includes(name)) {
  // Prove that the name is in the list
    const index = niceList.indexOf(name);
    const proof = merkleTree.getProof(index);
    const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

    if (isInTheList) {
      res.send("You got a toy robot!");
    } else {
      res.send("You are not on the list :(");
    }
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });

