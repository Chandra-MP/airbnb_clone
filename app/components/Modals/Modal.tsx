'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../Button'

//In typeScript, first we define the type of the props that has to be passed
interface ModalProps {
    isOpen?: boolean;
    onClose(): () => void;
    onSubmit(): () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: ()=> void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {

    const [showModal, setShowModal] = useState(isOpen);

    useEffect(()=>{
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(()=>{
        if(disabled){
            return;
        }

        setShowModal(false);
        setTimeout(()=>{
            onClose();
        }, 300);

    }, [disabled, onClose]);

    const handleSubmit = useCallback(()=>{

        if(disabled) return;
        onSubmit();

    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(()=>{

        if(disabled || !secondaryAction) return;

        secondaryAction();

    }, [disabled, secondaryAction]);

    if(!isOpen){
        return null;
    }


  return (
        <>
        <div className='justify-center 
        items-center 
        flex 
        overflow-x-hidden 
        overflow-y-auto 
        fixed 
        inset-0 
        z-50 
        outline-none 
        focus:outline-none
        bg-neutral-800/70'>

            <div className='
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto'>
                
            {/* CONTENT */}
            {/* if showModal is True -  */}
            {/* 'translate-y-0' will be used as a CSS class. This class typically translates an element to its initial position, often used to bring an element back into view. */}
            {/* Similarily */}
            {/* if showModal is false -  */}
            {/* 'translate-y-full' will be used as a CSS class. This class typically translates an element to its full height, effectively moving it out of view, often used for hiding elements off the screen, creating a sliding-out effect. */}
            <div className={`
            translate 
            duration-300
            h-full 
            ${showModal ? 'translate-y-0' : 'translate-y-full '}
            ${showModal ? 'opacity-100' : 'opacity-0'}
            `}
            >
                <div className='
                translate 
                h-full
                lg:h-auto
                md:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none'>
                    
                
                {/* HEADER */}
                <div className='
                flex 
                items-center
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]'>
                    
                    <button className='
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute 
                    left-9' onClick={handleClose}>
                        <IoMdClose size = {18} />
                    </button>

                    <div className='
                    text-lg font-semibold'>
                        {title}
                    </div>
                </div>
                {/* BODY */}
                <div className='
                relative
                p-6
                flex-auto'>
                    {body}
                </div>
                {/* FOOTER */}
                <div className='
                flex flex-col gap-2 p-6'>
                    <div className='
                    flex 
                    flex-row
                    items-center
                    gap-4
                    w-full
                    footer'>


                    {secondaryAction && secondaryActionLabel && (
                    <Button 
                    outline
                    disabled={disabled}
                    label ={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    />
                    )}
                    
                    <Button 
                    disabled={disabled}
                    label ={actionLabel}
                    onClick={handleSubmit}
                    />

                    </div>

                {footer}
                </div>



                </div>
            </div>
            </div>
        </div>
        </>
  )
}

export default Modal
