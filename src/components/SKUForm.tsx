import React, { useState } from "react";

const SKUForm = ({ addSKU }: { addSKU: (sku: { name: string; price: number; cost: number }) => void }) => {
  const [sku, setSKU] = useState({ name: "", price: 0, cost: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sku.name.trim() !== "") {
      addSKU(sku);
      setSKU({ name: "", price: 0, cost: 0 });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input type="text" placeholder="SKU Name" value={sku.name} onChange={(e) => setSKU({ ...sku, name: e.target.value })} />
      <input type="number" placeholder="Price" value={sku.price} onChange={(e) => setSKU({ ...sku, price: Number(e.target.value) })} />
      <input type="number" placeholder="Cost" value={sku.cost} onChange={(e) => setSKU({ ...sku, cost: Number(e.target.value) })} />
      <button type="submit">Add SKU</button>
    </form>
  );
};

export default SKUForm;
