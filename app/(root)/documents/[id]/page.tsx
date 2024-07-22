import React from 'react'
import CollabrativeRoom from '@/components/CollabrativeRoom'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getDocument } from '@/lib/actions/room.actions'

const Document = async ({ params: { id } }: SearchParamProps) => {
    const clerkUser = await currentUser()
    if (!clerkUser) redirect('/sign-in')

    const room = await getDocument({ roomId: id, userId: clerkUser.emailAddresses[0].emailAddress })

    if (!room) redirect('/')

    return (
        <main className="">
            <CollabrativeRoom roomId={id} roomMetadata={room.metadata} />
        </main>
    )
}

export default Document