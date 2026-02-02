import axios from './config'    

export default {
  list: (params) => {
    if (!params) {
      params = {};
    }
    return axios.get("auth", {
      params: {
        PageNumber: params.PageNumber,
        PageSize: params.PageSize,
        OrderByProperty: params.OrderByProperty,
        OrderByDesc: params.OrderByDesc,
      },
    });
  },
  register: (user) => {
    return axios.post("auth/register", user);
  },
  login: async (login) => {
    var response = await axios.post("auth/login", login);
    localStorage.setItem("user-token", response.data.message[0]);
    return response;
  },
  logout: () => { 
    localStorage.removeItem("user-token");
  },
  update: (user) => {
    return axios.put(`auth/${user.id}`, user);
  },
  delete: (user) => {
    return axios.delete(`auth/${user.id}`, { user });
  },
  getToken() {
    return localStorage.getItem("user-token");
  },
  isAuthenticated() {
    return !!localStorage.getItem("user-token");
  }
};