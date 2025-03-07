import React, { useState } from "react";
import type { SKU } from "../context/SKUContext";

interface SKUFormProps {
  onAddSku: (sku: SKU) => void;
  onClose: () => void;
  initialData?: SKU | null;
}

const SKUForm: React.FC<SKUFormProps> = ({ onAddSku, onClose, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price.toString() || "");
  const [cost, setCost] = useState(initialData?.cost.toString() || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name  || !price || !cost) return;

    const newSku: SKU = {
      id: initialData?.id || Date.now(),
      name,
      price: parseFloat(price),
      cost: parseFloat(cost),
    };

    onAddSku(newSku);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
      <h2 className="text-xl font-bold mb-4">{initialData ? "Edit SKU" : "Add New SKU"}</h2>


        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="SKU Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded cancelBtn">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded addBtn">
            {initialData ? "Update SKU" : "Add SKU"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SKUForm;
