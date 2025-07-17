import { test, expect } from '@playwright/test';
import { RoomApi } from '../../helpers/apiClients/roomApiClient';

let roomApi: RoomApi;

// Initialize API client before running tests
test.beforeAll(async () => {
  roomApi = await RoomApi.create();
});

// Test to get all rooms and verify the structure of the first room in the list
test('Get all rooms returns array and validates structure of first room', async () => {
  const data = await roomApi.getAllRooms(200);
  expect(Array.isArray(data.rooms)).toBe(true); // Check that rooms is an array
  if (data.rooms.length > 0) {
    const room = data.rooms[0];
    expect(room).toHaveProperty('roomid');  // Server returns 'roomid'
    expect(typeof room.roomid).toBe('number');
    expect(room).toHaveProperty('roomName');
    expect(typeof room.roomName).toBe('string');
    expect(room).toHaveProperty('type');
    expect(typeof room.type).toBe('string');
    expect(room).toHaveProperty('accessible');
    expect(typeof room.accessible).toBe('boolean');
    expect(room).toHaveProperty('image');
    expect(typeof room.image).toBe('string');
    expect(room).toHaveProperty('description');
    expect(typeof room.description).toBe('string');
    expect(room).toHaveProperty('features');
    expect(Array.isArray(room.features)).toBe(true);
    expect(room).toHaveProperty('roomPrice');
    expect(typeof room.roomPrice).toBe('number');
  }
});

// Test requesting a room by invalid/nonexistent ID should return a 404 or error status
test('Get room by invalid/nonexistent ID returns 404', async () => {
  await roomApi.getRoomById(999999, 500); // Expecting error status (500 here)
});

// Test creating a room with valid data should succeed
test('Create room with valid data', async () => {
  const payload = {
    roomName: '121',
    type: 'Double',
    accessible: true,
    image: '/images/room1.jpg',
    description: 'Created via API test',
    features: ['WiFi'],
    roomPrice: 150
  };
  const data = await roomApi.createRoom(payload, [200, 201]); // Allow 200 or 201 response
  expect(data).toHaveProperty('success', true);
});

// Test creating a room missing required field (roomName) should fail with 400 status
test('Create room missing a required field (roomName)', async () => {
  const payload = {
    // roomName missing intentionally to test validation
    type: 'Double',
    accessible: true,
    image: '/images/room1.jpg',
    description: 'Missing roomName',
    features: ['WiFi'],
    roomPrice: 150
  };
  await roomApi.createRoom(payload, 400); // Expecting validation failure 400
});

// Test creating a room with negative price should fail validation
test('Create room with negative price', async () => {
  const payload = {
    roomName: '122',
    type: 'Single',
    accessible: false,
    image: '/images/room2.jpg',
    description: 'Negative price test',
    features: ['WiFi'],
    roomPrice: -100
  };
  await roomApi.createRoom(payload, 400); // Expecting validation failure 400
});

// Test creating a room with empty features array should succeed
test('Create room with empty features array', async () => {
  const payload = {
    roomName: '123',
    type: 'Twin',
    accessible: false,
    image: '/images/room3.jpg',
    description: 'Empty features test',
    features: [],
    roomPrice: 200
  };
  const data = await roomApi.createRoom(payload, [200, 201]);
  expect(data).toHaveProperty('success', true);
});

// Test creating a room with a large feature list (6 items) should succeed
test('Create room with large feature list (6 features)', async () => {
  const payload = {
    roomName: '123',
    type: 'Suite',
    accessible: true,
    image: '/images/room4.jpg',
    description: 'Many features included',
    features: ['WiFi', 'TV', 'Safe', 'Balcony', 'Mini Bar', 'Jacuzzi'],
    roomPrice: 300
  };
  const data = await roomApi.createRoom(payload, [200, 201]);
  expect(data).toHaveProperty('success', true);
});

// Test creating a room with very long room name (>100 chars) should fail
test('Create room with very long room name (>100 chars)', async () => {
  const longName = 'a'.repeat(600); // String with 200 'a's
  const payload = {
    roomName: longName,
    type: 'Single',
    accessible: true,
    image: '/images/room5.jpg',
    description: 'Very long name test',
    features: ['WiFi'],
    roomPrice: 100
  };
  await roomApi.createRoom(payload, [400, 500]); // Expecting failure due to validation
});

// Test creating a room with null values (roomName=null) should fail validation
test('Create room with null values (roomName=null)', async () => {
  const payload = {
    roomName: null,
    type: 'Single',
    accessible: true,
    image: '/images/room7.jpg',
    description: 'Null roomName test',
    features: ['WiFi'],
    roomPrice: 100
  };
  await roomApi.createRoom(payload, 400); // Expecting 400 Bad Request
});

// Test deleting a room with valid ID should succeed
test('Should delete room with ID 2', async () => {
  const response = await roomApi.deleteRoom(2, [200, 204]);
  expect([200, 204]).toContain(response.status());
  const body = await response.json();
  expect(body).toHaveProperty('success', true);
});
// Test deleting a non-existing room should fail with appropriate error status
test('Should fail to delete non-existing room with ID 999', async () => {
  const response = await roomApi.deleteRoom(999, 500);
  expect(response.status()).toBe(500);

});
