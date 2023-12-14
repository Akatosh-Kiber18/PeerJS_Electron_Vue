const script = document.createElement('script');
script.src = 'https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js';
document.head.appendChild(script);

script.onload = () => {
  const host = '127.0.0.1';
  const port = '9000';
  const path = '/myapp';

  const peer = new Peer({ host, port, path });

  peer.on('open', (id) => {
    console.log('My peer ID is: ' + id);
  });
  
  const button = document.getElementById('peerbtn');
  button.addEventListener('click', (event) => {
      connectToPeer(peer);
  });
};

script.onerror = () => {
  console.error('Failed to load PeerJS library');
};

function connectToPeer(peer) {
  const peerIdInput = document.getElementById('peerIdInput');
  const targetPeerId = peerIdInput.value;

  if (peer) {
    const connection = peer.connect(targetPeerId);

    connection.on('open', () => {
      console.log(`Connected to peer ${targetPeerId}`);
      connection.send('Hello from Electron!');
    });

    connection.on('data', (data) => {
      console.log(`Received data from peer ${targetPeerId}:`, data);
    });

    connection.on('close', () => {
      console.log(`Connection to peer ${targetPeerId} closed`);
    });
  } else {
    console.error('PeerJS object not initialized');
  }
}