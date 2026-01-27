
import "../App.css";

const ModalHapus = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-lg font-bold'>Konfirmasi Hapus</h3>
                    <button onClick={onClose} className='text-gray-500'>✕</button>
                </div>
                <p className='mb-4'>Apakah Anda yakin ingin menghapus buku ini?</p>
                <div className='flex justify-end space-x-2'>
                    <button onClick={onClose} className='bg-gray-500 text-white px-4 py-2 rounded-md'>
                        Batal
                    </button>
                    <button onClick={onConfirm} className='bg-red-500 text-white px-4 py-2 rounded-md'>
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalHapus;