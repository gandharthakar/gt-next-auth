import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    let auth = request.cookies.get('is_auth_user')?.value;
    
    if(auth == 'undefined' || auth == undefined) {
        // console.log('cookie is not set.');
        // if(request.nextUrl.pathname !== '/admin/auth/login') {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        // }
    } else {
        //console.log('cookie is set');
    }
}

export const config = {
    matcher: ["/dashboard/:path*"]
}