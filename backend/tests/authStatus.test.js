const request = require('supertest');
const bcrypt = require('bcrypt');
const { createApp } = require('../app.js');
const userModel = require('../models/userModel.js');

describe('Authentication status codes', () => {
  let app;

  beforeAll(() => {
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
  });

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('returns 401 when login user is missing', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'missing@example.com', password: 'password123' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ success: false, message: 'User does not exist' });
  });

  test('returns 401 when login password mismatch', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue({
      _id: 'user-id',
      password: 'hashed-password',
    });
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'user@example.com', password: 'wrong-password' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ success: false, message: 'Invalid credentials' });
  });

  test('returns 401 when registering an existing user', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue({
      _id: 'existing-id',
      email: 'user@example.com',
    });

    const response = await request(app)
      .post('/api/user/register')
      .send({
        name: 'Existing User',
        email: 'user@example.com',
        password: 'Password123',
      });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ success: false, message: 'User already exists' });
  });
});
