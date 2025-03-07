import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaTrash } from "react-icons/fa";

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

interface SortableRowProps {
  id: number;
  store: Store;
  index: number;
  onRemoveStore: (id: number) => void;
}

const SortableRow: React.FC<SortableRowProps> = ({ id, store, index, onRemoveStore }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <td>{index + 1}</td>
      <td>{store.name}</td>
      <td>{store.city}</td>
      <td>{store.state}</td>
      <td>
        <button className="text-red-500 hover:text-red-700" onClick={() => onRemoveStore(store.id)}>
          <FaTrash size={16} />
        </button>
      </td>
    </tr>
  );
};

export default SortableRow;
