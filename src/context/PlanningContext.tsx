import React, { createContext, useState, useContext, ReactNode } from "react";

interface SalesData {
  storeName: string;
  skuName: string;
  salesUnits: number;
}

interface PlanningContextType {
  salesData: SalesData[];
  updateSalesUnits: (storeName: string, skuName: string, units: number) => void;
}

const PlanningContext = createContext<PlanningContextType | undefined>(undefined);

export const SalesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [salesData, setSalesData] = useState<SalesData[]>(() => {
      // Initialize salesData from localStorage or keep it empty
      const storedSales = localStorage.getItem("salesData");
      return storedSales ? JSON.parse(storedSales) : [];
    });
  
    const updateSalesUnits = (storeName: string, skuName: string, units: number) => {
      setSalesData((prevSales) => {
        const salesMap = new Map<string, Map<string, number>>();
  
        // Build a Map of Stores and their SKUs (ensuring uniqueness)
        prevSales.forEach(({ storeName, skuName, salesUnits }) => {
          if (!salesMap.has(storeName)) {
            salesMap.set(storeName, new Map());
          }
          salesMap.get(storeName)!.set(skuName, salesUnits);
        });
  
        // Add/Update the given store+SKU
        if (!salesMap.has(storeName)) {
          salesMap.set(storeName, new Map());
        }
        salesMap.get(storeName)!.set(skuName, units);
  
        const updatedSales: SalesData[] = [];
        salesMap.forEach((skuMap, store) => {
          skuMap.forEach((units, sku) => {
            updatedSales.push({ storeName: store, skuName: sku, salesUnits: units });
          });
        });
  
        // ✅ Save the new state in localStorage to persist between renders
        localStorage.setItem("salesData", JSON.stringify(updatedSales));
  
        return updatedSales;
      });
    };
  
    return (
      <PlanningContext.Provider value={{ salesData, updateSalesUnits }}>
        {children}
      </PlanningContext.Provider>
    );
  };
  

export const useSales = () => {
  const context = useContext(PlanningContext);
  if (!context) {
    throw new Error("useSales must be used within a SalesProvider");
  }
  return context;
};
