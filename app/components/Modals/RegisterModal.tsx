'use client'


import React from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'


import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import { error } from 'console'
import { signIn } from 'next-auth/react'
import LoginModal from './LoginModal'
import useLoginModal from '@/app/hooks/useLoginModal'

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const toggleModals = useCallback(()=>{
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error 404! Not Found!");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContent = (
        <div className='
        flex 
        flex-col
        gap-4
        '>
            <Heading 
            title='Welcome to Airbnb!'
            subtitle='Create an Account!' />

            <Input 
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors = {errors}
            required
            />
            
            <Input 
            id='name'
            label='Name'
            disabled={isLoading}
            register={register}
            errors = {errors}
            required
            />
            
            <Input 
            id='password'
            label='****'
            disabled={isLoading}
            register={register}
            errors = {errors}
            type='password'
            required
            />


        </div>
    )

    const footerContent = (
        <div className='
        flex
        flex-col
        gap-4
        mt-3'>
            <hr /> 
            <Button 
            outline
            label = "Continue with Google"
            icon = {FcGoogle}
            onClick = {() => signIn('google')}/>
            <Button 
            outline
            label = "Continue with GitHub"
            icon = {AiFillGithub}
            onClick = {() => signIn('github')}
            />

            <div className='
            text-neutral-500
            text-center 
            mt-4
            font-light'>

                <div className='
                flex
                flex-row
                items-center
                gap-2
                justify-center
                '>
                    <div>
                        Already have an Account?
                    </div>
                    <div className='text-neutral-900
                    font-semibold
                    cursor-pointer
                    hover:underline' 
                    onClick={toggleModals}>
                        Log In
                    </div>

                </div>
            </div>

        </div> 

    )


  return (

    <Modal disabled = {isLoading}
    isOpen = {registerModal.isOpen}
    title = "Register"
    actionLabel="Continue"
    // secondaryActionLabel='Do Not Continue'
    // secondaryAction={()=> {}}
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}  
    footer = {footerContent} 
    />
  )
}

export default RegisterModal
