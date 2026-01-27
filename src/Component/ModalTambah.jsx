import React, { useState } from 'react';

const ModalTambah = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    judul: "",
    pembuat: "",
    diterbitkan: ""
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/buku", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    onSuccess();
    onClose();
    setForm({ judul: "", pembuat: "", diterbitkan: "" });
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-bold'>Tambah Buku</h3>
          <button onClick={onClose} className='text-gray-500'>✕</button>
        </div>
        <div>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <label className='block mb-1 font-medium'>Judul Buku</label>
              <input type="text" className='w-full border border-gray-300 px-3 py-2 rounded-md' value={form.judul} onChange={(e) => setForm({...form, judul: e.target.value})} />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Pembuat</label>
              <input type="text" className='w-full border border-gray-300 px-3 py-2 rounded-md' value={form.pembuat} onChange={(e) => setForm({...form, pembuat: e.target.value})} />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Tanggal Diterbitkan</label>
              <input type="date" className='w-full border border-gray-300 px-3 py-2 rounded-md' value={form.diterbitkan} onChange={(e) => setForm({...form, diterbitkan: e.target.value})} />
            </div>
            <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md'>
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ModalTambah;