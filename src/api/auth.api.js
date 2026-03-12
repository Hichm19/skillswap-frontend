import api from "./axios";

export const login = (data)=> {
    return api.post('/login', data);
};

export const register =(data) => {
    return api.post('/register', data);
};

export const me = () => {
  return api.get("/me");
};

export const logout = () => {
  return api.post("/logout")
}

export const getUser = () => {
  const user = localStorage.getItem('user')
  if (!user) return null;
  try {
    return JSON.parse(user)
  } catch (error) {
    return null
  }
}

export const islogged = () => {
  return !!localStorage.getItem('token')
}