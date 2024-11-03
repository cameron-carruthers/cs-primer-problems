const fs = require('node:fs');
const path = require('node:path');

const synflood = fs.readFileSync(path.resolve(__dirname, 'synflood.pcap'));

const perFileHeader = synflood.subarray(0, 24);

console.log({ perFileHeader });

const perPacketHeaders = [];
let packetStart = 24;
let remainingBytes = synflood.subarray(24);

let initiated = 0;
let acknowledged = 0;

while (remainingBytes.length > 0) {
  const untruncatedPacketLength = synflood.readUIntLE(packetStart + 12 , 4);

  // Ipv4
  const ipv4Length = ((synflood[packetStart + 20] & 0x0f) * 32) / 8;

  // TCP
  const sourcePort = synflood.readUIntBE(packetStart + 20 + ipv4Length, 2);
  const destinationPort = synflood.readUIntBE(packetStart + 22 + ipv4Length, 2);
  const flags = synflood.subarray(packetStart + 33 + ipv4Length, packetStart + 33 + ipv4Length + 1);

  const ackFlag = (flags[0] & 0x10) >> 4;
  const synFlag = (flags[0] & 0x02) >> 1;

  perPacketHeaders.push({
    untruncatedPacketLength,
    ipv4Length,
    sourcePort,
    destinationPort,
    ackFlag,
    synFlag
  })

  if (destinationPort == 80 && synFlag > 0) {
    initiated++;
  }
  if (sourcePort == 80 && ackFlag > 0) {
    acknowledged++;
  }

  packetStart += (16 + untruncatedPacketLength);
  remainingBytes = synflood.subarray(packetStart);
}

const percentage = Math.round(acknowledged / initiated * 100);

console.log({ perPacketHeaders });
console.log('Amount of packets: ', perPacketHeaders.length);
console.log(`Percentage acked: ${percentage}%`);
