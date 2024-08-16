import React, { useState } from 'react';
import './AddUserButton.css';

interface AddUserButtonProps {
  onAddUser: (name: string, image: string) => void;
}

const AddUserButton: React.FC<AddUserButtonProps> = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && image) {
      onAddUser(name, image);
      setName('');
      setImage('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="add-user">
      <form className="add-user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
        <button type="submit" className="add-user-btn">Add New User</button>
      </form>
    </div>
  );
};

export default AddUserButton;
