const { shallowMount } = require('@vue/test-utils');
const axios = require('axios');
const Swal= require('sweetalert2'); 
import {login} from '../../pages/inicio-sesion.vue';
const InicioSesion= login;
/* const InicioSesion = require('../../pages/inicio-sesion.vue').default; */
jest.mock('axios');
jest.mock('sweetalert2');

describe('InicioSesion', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(InicioSesion);
  });

afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call the API and redirect to the correct path when login is successful', async () => {
    const mockData = {
      ok: true,
      message: 'Login successful',
      info: {
        type: 'User',
        token: 'token123',
      },
    };

    axios.post.mockResolvedValueOnce({ data: mockData });

    const routerPushSpy = jest.spyOn(wrapper.vm.$router, 'push');

    await wrapper.vm.login();

    expect(axios.post).toHaveBeenCalledWith(`${config.api_host}/auth`, {
      email: wrapper.vm.email,
      password: wrapper.vm.password,
    });

    expect(Swal.fire).toHaveBeenCalledWith('Welcome', mockData.message, 'success');

    expect(sessionStorage.setItem).toHaveBeenCalledWith('TOKEN', mockData.info.token);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('TYPE', mockData.info.type);

    expect(routerPushSpy).toHaveBeenCalledWith({ path: '/reservas' });
  });

  it('should display an error message when the API returns a 404 status', async () => {
    const mockError = {
      response: {
        status: 404,
        data: {
          message: 'API not found',
        },
      },
    };

    axios.post.mockRejectedValueOnce(mockError);

    await wrapper.vm.login();

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Oops...',
      text: mockError.response.data.message,
      icon: 'error',
    });
  });

  it('should display a generic error message when the API call fails', async () => {
    const mockError = new Error('Network error');

    axios.post.mockRejectedValueOnce(mockError);

    await wrapper.vm.login();

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error',
      text: 'Not found api',
      icon: 'error',
    });
  });
});