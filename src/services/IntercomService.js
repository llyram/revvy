import { RTCPeerConnection, RTCSessionDescription, mediaDevices } from 'react-native-webrtc';

class IntercomService {
  constructor() {
    this.peerConnections = new Map();
    this.localStream = null;
  }

  async initializeAudio() {
    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      this.localStream = stream;
      return stream;
    } catch (error) {
      console.error('Error accessing audio:', error);
      throw error;
    }
  }

  async createPeerConnection(remoteUserId, onIceCandidate) {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    };

    const peerConnection = new RTCPeerConnection(configuration);

    // Add local stream
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, this.localStream);
      });
    }

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        onIceCandidate(event.candidate);
      }
    };

    // Store the peer connection
    this.peerConnections.set(remoteUserId, peerConnection);
    return peerConnection;
  }

  async createOffer(remoteUserId) {
    const peerConnection = this.peerConnections.get(remoteUserId);
    if (!peerConnection) return null;

    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error('Error creating offer:', error);
      throw error;
    }
  }

  async handleAnswer(remoteUserId, answer) {
    const peerConnection = this.peerConnections.get(remoteUserId);
    if (!peerConnection) return;

    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error('Error handling answer:', error);
      throw error;
    }
  }

  cleanup() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    this.peerConnections.forEach(connection => {
      connection.close();
    });
    this.peerConnections.clear();
  }
}

export default new IntercomService();
