import { useOthers } from '@liveblocks/react/suspense'
import Image from 'next/image'
import React from 'react'

const ActiveCollaborators = () => {
    const others = useOthers()

    const collaborators = others.map((others) => others.info)
    return (
        <ul className='collaborators-;ost'>
            {collaborators.map(({ id, name, avatar, color }) => <li key={id}>
                <Image src={avatar} alt={name} width={100} height={100} className='inline-block size-8 rounded-t-full ring-2' style={{ border: `3px solid ${color}` }} />
            </li>)}
        </ul>
    )
}

export default ActiveCollaborators