import { NextResponse, NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import {
  defaultLocale,
  languages,
  cookieName,
  headerName,
} from "./app/i18n/settings";

// 常量定义
const PUBLIC_FILE_REGEX = /\.(.*)$/;
const EXCLUDED_PATHS = ["/api", "/_next", "/assets", "/favicon.ico"];

// 初始化配置
acceptLanguage.languages(languages);

// 中间件配置
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

// 工具函数模块
const i18nUtils = {
  // 判断是否需要跳过处理
  shouldSkipProcessing: (req: NextRequest): boolean => {
    const pathname = req.nextUrl.pathname;
    return (
      EXCLUDED_PATHS.some((path) => pathname.startsWith(path)) ||
      PUBLIC_FILE_REGEX.test(pathname) ||
      pathname.includes("icon") ||
      pathname.includes("chrome")
    );
  },

  // 获取首选语言
  getPreferredLanguage: (req: NextRequest): string => {
    const cookieValue = req.cookies.get(cookieName)?.value;
    return (
      acceptLanguage.get(cookieValue) ||
      acceptLanguage.get(req.headers.get("Accept-Language")) ||
      defaultLocale
    );
  },

  // 处理路径语言信息
  processPathLanguage: (url: URL, lng: string) => {
    const pathLng = languages.find((loc) => url.pathname.startsWith(`/${loc}`));
    const headers = new Headers();
    headers.set(headerName, pathLng || lng);

    return {
      headers,
      hasPathLanguage: !!pathLng,
      shouldRedirect: !pathLng && !url.pathname.startsWith("/_next"),
    };
  },

  // 处理引用页语言
  processRefererLanguage: (req: NextRequest) => {
    if (!req.headers.has("referer")) return null;

    const refererUrl = new URL(req.headers.get("referer")!);
    return languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
  },
};

// 主中间件逻辑
export function middleware(req: NextRequest) {
  if (i18nUtils.shouldSkipProcessing(req)) {
    return NextResponse.next();
  }

  // 语言决策流程
  const preferredLng = i18nUtils.getPreferredLanguage(req);

  const { pathname, search } = req.nextUrl;

  // 路径语言处理
  const pathLanguageResult = i18nUtils.processPathLanguage(
    req.nextUrl,
    preferredLng
  );
  if (pathLanguageResult.shouldRedirect) {
    return NextResponse.redirect(
      new URL(`/${preferredLng}${pathname}${search}`, req.url)
    );
  }

  // 响应处理
  const response = NextResponse.next({ headers: pathLanguageResult.headers });

  // 引用页语言处理
  const refererLng = i18nUtils.processRefererLanguage(req);

  if (refererLng) {
    response.cookies.set(cookieName, refererLng);
  }

  return response;
}
