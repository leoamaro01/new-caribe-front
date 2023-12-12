import type {Metadata} from 'next'
import './globals.css'
import React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const metadata: Metadata = {
  title: 'Juegos Caribe UH',
  description: 'Sitio de los Juegos Caribe de la Universidad de la Habana'
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
    {children}
    </body>
    </html>
  )
}
