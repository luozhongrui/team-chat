import { 
    convexAuthNextjsMiddleware, 
    createRouteMatcher, 
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect 
} from "@convex-dev/auth/nextjs/server";
import { NextResponse } from 'next/server';

const isPublicPage = createRouteMatcher([
    /^\/auth.*/ // 匹配任何以 /auth 开头的 URL
]);

export default convexAuthNextjsMiddleware((request) => {
    // 检查用户是否已认证
    const isAuthenticated = isAuthenticatedNextjs();
    
    // 如果用户访问公共页面（如 /auth）且已登录，重定向到首页或redirect参数指向的页面
    if (isPublicPage(request) && isAuthenticated) {
        const url = new URL(request.url);
        const redirectUrl = url.searchParams.get('redirect');
        console.log('redirectUrl', redirectUrl);
        if (redirectUrl) {
            return nextjsMiddlewareRedirect(request, redirectUrl);
        }
        return nextjsMiddlewareRedirect(request, "/");
    }
    
    // 如果用户访问需要认证的页面但未登录，重定向到登录页面
    if (!isPublicPage(request) && !isAuthenticated) {
        const url = new URL(request.url);
        if (url.pathname.startsWith('/join/')) {
            const redirectUrl = `/auth?redirect=${url.pathname}${url.search}`;
            console.log('Redirecting to:', redirectUrl);
            return NextResponse.redirect(new URL(redirectUrl, request.url));
        }
        return nextjsMiddlewareRedirect(request, "/auth");
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};