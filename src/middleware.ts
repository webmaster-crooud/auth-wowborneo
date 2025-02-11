import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const accessToken = request.cookies.get("refreshToken")?.value;

	// // Jika pengguna mencoba mengakses halaman yang dilindungi tanpa login
	// if (request.nextUrl.pathname.startsWith("/protected") && !accessToken) {
	// 	return NextResponse.redirect(new URL("/auth/login", request.url));
	// }

	// Jika pengguna sudah login, redirect dari halaman auth ke dashboard
	if (request.nextUrl.pathname.startsWith("/") && accessToken) {
		return NextResponse.redirect(new URL("https://titaniumprint.id", request.url));
	}

	return NextResponse.next();
}
