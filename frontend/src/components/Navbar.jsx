import React from 'react'


const Navbar = () => {
    return (
        <div className='flex items-center py-2 justify-between px-[4%]'>
            <h1 className='font-semibold text-fuchsia-700 text-3xl'>School System</h1>
            <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-sm'>Admin</button>
        </div>
    )
}

export default Navbar
