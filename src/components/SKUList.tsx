import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface SKU {
  id: number;
  name: string;
  price: number;
  cost: number;
}

interface SKUListProps {
  skus: SKU[];
  onRemoveSKU: (id: number) => void;
  onEditSKU: (sku: SKU) => void;
  setIsModalOpen: (isOpen: boolean) => void; 
}

const SKUList: React.FC<SKUListProps> = ({ skus, onRemoveSKU,  onEditSKU, setIsModalOpen }) => {
  return (
    <table className="sku-table">
      <thead>
        <tr>
          <th></th>
          <th>SKU</th>
          <th>Price</th>
          <th>Cost</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {skus.map((sku) => (
          <tr key={sku.id}>
            <td style={{width: '10px'}}>
              <button className="text-red-500 hover:text-red-700" onClick={() => onRemoveSKU(sku.id)}>
                <FaTrash size={16} />
              </button>
            </td>
            <td>{sku.name}</td>
            <td>${sku.price.toFixed(2)}</td>
            <td>${sku.cost.toFixed(2)}</td>
            <td style={{width: '10px'}}>
            <button
                className="text-blue-500 hover:text-blue-700 mr-2"
                onClick={() => { onEditSKU(sku); setIsModalOpen(true); }}
              >
                <FaEdit size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SKUList;
