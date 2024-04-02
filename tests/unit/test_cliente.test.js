const { shallowMount } = require('@vue/test-utils');
const axios = require('axios');
import cliente from '../../pages/cliente.vue';
/* const cliente = require('../../pages/cliente.vue').default; */

jest.mock('axios');

describe('cliente', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(cliente);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call the API and set user data when token is valid', async () => {
    const mockToken = 'token123';
    const mockData = {
      ok: true,
      message: 'Token is valid',
      info: {
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
    };

    sessionStorage.setItem('TOKEN', mockToken);
    axios.post.mockResolvedValueOnce({ data: mockData });

    await wrapper.vm.info();

    expect(axios.post).toHaveBeenCalledWith(`${config.api_host}/verify`, { token: mockToken });

    expect(wrapper.vm.user).toEqual(mockData.info);
  });

  it('should throw an error when token is invalid', async () => {
    const mockToken = 'invalidToken';
    const mockData = {
      ok: false,
      message: 'Invalid token',
    };

    sessionStorage.setItem('TOKEN', mockToken);
    axios.post.mockResolvedValueOnce({ data: mockData });

    await expect(wrapper.vm.info()).rejects.toThrowError({ message: mockData.message });
  });

  it('should log the error when an exception occurs', async () => {
    const mockToken = 'token123';
    const mockError = new Error('Network error');

    sessionStorage.setItem('TOKEN', mockToken);
    axios.post.mockRejectedValueOnce(mockError);

    const consoleSpy = jest.spyOn(console, 'log');

    await wrapper.vm.info();

    expect(consoleSpy).toHaveBeenCalledWith(mockError);
  });
});