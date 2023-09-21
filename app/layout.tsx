//layout.tsx is by default a server component

import './globals.css'
import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/Modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/Modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'

const font = Nunito({ subsets: ['latin'] }); 

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Onestop travel companion',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  //Fetch the current user from app/actions/getCurrentUser
  const currentUser = await getCurrentUser();


  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          {/* Pass the currentUser to the Navbar */}
          <Navbar currentUser = {currentUser}/>

        </ClientOnly>
          {children}
        </body>
    </html>
  )
}
