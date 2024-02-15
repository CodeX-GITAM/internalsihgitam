import Cookies from "js-cookie";

export default function AuthContext(): boolean {
  if (Cookies.get("token")) {
    return true;
  }
  return false;
}
