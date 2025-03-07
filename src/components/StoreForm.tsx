import React, { useState } from "react";

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

interface StoreFormProps {
  onAddStore: (store: Store) => void;
  onClose: () => void;
}

const StoreForm: React.FC<StoreFormProps> = ({ onAddStore, onClose }) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !city || !state) return;

    const newStore: Store = { id: Date.now(), name, city, state };
    onAddStore(newStore);
    setName("");
    setCity("");
    setState("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Add New Store</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Store Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded cancelBtn">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded addBtn">
              Add Store
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreForm;
