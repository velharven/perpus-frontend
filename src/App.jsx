import React, { useState } from 'react';
import ModalTambah from './Component/ModalTambah.jsx';
import ModalEdit from './Component/ModalEdit.jsx';
import ModalHapus from './Component/ModalHapus.jsx';
import "./App.css";

function App() {
  const [buku, setBuku] = useState([
    { id: 1, judul: 'Manggos', penulis: 'Adit', diterbitkan: '2004' },
    { id: 2, judul: 'How To Be Normal', penulis: 'Budi', diterbitkan: '2005' },
  ])
  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHapusOpen, setIsHapusOpen] = useState(false);
  const [selectedBuku, setSelectedBuku] = useState(null);

  const handleUpdateBuku = (updatedBuku) => {
    const newBukuList = buku.map((buku) =>
      buku.id === updatedBuku.id ? updatedBuku : buku
    );
    setBuku(newBukuList);
    setSelectedBuku(null);
  };

  return (
    <div className='p-4 space-y-4'>
      <h1 className="text-2xl font-bold flex justify-center">Daftar Buku</h1>
      <div className='flex justify-end'>
        <button className='bg-green-500 text-white px-4 py-2 rounded-md '
          onClick={() => setIsTambahOpen(true)}>
          Tambah Buku
        </button>
        <ModalTambah isOpen={isTambahOpen} onClose={() => setIsTambahOpen(false)} ></ModalTambah>
      </div>
      <div className='overflow-x-auto'>
        <div>
          <table className='w-full text-sm text-left'>
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Judul</th>
                <th className="border border-gray-300 px-4 py-2">Penulis</th>
                <th className="border border-gray-300 px-4 py-2">Diterbitkan</th>
                <th className="border border-gray-300 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {buku.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-4 py-3 text-center">{item.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.judul}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.penulis}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.diterbitkan}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                      onClick={() => {
                        setSelectedBuku(item);
                        setIsEditOpen(true);
                      }}>
                      Edit
                      </button>
                    <ModalEdit isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}
                      selectedBuku={selectedBuku}
                      onUpdateBuku={handleUpdateBuku}>

                      </ModalEdit>
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => setIsHapusOpen(true)}>
                      Hapus
                    </button>
                    <ModalHapus isOpen={isHapusOpen} onClose={() => setIsHapusOpen(false)} >
                    </ModalHapus>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default App;
