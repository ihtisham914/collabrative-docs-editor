import Image from 'next/image'
import React, { useState } from 'react'
import UserTypeSelector from './UserTypeSelector'
import { Button } from './ui/button'
import { removeCollaborator, updateDocumentAccess } from '@/lib/actions/room.actions'

const Collaborator = ({ roomId, collaborator, user, email, creatorId, currentUserType }: CollaboratorProps) => {
    const [userType, setUserType] = useState(collaborator.userType || 'viewer')
    const [loading, setLoading] = useState(false)

    const shareDocumentHandler = async (type: string) => {
        setLoading(true)

        await updateDocumentAccess({ roomId, email, userType: type as UserType, updatedBy: user })

        setLoading(false)
    }

    const removeCollaboratorHandler = async (email: string) => {
        setLoading(true)

        await removeCollaborator({ roomId, email })

        setLoading(false)
    }


    console.log(userType)

    return (
        <li className='flex items-center justify-between gap-2 py-3'>
            <div className='flex gap-2'>
                <Image src={collaborator.avatar} alt={collaborator.name} width={36} height={36} className='rounded-full size-9' />
                <div>
                    <p className='line-clamp-1 text-sm font-semibold leading-4 text-white'>
                        {collaborator.name}
                        <span
                            className='text-10-regular pl-2 text-blue-100'
                        >{loading && 'updating...'}</span>
                    </p>
                    <p className='text-sm font-light text-red-100'>{collaborator.email}</p>
                </div>
            </div>
            {creatorId === collaborator.id ? <p className='text-sm text-blue-100'>Owner</p> :
                <div className='flex items-center'>
                    {(currentUserType === 'editor' || currentUserType === 'creator') && <>
                        {email !== user.email &&
                            <UserTypeSelector
                                userType={userType as UserType}
                                setUserType={setUserType || 'viewer'}
                                onClickHandler={shareDocumentHandler}
                            />
                        }</>
                    }
                    <Button type='button' onClick={() => removeCollaboratorHandler(email)} >{email !== user.email ? 'Remove' : 'Leave'}</Button>
                </div>
            }
        </li>
    )
}

export default Collaborator