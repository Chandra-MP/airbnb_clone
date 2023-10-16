'use client'

import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'

//This @prisma/client was generated when we pushed our Schema to the data base by using, npx prismadb push
//So User model is present in the @prisma/client and hence we can use it as a Type
import { User } from '@prisma/client'

//Similarily, we can use any model that was in the Database schema (or defined in prismadb file at airbnb_app/prisma/schema.prisma)

import { safeUser } from '@/app/types'

interface NavbarProps {
  currentUser?: safeUser | null
}

const navbar: React.FC<NavbarProps> = ({
  currentUser
}) =>  {

  //This will get the currently logged in User
  console.log( {currentUser} )
  return (
    <div className='fixed w-full bg-white z-19 shadow-sm'>
      <div className='py-4 border-b-[1px]'> 
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo /> 
            <Search />
            <UserMenu currentUser = {currentUser}/>
          </div>
        </Container>
      </div>
      <Categories />

    </div>
  )
}

export default navbar