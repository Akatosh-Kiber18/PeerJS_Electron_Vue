<template>
  <div id="app">
    <h1>Hello from Vue!</h1>

    <label for="peerIdInput">Enter Peer ID:</label>
    <input v-model="targetPeerId" type="text" id="peerIdInput" />
    <button @click="connectToPeer">Connect</button>
    <button @click="checkPeer">Check peer</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      peer: null,
      targetPeerId: '',
    };
  },
  methods: {
    checkPeer() {
    console.log(this.peer);
    },
    createPeer() {
      
      const host = '127.0.0.1';
      const port = '9000';
      const path = '/myapp';

      this.peer = new Peer({host, port, path});

      this.peer.on('open', (id) => {
        console.log('PeerID: ' + id);
      });

      this.peer.on('error', (err) => {
        console.error(err);
      });

      // Handle connection opened
      this.peer.on('open', () => {
        console.log('PeerJS connection opened');
      });
    },
    connectToPeer() {
      if (this.peer) {
        // Establish connection
        const connection = this.peer.connect(this.targetPeerId);

        // Log events (for demonstration purposes)
        connection.on('open', () => {
          console.log(`Connected to peer ${this.targetPeerId}`);
          // Send a test message
          connection.send('Hello from Vue!');
        });

        connection.on('data', (data) => {
          console.log(`Received data from peer ${this.targetPeerId}:`, data);
        });

        connection.on('close', () => {
          console.log(`Connection to peer ${this.targetPeerId} closed`);
        });
      } else {
        console.error('PeerJS object not initialized');
      }
    },
  },
  created() {
    this.createPeer();
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}

button {
  margin-top: 10px;
  cursor: pointer;
}
</style>