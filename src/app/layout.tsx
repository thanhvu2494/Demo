
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "CodeShare - Share Code Snippets",
    template: "%s | CodeShare"
  },
  description: "Share code snippets, get complexity estimates, and collaborate with developers worldwide",
  keywords: ["code snippets", "programming", "algorithms", "code sharing", "developer tools"],
  authors: [{ name: "CodeShare" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3b82f6",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
