'use client';

import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar';
// import {FaAirbnb} from 'react-icons/fa'
import MenuItem from './MenuItem';
import { User } from '@prisma/client'

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react'
import { safeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';

interface UserMenuProps {
  currentUser?: safeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  //If user is not logged in and they click on "Airbnb your Home!" button, redirect them to login!
  const onRent = useCallback(()=>{
    if(!currentUser){
      //If we do not return the loginModal then it will execute the condition after the if statement
      return loginModal.onOpen();
    }
    //Open Rent modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal])




  return (
    <div className='relative user_menu'>
      <div className='flex flex-row i tems-center gap-3 toggle_menu'>
        <div className='airbnb_home 
        hidden 
        md:block 
        text-sm 
        font-semibold 
        py-3 px-4 
        rounded-full
         hover:bg-neutral-100 
         transition cursor-pointer' 
          onClick={onRent}>
          Airbnb Your Home!
        </div>
        <div onClick={toggleOpen} className="toggle_menu p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className='toggle_menu_avatar hidden md:block'>
            <Avatar src= {currentUser?.image }/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='menu_item_holder absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='menu_item flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => { }}
                  label='My trips'
                />
                <MenuItem
                  onClick={() => { }}
                  label='My Favourites'
                />
                <MenuItem
                  onClick={() => { }}
                  label='My reservations'
                />
                <MenuItem
                  onClick={() => { }}
                  label='My properties'
                />
                <MenuItem
                  onClick={onRent}
                  label='Airbnb my Home'
                />
                <hr />
                <MenuItem 
                 onClick={() => signOut()} 
                 label='Logout'
                 />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label='Login'
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label='Sign Up'
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu
