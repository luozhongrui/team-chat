import { 
    convexAuthNextjsMiddleware, 
    createRouteMatcher, 
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";
import { request } from "http";
import { is } from '../.next/server/vendor-chunks/next';

const isPublicPage = createRouteMatcher(["/auth"]);
 
export default convexAuthNextjsMiddleware((request) => {
    if (!isPublicPage(request) && !isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, "/auth");
    }
    if (isPublicPage(request) && isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, "/");
    }
    // TODO: Redirect uer away from "signin" page if authenticated

});
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};