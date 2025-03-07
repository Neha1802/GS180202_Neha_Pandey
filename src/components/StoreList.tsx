import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableRow from "./Sortable";

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

interface StoreListProps {
  stores: Store[]; 
  onRemoveStore: (id: number) => void;
  onSortEnd: (event: any) => void;
}

const StoreList: React.FC<StoreListProps> = ({ stores, onRemoveStore, onSortEnd }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onSortEnd}>
      <table className="store-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Store</th>
            <th>City</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <SortableContext items={stores.map((store) => store.id)} strategy={verticalListSortingStrategy}>
          <tbody>
            {stores.map((store, index) => (
              <SortableRow key={store.id} id={store.id} index={index} store={store} onRemoveStore={onRemoveStore} />
            ))}
          </tbody>
        </SortableContext>
      </table>
    </DndContext>
  );
};

export default StoreList;
