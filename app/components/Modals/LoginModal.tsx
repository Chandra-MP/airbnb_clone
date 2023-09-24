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

import { signIn } from 'next-auth/react'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'

import Modal from './Modal'
import { error } from 'console'
import { useRouter } from 'next/navigation'




import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'


const LoginModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log("Inside onSubmit of Login");

        signIn('credentials', {
            ...data, 
            redirect: false, // No need to redirect anywhere
        }) 
        .then((callback) => {
            setIsLoading(false);
            console.log("in the .then function for signIn")

            if(callback?.ok){
                toast.success('Logged In');
                router.refresh();
                loginModal.onClose();
                console.log("Everything went great!");
            }

            if(callback?.error){
                toast.error(callback.error)  
                console.log("some shit happened!");   
            }
        })
    }

    const bodyContent = (
        <div className='
        flex 
        flex-col
        gap-4
        '>
            <Heading 
            title='Welcome back!'
            subtitle='Login to your Account' />

            <Input 
            id='email'
            label='Email'
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
            onClick = {() => signIn('github')}/>

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
                        New user? Create a free Account!
                    </div>
                    <div className='text-neutral-900
                    font-semibold
                    cursor-pointer
                    hover:underline' 
                    onClick={registerModal.onClose}>
                        Sign Up
                    </div>

                </div>
            </div>

        </div> 

    )


  return (

    <Modal disabled = {isLoading}
    isOpen = {loginModal.isOpen}
    title = "Login"
    actionLabel="Continue"
    // secondaryActionLabel='Do Not Continue'
    // secondaryAction={()=> {}}
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}  
    footer = {footerContent} 
    />
  )
}

export default LoginModal
