import React, { useContext, useState } from "react";
import StoreList from "../components/StoreList";
import StoreForm from "../components/StoreForm";
import { StoreContext } from "../context/StoreContext";
import { arrayMove } from "@dnd-kit/sortable";
import '../styles/Store.css';

import type { Store } from "../context/StoreContext";

const Stores: React.FC = () => {
  const { stores, addStore, removeStore, reorderStores } = useContext(StoreContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Close modal after adding store
  const handleAddStore = (store: Store) => {
    addStore(store);
    setIsModalOpen(false);
  };

  //Handle sorting after drag and drop (Now Saves Sorted Data)
  const handleSortEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = stores.findIndex((store) => store.id === active.id);
      const newIndex = stores.findIndex((store) => store.id === over.id);
      const updatedStores = arrayMove(stores, oldIndex, newIndex);
      reorderStores(updatedStores);
    }
  };

  return (
    <div className="p-2 w-full">
      {/* Store Modal */}
      {isModalOpen && <StoreForm onAddStore={handleAddStore} onClose={() => setIsModalOpen(false)} />}

      <h2 className="text-xl text-blue-500 font-bold">Store List</h2>

      <div className="bg-white shadow-md rounded-lg p-4 w-full max-h-[500px] overflow-y-auto">
        <StoreList stores={stores} onRemoveStore={removeStore} onSortEnd={handleSortEnd} />
      </div>

      {/* Add Store Button */}
      <div className="flex justify-left">
        <button onClick={() => setIsModalOpen(true)} className="text-white mt-4 px-4 py-2 rounded addBtn">
          Add Store
        </button>
      </div>
    </div>
  );
};

export default Stores;
