let users = ["Nico", "Lynn", "Dal"];

export const addUser = (user) => users = [...users, user];

export const getUsers = () => users;

const deleteUser = (user) => users = users.filter(aUser => aUser !== user);