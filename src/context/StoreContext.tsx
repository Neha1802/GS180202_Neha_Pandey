import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { openDB } from "idb";

//Store Type
export interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

//Actions for Reducer
type StoreAction =
  | { type: "ADD_STORE"; payload: Store }
  | { type: "REMOVE_STORE"; payload: number }
  | { type: "LOAD_STORES"; payload: Store[] }
  | { type: "REORDER_STORES"; payload: Store[] };

//Initial State
const initialState: Store[] = [];

//Reducer Function
const storeReducer = (state: Store[], action: StoreAction): Store[] => {
  switch (action.type) {
    case "LOAD_STORES":
      return action.payload;

    case "ADD_STORE":
      return [...state, action.payload];

    case "REMOVE_STORE":
      return state.filter((store) => store.id !== action.payload);

    case "REORDER_STORES":
      return action.payload;

    default:
      return state;
  }
};

//Open IndexedDB
const openStoreDB = async () => {
  return openDB("storeDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("stores")) {
        db.createObjectStore("stores", { keyPath: "id" });
      }
    },
  });
};

//Store Context Type
interface StoreContextType {
  stores: Store[];
  addStore: (store: Store) => void;
  removeStore: (id: number) => void;
  reorderStores: (updatedStores: Store[]) => void;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stores, dispatch] = useReducer(storeReducer, initialState);

  //Load Stores from IndexedDB on Page Load
  useEffect(() => {
    const loadStores = async () => {
      const db = await openStoreDB();
      const allStores = await db.getAll("stores");
      if (allStores.length === 0) {
        //If no data exists, set a default store list
        const defaultStores: Store[] = [
          { id: 1, name: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
          { id: 2, name: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
          { id: 3, name: "Houston Harvest Market", city: "Houston", state: "TX" },
          { id: 4, name: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
        ];
  
        //Save default list to IndexedDB
        await Promise.all(defaultStores.map((store) => db.put("stores", store)));
  
        dispatch({ type: "LOAD_STORES", payload: defaultStores });
      } else {
        dispatch({ type: "LOAD_STORES", payload: allStores });
      }
    };
    loadStores();
  }, []);

  //Add Store (Dispatch to Reducer + Save in IndexedDB)
  const addStore = async (store: Store) => {
    const newStore = { ...store, id: Date.now() };
    const db = await openStoreDB();
    await db.put("stores", newStore);
    dispatch({ type: "ADD_STORE", payload: newStore });
  };

  //Remove Store (Dispatch to Reducer + Delete from IndexedDB)
  const removeStore = async (id: number) => {
    const db = await openStoreDB();
    await db.delete("stores", id);
    dispatch({ type: "REMOVE_STORE", payload: id }); 
  };

  //Handle Sorting (Save Sorted Data to State & IndexedDB)
  const reorderStores = async (updatedStores: Store[]) => {
    const db = await openStoreDB();
    await Promise.all(updatedStores.map((store) => db.put("stores", store)));
    dispatch({ type: "REORDER_STORES", payload: updatedStores });
  };

  return (
    <StoreContext.Provider value={{ stores, addStore, removeStore, reorderStores }}>
      {children}
    </StoreContext.Provider>
  );
};
