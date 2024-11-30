import { 
    convexAuthNextjsMiddleware, 
    createRouteMatcher, 
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);
 
export default convexAuthNextjsMiddleware((request) => {
    // 检查用户是否已认证
    const isAuthenticated = isAuthenticatedNextjs();
    
    // 如果用户访问公共页面（如 /auth）且已登录，重定向到首页
    if (isPublicPage(request) && isAuthenticated) {
        return nextjsMiddlewareRedirect(request, "/");
    }
    
    // 如果用户访问需要认证的页面但未登录，重定向到登录页面
    if (!isPublicPage(request) && !isAuthenticated) {
        return nextjsMiddlewareRedirect(request, "/auth");
    }
});
 
export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};