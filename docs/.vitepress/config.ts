import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/build-your-own-react-streaming-ssr/",
  title: "Build Your Own React Streaming SSR",
  description: "Build Your Own React Streaming SSR",
  head: [["link", { rel: "icon", href: "/build-your-own-react-streaming-ssr/favicon.svg" }]],
  locales: {
    root: { label: "한국어" }
  },
  themeConfig: {
    siteTitle: "Home",
    search: {
      provider: "local"
    },
    nav: [{ text: "학습하기", link: "/intro" }],
    sidebar: [
      {
        text: "가이드",
        items: [{ text: "소개", link: "/intro" }]
      }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/mugglim/build-your-own-react-streaming-ssr" }]
  }
});
