import React, { useState, useEffect } from 'react';

const ModalEdit = ({ isOpen, onClose, selectedBuku, onUpdateBuku }) => {
    const [form, setForm] = useState({});

    useEffect(() => {
        if (selectedBuku) {
            setForm(selectedBuku);
        }
    }, [selectedBuku]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`${import.meta.env.VITE_API_URL}/api/buku/${form.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                judul: form.judul,
                pembuat: form.pembuat,
                diterbitkan: form.diterbitkan
            })
        });

        onUpdateBuku(form);
        onClose();
    };

    if (!isOpen || !selectedBuku) return null;


    return (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-lg font-bold'>Edit Buku</h3>
                    <button onClick={onClose} className='text-gray-500'>✕</button>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block mb-1 font-medium'>Judul Buku</label>
                        <input type="text" className='w-full border border-gray-300 px-3 py-2 rounded-md' name='judul' value={form.judul} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>Pembuat</label>
                        <input type="text" className='w-full border border-gray-300 px-3 py-2 rounded-md' name='pembuat' value={form.pembuat} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>Tanggal Diterbitkan</label>
                        <input type="date" className='w-full border border-gray-300 px-3 py-2 rounded-md' name='diterbitkan' value={form.diterbitkan} onChange={handleChange} />
                    </div>
                    <button type="submit" className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700'>
                        Simpan Perubahan
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalEdit;