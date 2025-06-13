export function isAuthenticated() {
  // returns true if there's a non-empty token
  return Boolean(localStorage.getItem("token"));
}