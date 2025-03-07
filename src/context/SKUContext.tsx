import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { openDB } from "idb";

// SKU Type
export interface SKU {
  id: number;
  name: string;
  price: number;
  cost: number;
}

// Actions for Reducer
type SKUAction =
  | { type: "ADD_SKU"; payload: SKU }
  | { type: "REMOVE_SKU"; payload: number }
  | { type: "LOAD_SKUS"; payload: SKU[] }
  | { type: "UPDATE_SKU"; payload: SKU };

// Initial State
const initialState: SKU[] = [];

// Reducer Function
const skuReducer = (state: SKU[], action: SKUAction): SKU[] => {
  switch (action.type) {
    case "LOAD_SKUS":
      return action.payload;

    case "ADD_SKU":
      return [...state, action.payload];

    case "REMOVE_SKU":
      return state.filter((sku) => sku.id !== action.payload);

    case "UPDATE_SKU":
      return state.map((sku) =>
        sku.id === action.payload.id ? action.payload : sku
      );

    default:
      return state;
  }
};

// Open IndexedDB
const openSKUDB = async () => {
  return openDB("skuDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("skus")) {
        db.createObjectStore("skus", { keyPath: "id" });
      }
    },
  });
};

// SKU Context Type
interface SKUContextType {
  skus: SKU[];
  addSKU: (sku: SKU) => void;
  removeSKU: (id: number) => void;
  updateSKU: (sku: SKU) => void;
}

export const SKUContext = createContext<SKUContextType | undefined>(undefined);

export const SKUProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [skus, dispatch] = useReducer(skuReducer, initialState);

  // Load SKUs from IndexedDB on Page Load
  useEffect(() => {
    const loadSKUs = async () => {
      const db = await openSKUDB();
      const allSKUs = await db.getAll("skus");

      if (allSKUs.length === 0) {
        // If no data exists, set a default SKU list
        const defaultSKUs: SKU[] = [
          { id: 1, name: "T-shirt", price: 19.99, cost: 10.99 },
          { id: 2, name: "Jeans", price: 49.99, cost: 25.99 },
          { id: 3, name: "Jacket", price: 79.99, cost: 40.99 },
        ];

        // Save default list to IndexedDB
        await Promise.all(defaultSKUs.map((sku) => db.put("skus", sku)));

        dispatch({ type: "LOAD_SKUS", payload: defaultSKUs });
      } else {
        dispatch({ type: "LOAD_SKUS", payload: allSKUs });
      }
    };
    loadSKUs();
  }, []);

  // Add SKU
  const addSKU = async (sku: SKU) => {
    const newSKU = { ...sku, id: Date.now() };
    const db = await openSKUDB();
    await db.put("skus", newSKU);
    dispatch({ type: "ADD_SKU", payload: newSKU });
  };

  // Remove SKU
  const removeSKU = async (id: number) => {
    const db = await openSKUDB();
    await db.delete("skus", id);
    dispatch({ type: "REMOVE_SKU", payload: id });
  };

  // Update SKU
  const updateSKU = async (sku: SKU) => {
    const db = await openSKUDB();
    await db.put("skus", sku);
    dispatch({ type: "UPDATE_SKU", payload: sku });
  };

  return (
    <SKUContext.Provider value={{ skus, addSKU, removeSKU, updateSKU }}>
      {children}
    </SKUContext.Provider>
  );
};
