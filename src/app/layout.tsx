import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yield Curve"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html style={{ height: '100%' }} lang="en">
      <body style={{ height: '100%' }}>{children}</body>
    </html>
  );
}
