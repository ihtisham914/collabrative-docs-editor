import { useSelf } from '@liveblocks/react/suspense'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import Image from 'next/image'
import { Label } from './ui/label'
import { Input } from './ui/input'
import UserTypeSelector from './UserTypeSelector'
import Collaborator from './Collaborator'
import { updateDocumentAccess } from '@/lib/actions/room.actions'



const ShareModal = ({ roomId, collaborators, creatorId, currentUserType }: ShareDocumentDialogProps) => {
    const user = useSelf()
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState<UserType>("viewer")

    const shareDocumentHandler = async () => {
        setLoading(true)

        await updateDocumentAccess({ roomId, email, userType: userType as UserType, updatedBy: user.info })

        setLoading(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <Button className='gradient-blue flex h-9 gap-1 px-4' disabled={currentUserType !== 'editor'}>
                    <Image src='/assets/icons/share.svg' alt='share' width={24} height={20} className='min-w-4 md:size-4' />
                    <p className='mr-1 hidden sm:block'>
                        Share
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent className='shad-dialog'>
                <DialogHeader>
                    <DialogTitle>
                        {currentUserType === 'editor' ? 'Manage who can view this project' : 'Users collabrating on this project'}
                    </DialogTitle>
                    <DialogDescription>
                        {currentUserType === 'editor' ? 'Select which users can view and edit this document' : 'View only'}

                    </DialogDescription>
                </DialogHeader>
                {currentUserType === 'editor' &&
                    <>
                        <Label htmlFor='email' className='mt-6 text-blue-100'>Email address</Label>
                        <div className='flex items-center gap-3'>
                            <div className="flex flex-1 rounded-md bg-dark-400">
                                <Input
                                    id='email'
                                    placeholder='Ente email address'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='share-input'
                                />
                                <UserTypeSelector
                                    userType={userType}
                                    setUserType={setUserType}
                                />
                            </div>
                            <Button
                                type='submit'
                                onClick={() => shareDocumentHandler()}
                                className='gradient-blue flex h-full px-5'
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Invite'}
                            </Button>
                        </div></>
                }
                <div className='my-2 space-x-2'>
                    <ul className='flex flex-col'>
                        {collaborators.map((collaborator) => (
                            <Collaborator
                                key={collaborator.id}
                                roomId={roomId}
                                email={collaborator.email}
                                creatorId={creatorId}
                                collaborator={collaborator}
                                user={user.info}
                                currentUserType={currentUserType}
                            />
                        ))}
                    </ul>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ShareModal