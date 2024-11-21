import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { toast } from 'react-toastify'


const Teacher = () => {
    const [teachers, setTeachers] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [positions, setPositions] = useState([])

    const [newTeacher, setNewTeacher] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        dob: "",
        identity: "",
        degrees: [],
        teacherPositionsId: []
    })

    const [degrees, setDegrees] = useState([
        {
            type: "",
            school: "",
            major: "",
            isGraduated: false,
            year: ""
        }
    ]);

    const handleInputChangeForm = (name, value) => {
        setNewTeacher((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    useEffect(() => {
        setNewTeacher((prev) => ({
            ...prev,
            degrees: degrees
        }))
    }, [degrees])

    const fetchTeachers = async () => {
        setLoading(true)
        try {
            const response = await axios.get("http://localhost:4000/teachers/list-teachers", { params: { page, limit } })
            if (response.data.success) {
                setTeachers(response.data.teacher)
                setTotalPages(response.data.pagination.total)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchPositions = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:4000/positions/list-positions", {})
            if (response.data.success) {
                const options = response.data.positions.map((option) => (
                    {
                        value: option._id,
                        label: option.name
                    }
                ))
                setPositions(options)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/teachers/add-teacher", newTeacher)
            if (response.data.success) {
                toast.success(response.data.message)
                setVisible(false)
                setDegrees([
                    {
                        type: "",
                        school: "",
                        major: "",
                        isGraduated: false,
                        year: ""
                    },
                ]);
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleInputChange = (index, field, value) => {
        const updatedDegrees = [...degrees];
        if (field === "status") {
            updatedDegrees[index][field] = value;
        } else {
            updatedDegrees[index][field] = value;
        }
        setDegrees(updatedDegrees);
    };


    const addDegreeRow = () => {
        setDegrees([
            ...degrees,
            {
                type: "",
                school: "",
                major: "",
                isGraduated: false,
                year: ""
            },
        ]);
    };


    const removeDegreeRow = (index) => {
        const updatedDegrees = degrees.filter((_, i) => i !== index);
        setDegrees(updatedDegrees);
    };



    const getHighestDegree = (degrees) => {
        const degreeLevels = ["Bachelor", "Master", "Doctorate"];
        let highestDegree = { type: "Chưa xác định", major: "Không có" };

        if (degrees.length > 0) {
            highestDegree = degrees.reduce((highest, current) => {
                return degreeLevels.indexOf(current.type) > degreeLevels.indexOf(highest.type)
                    ? current
                    : highest;
            }, highestDegree);
        }

        return highestDegree;
    };
    const handleLimitChange = (event) => {
        setLimit(Number(event.target.value));
        setPage(1);
        fetchTeachers()

    };
    useEffect(() => {
        fetchTeachers()
    }, [page, limit])
    useEffect(() => {
        fetchPositions()
    }, [])

    return (
        <div className='p-4 min-h-screen'>
            <div className='flex justify-between mb-4 items-center'>
                <h1 className='text-2xl font-bold'>Danh sách giáo viên</h1>
                <div className='flex justify-between items-center'>
                    <input type='text' placeholder='Tim kiem thong tin' className='border rounded px-2 py-1 w-1/2' />
                    <div className='space-x-4 flex items-center'>
                        <button className='bg-gray-200 px-2 py-1 rounded' onClick={fetchTeachers}>{loading ? 'Đang tải...' : 'Tải lại'}</button>
                        <button className='bg-gray-200 px-2 py-1 rounded' onClick={() => setVisible(true)}>Tạo mới</button>

                    </div>
                </div>
            </div>
            <table className="table-auto w-full border border-gray-300 text-sm mt-4">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Mã</th>
                        <th className="p-2 border">Giáo viên</th>
                        <th className="p-2 border">Trình độ(cao nhất)</th>
                        <th className="p-2 border">Bộ môn</th>
                        <th className="p-2 border">TT Công tác</th>
                        <th className="p-2 border">Địa chỉ</th>
                        <th className="p-2 border">Trạng thái</th>
                        <th className="p-2 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher, index) => {

                        const highestDegree = getHighestDegree(teacher.degrees)
                        return (
                            <tr key={index}>
                                <td className="p-2 text-center">{teacher.code}</td>
                                <td className='p-2'>
                                    <p>{teacher.name}</p>
                                    <p>{teacher.email}</p>
                                    <p>{teacher.phoneNumber}</p>
                                </td>
                                <td className='p-2 '>
                                    <p>{highestDegree.type}</p>
                                    <p>{highestDegree.major}</p>
                                </td>
                                <td className='p-2 text-center text-gray-400'>
                                    N/A
                                </td>
                                <td className='p-2 text-center'>
                                    {teacher.positions.map((item, index) => <p key={index}>
                                        {item}
                                    </p>)}
                                </td>
                                <td className='p-2 text-center'>
                                    {teacher.address}
                                </td>
                                <td className='p-2 text-center'>
                                    {teacher.isActive ? (<span className="text-white bg-green-500 text-xs p-1 rounded-lg">Hoạt động</span>)
                                        : (<span className="text-white bg-red-500 text-xs p-1 rounded-lg">Ngừng hoạt động</span>)}
                                </td>
                                <td className='p-2 text-center'>
                                    <button className="bg-gray-200 hover:underline px-2 py-1 rounded-lg">
                                        Chi tiết
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="flex justify-center items-center mt-8 gap-x-2">
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded disabled:bg-gray-300"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <p>
                    Page {page} of {totalPages}
                </p>
                <select
                    value={limit}
                    onChange={handleLimitChange}
                    className="border px-4 py-2 rounded"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded disabled:bg-gray-300"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
            {visible && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 z-10 h-full" onClick={() => setVisible(false)} />
            )}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-20 ease-in-out ${visible ? 'w-3/4 h-full' : 'w-0 h-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
                        <p className="cursor-pointer text-white bg-gray-700 px-2 py-1 rounded-lg">Back</p>
                    </div>
                    <h1 className='font-semibold text-center my-4'>Tạo mới Thông tin giáo viên</h1>
                    <form className='flex flex-col w-full items-start gap-4 ml-4 px-20' onSubmit={handleSubmit}>
                        {/* Personal Info */}

                        <div className='py-4 rounded-lg w-full space-y-8'>
                            <h2 className='font-bold text-sm mb-4'>Thông tin cá nhân</h2>
                            <div className='grid grid-cols-2 gap-4 w-full'>
                                <input type="text" placeholder='Họ và tên' className='border px-2 py-1 rounded w-full'
                                    value={newTeacher.name}
                                    onChange={(e) => handleInputChangeForm("name", e.target.value)}
                                    required />
                                <input type="date" placeholder='Ngày sinh' className='border px-2 py-1 rounded w-1/2'
                                    value={newTeacher.dob}
                                    onChange={(e) => handleInputChangeForm("dob", e.target.value)}
                                    required />

                            </div>
                            <div className='grid grid-cols-2 gap-4 w-full'>
                                <input type="number" placeholder='Số điện thoại' className='border px-2 py-1 rounded w-full'
                                    value={newTeacher.phoneNumber}
                                    onChange={(e) => handleInputChangeForm("phoneNumber", e.target.value)}
                                    required />
                                <input type="email" placeholder='Email' className='border px-2 py-1 rounded w-full'
                                    value={newTeacher.email}
                                    onChange={(e) => handleInputChangeForm("email", e.target.value)}
                                    required />

                            </div>
                            <div className='grid grid-cols-2 gap-4 w-full'>
                                <input type="number" placeholder='Số CCCD' className='border px-2 py-1 rounded w-full'
                                    value={newTeacher.identity}
                                    onChange={(e) => handleInputChangeForm("identity", e.target.value)}
                                    required />
                                <input type="text" placeholder='Địa chỉ' className='border px-2 py-1 rounded w-full'
                                    value={newTeacher.address}
                                    onChange={(e) => handleInputChangeForm("address", e.target.value)}
                                    required />

                            </div>
                        </div>
                        <div className="py-4 rounded-lg w-full">
                            <h2 className="font-bold mb-4">Thông tin công tác</h2>
                            <Select
                                options={positions}
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Chọn vị trí công tác"
                                onChange={(selected) => handleInputChangeForm("teacherPositionsId", selected.map((item) => item.value))}
                            />
                        </div>
                        <div className="py-4 w-full space-x-8">
                            <div className='flex items-center justify-between mb-4'>
                                <h2 className="font-bold">Học vị</h2>
                                <button
                                    onClick={addDegreeRow}
                                    type="button"
                                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                                    Thêm học vị
                                </button>
                            </div>

                            <table className="table-auto w-full  text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border">Bậc</th>
                                        <th className="p-2 border">Trường</th>
                                        <th className="p-2 border">Chuyên ngành</th>
                                        <th className="p-2 border">Trạng thái</th>
                                        <th className="p-2 border">Tốt nghiệp</th>
                                        <th className="p-2 border">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {degrees.map((degree, index) => (
                                        <tr key={index}>
                                            <td className="p-2 border">
                                                <select
                                                    value={degree.type}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "type", e.target.value)
                                                    }
                                                    className="border p-1 rounded w-full"
                                                >
                                                    <option value="">Chọn bậc</option>
                                                    <option value="Bachelor">Cử nhân</option>
                                                    <option value="Master">Bậc thầy</option>
                                                    <option value="Doctorate">Tiến sĩ</option>
                                                </select>
                                            </td>
                                            <td className="p-2 border">
                                                <input
                                                    type="text"
                                                    value={degree.school}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "school", e.target.value)
                                                    }
                                                    className="border p-1 rounded w-full"
                                                    placeholder="Trường"
                                                />
                                            </td>
                                            <td className="p-2 border">
                                                <input
                                                    type="text"
                                                    value={degree.major}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "major", e.target.value)
                                                    }
                                                    className="border p-1 rounded w-full"
                                                    placeholder="Chuyên ngành"
                                                />
                                            </td>
                                            <td className="p-2 border text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={degree.isGraduated}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "isGraduated", e.target.checked)
                                                    }
                                                />
                                            </td>
                                            <td className="p-2 border">
                                                <input
                                                    type="number"
                                                    value={degree.year}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "year", e.target.value)
                                                    }
                                                    className="border p-1 rounded w-full"
                                                    placeholder="Năm tốt nghiệp"
                                                />
                                            </td>
                                            <td className="p-2 border text-center">
                                                <button
                                                    type='button'
                                                    className="text-red-500 hover:underline"
                                                    onClick={() => removeDegreeRow(index)}
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4 ">
                            Lưu
                        </button>

                    </form>
                </div>
            </div >
        </div >

    )
}

export default Teacher
