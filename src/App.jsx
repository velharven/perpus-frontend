import React, { useState, useEffect } from 'react';
import ModalTambah from './Component/ModalTambah.jsx';
import ModalEdit from './Component/ModalEdit.jsx';
import ModalHapus from './Component/ModalHapus.jsx';
import "./App.css";

function App() {
  const [buku, setBuku] = useState([]);
  const getBuku = async () => {
    const res = await fetch("http://localhost:5000/api/buku");
    const data = await res.json();
    setBuku(data);
  };

  useEffect(() => {
    getBuku();
  }, []);
  
  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHapusOpen, setIsHapusOpen] = useState(false);
  const [selectedBuku, setSelectedBuku] = useState(null);
  const [hapusId, setHapusId] = useState(null);

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
        <button className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700'
          onClick={() => setIsTambahOpen(true)}>
          Tambah Buku
        </button>
        <ModalTambah isOpen={isTambahOpen} onClose={() => setIsTambahOpen(false)} onSuccess={getBuku}></ModalTambah>
      </div>
      <div className='overflow-x-auto'>
        <div>
          <table className='w-full text-sm text-left'>
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Judul</th>
                <th className="border border-gray-300 px-4 py-2">Pembuat</th>
                <th className="border border-gray-300 px-4 py-2">Diterbitkan</th>
                <th className="border border-gray-300 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {buku.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-4 py-3 text-center">{item.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.judul}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.pembuat}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.diterbitkan?.slice(0, 10)}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-700"
                      onClick={() => {
                        setSelectedBuku(item);
                        setIsEditOpen(true);
                      }}>
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
                      onClick={() => {
                        setHapusId(item.id);
                        setIsHapusOpen(true);
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalEdit isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}
        selectedBuku={selectedBuku}
        onUpdateBuku={handleUpdateBuku}>
      </ModalEdit>
      <ModalHapus
        isOpen={isHapusOpen}
        onClose={() => setIsHapusOpen(false)}
        onConfirm={async () => {
          await fetch(`http://localhost:5000/api/buku/${hapusId}`, {
            method: "DELETE"
          });
          setIsHapusOpen(false);
          getBuku();
        }}
      />

    </div>
  );
}
export default App;
