import { request, APIRequestContext, expect } from '@playwright/test';

export class RoomApi {
  private api: APIRequestContext;

  private constructor(api: APIRequestContext) {
    this.api = api;
  }

  static async create(token = 'oaO5QbnAHObvyl9E'): Promise<RoomApi> {
    const context = await request.newContext({
      baseURL: 'https://automationintesting.online',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        // Token passed as a parameter to easily allow switching to a different or empty token
        'Cookie': `token=MVmKsPsNDsWO5OUN`,
      },
    });
    return new RoomApi(context);
  }

  async getAllRooms(expectedStatus = 200) {
    const res = await this.api.get('/api/room');
    expect(res.status()).toBe(expectedStatus);
    return res.json();
  }

  async getRoomById(id: number, expectedStatus = 200) {
    const res = await this.api.get(`/api/room/${id}`);
    expect(res.status()).toBe(expectedStatus);
    return res.json();
  }

  async createRoom(data: any, expectedStatus: number | number[] = [200, 201]) {
    const res = await this.api.post('/api/room', {
      data, // Important: use `data` instead of `body` when sending JSON
    });

    if (Array.isArray(expectedStatus)) {
      expect(expectedStatus).toContain(res.status());
    } else {
      expect(res.status()).toBe(expectedStatus);
    }

    return res.json();
  }

  async deleteRoom(id: number, expectedStatus: number | number[] = [200, 204]) {
    const res = await this.api.delete(`/api/room/${id}`);
    if (Array.isArray(expectedStatus)) {
      expect(expectedStatus).toContain(res.status());
    } else {
      expect(res.status()).toBe(expectedStatus);
    }
    return res;
  }
}
