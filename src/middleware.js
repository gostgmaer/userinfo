import { NextResponse } from "next/server";
import { post } from "./lib/network/http";
import jwtDecode from "jwt-decode";
import { apiUrl } from "./utils/config";
import axios from "axios";
// import { getObjectFind } from "./lib/helper";

export async function middleware(request) {
  const allCookies = request.cookies.getAll();
  const url = request.nextUrl.clone();
  url.pathname = "/auth/login";

  // console.log(allCookies);
  const headerPayload = allCookies.find(
    (obj) => obj["name"] === "headerPayload"
  );
  const signature = allCookies.find((obj) => obj["name"] === "signature");

  if (headerPayload && signature) {
    const token = headerPayload.value + "." + signature.value;
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken);
    if (decodedToken["user_id"]) {
      console.log(decodedToken);
    } else {
      return NextResponse.redirect(url);
    }
  } else return NextResponse.redirect(url);

  // console.log(allCookies);
  // const response = NextResponse.next();

  // return response;
}

export const config = {
  matcher: "/profile",
};
