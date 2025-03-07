import React, { useContext, useState } from "react";
import SKUForm from "../components/SKUForm"; 
import { SKUContext } from "../context/SKUContext";
import "../styles/Store.css";

import type { SKU } from "../context/SKUContext";
import SKUList from "../components/SKUList";
import '../styles/Sku.css';


const SKUs: React.FC = () => {
  const { skus, addSKU, removeSKU, updateSKU } = useContext(SKUContext)!; 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSku, setEditingSku] = useState<SKU | null>(null); 

  // Close modal after adding SKU
  const handleAddOrUpdateSku = (sku: SKU) => {
    if (editingSku) {
      updateSKU(sku);
    } else {
      addSKU(sku);
    }
    setEditingSku(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-2 w-full">
      {/* SKU Modal */}
      {isModalOpen && <SKUForm onAddSku={handleAddOrUpdateSku}
          onClose={() => {
            setIsModalOpen(false);
            setEditingSku(null);
          }}
          initialData={editingSku} />}

      <h2 className="text-xl text-blue-500 font-bold">SKU List</h2>

      <div className="bg-white shadow-md rounded-lg p-4 w-full max-h-[500px] overflow-y-auto">
        <SKUList skus={skus} onRemoveSKU={removeSKU} onEditSKU={setEditingSku} setIsModalOpen={setIsModalOpen} />
      </div>

      {/* Add SKU Button */}
      <div className="flex justify-left">
      <button onClick={() => setIsModalOpen(true)} className="text-white mt-4 px-4 py-2 rounded addBtn">
        NEW SKU
      </button>
      </div>
    </div>
  );
};

export default SKUs;
