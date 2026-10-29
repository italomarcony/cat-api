import { fetchBreeds } from './catApi';

describe('fetchBreeds', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('explains how to fix a forbidden API response', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 403
    });
    jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(fetchBreeds()).rejects.toThrow('REACT_APP_CAT_API_KEY');
  });
});
