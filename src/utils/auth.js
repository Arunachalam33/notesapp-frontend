export function isAuthenticated() {
  // use the exact key you wrote to localStorage
  const token = localStorage.getItem("token");
  return Boolean(token && token.length > 10);
}