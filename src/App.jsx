const TableComponent = () => {
  const data = [
    {id:1 , judul: 'Manggos', author:'Adit', diterbitkan:'2002'},
    {id:2 , judul: 'How To Be Normal', author:'Budi', diterbitkan:'2005'},
  ]

  return (
    <div className='p-4 space-y-4'>
      <h1 className="text-2xl font-bold flex justify-center">Daftar Buku</h1>
      <div className='flex justify-end'>
        <button className='bg-green-500 text-white px-4 py-2 rounded-md' >
          Tambah Buku
        </button>
      </div>
      <div className='overflow-x-auto'>
        <div>
          <table className='w-full text-sm text-left'>
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Judul</th>
                <th className="border border-gray-300 px-4 py-2">Author</th>
                <th className="border border-gray-300 px-4 py-2">Diterbitkan</th>
                <th className="border border-gray-300 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-4 py-2">{item.judul}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.author}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.diterbitkan}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md">Hapus</button>
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

export default TableComponent;
