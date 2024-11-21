import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Position = () => {

    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [des, setDes] = useState("")
    const [isActive, setActive] = useState(true)


    const fetchPositions = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:4000/positions/list-positions", {})
            if (response.data.success) {
                setPositions(response.data.positions)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const data = { name, code, des, isActive };
            const response = await axios.post("http://localhost:4000/positions/add-position", data, {
                withCredentials: true,

            })
            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setCode('')
                setDes('')
                setVisible(false)
            } else {
                console.log(error.message)
                toast.error(error.message)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    console.log(isActive)

    useEffect(() => {
        fetchPositions()
    }, [])


    return (
        <div className='p-4'>
            <div className='flex justify-between mb-4 items-center'>
                <h1 className='text-2xl font-bold'>Danh sách vị trí công tác</h1>
                <div className='space-x-4 flex items-center'>
                    <button className='bg-gray-200 px-2 py-1 rounded' onClick={fetchPositions}>{loading ? 'Đang tải...' : 'Tải lại'}</button>
                    <button className='bg-gray-200 px-2 py-1 rounded' onClick={() => setVisible(true)}>Tạo mới</button>

                </div>
            </div>
            <table className="table-auto w-full border border-gray-300 text-sm mt-4">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">STT</th>
                        <th className="p-2 border">Mã</th>
                        <th className="p-2 border">Tên</th>
                        <th className="p-2 border">Trạng thái</th>
                        <th className="p-2 border">Mô tả</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        positions.map((position, index) => (
                            <tr key={index}>
                                <td className='p-2 text-center'>
                                    {index}
                                </td>
                                <td className='p-2 text-center'>
                                    {position.code}
                                </td>
                                <td className='p-2 text-center'>
                                    {position.name}
                                </td>
                                <td className='p-2 text-center'>
                                    {position.isActive ? (<span className="text-white bg-green-500 text-xs p-1 rounded-lg">Hoạt động</span>)
                                        : (<span className="text-white bg-red-500 text-xs p-1 rounded-lg">Ngừng hoạt động</span>)}
                                </td>

                                <td className='p-2 text-start'>
                                    {position.des}
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>


            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-20 ${visible ? 'w-1/3' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
                        <p className="cursor-pointer text-white bg-gray-700 px-2 py-1 rounded-lg">Back</p>
                    </div>
                    <h1 className='font-semibold text-center my-4'>Tạo mới Vị trí công tác</h1>
                    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-4 ml-4'>
                        <label className='mb-1 font-semibold'>Tên vị trí:</label>
                        <input name="name" value={name} onChange={(e) => setName(e.target.value)} type='text' className='w-[500px] px-2 py-1 border' required />
                        <label className='mb-1 font-semibold'>Mã vị trí:</label>
                        <input name="code" value={code} onChange={(e) => setCode(e.target.value)} type='text' className='w-[500px] px-2 py-1 border' required />
                        <label className='mb-1 font-semibold'>Mô tả:</label>
                        <textarea name="des" value={des} onChange={(e) => setDes(e.target.value)} type='text' className='w-[500px] px-2 py-1 border' required />
                        <div className='flex gap-2 mt-2 '>
                            <input type="checkbox" id='isActive' onChange={() => setActive(prev => !prev)} checked={isActive} />
                            <label className='cursor-pointer' htmlFor='isActive' >Hoạt động</label>
                        </div>
                        <button type="submit" className='w-20 py-2 mt-4 bg-black text-white'>Lưu</button>
                    </form>
                </div>
            </div>
            {visible && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 z-10" onClick={() => setVisible(false)} />
            )}
        </div>



    )
}

export default Position
