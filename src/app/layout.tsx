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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
