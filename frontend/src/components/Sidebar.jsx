import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <NavLink to="/teacher" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg">
                    <p className='hidden md:block'>Giáo viên</p>
                </NavLink>
                <NavLink to="/position" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg">
                    <p className='hidden md:block'>Vị trí công tác</p>
                </NavLink>

            </div>
        </div>

    )
}

export default Sidebar
