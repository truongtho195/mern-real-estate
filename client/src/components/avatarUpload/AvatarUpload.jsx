import React, { useState } from 'react';

function AvatarUpload({onFileSelect}) {
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // setAvatar(file);
            onFileSelect(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        try {
            const response = await fetch('http://localhost:3000/user/update-avatar', {
                method: 'PUT',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                alert('Avatar updated successfully');
                // Thực hiện thêm các hành động cần thiết sau khi cập nhật avatar thành công
            } else {
                alert(data.message || 'Failed to update avatar');
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            alert('Error uploading avatar');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md h-[350px]">
            <h2 className="text-2xl font-semibold mb-4">Upload Avatar</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    {preview ? (
                        <img src={preview} alt="Avatar Preview" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                    ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                {/* <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    Upload
                </button> */}
            </form>
        </div>
    );
}

export default AvatarUpload;
