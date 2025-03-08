import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/Planning.css";
import { StoreContext } from "../context/StoreContext";
import { SKUContext } from "../context/SKUContext";
import { useSales } from "../context/PlanningContext";

const getRandomSalesUnits = () => Math.floor(Math.random() * 50) + 1;


const Planning: React.FC = () => {
  const storeContext = useContext(StoreContext);
  const skuContext = useContext(SKUContext);
  const { salesData, updateSalesUnits } = useSales();

  if (!storeContext || !skuContext) {
    return <div>Loading...</div>;
  }

  const { stores } = storeContext;
  const { skus } = skuContext;
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!initialized.current && stores.length > 0 && skus.length > 0) {
      initialized.current = true; // Ensure it runs only once
  
      if (salesData.length === 0) {
        // Initialize sales data only if it's empty
        const initialSales = stores.flatMap((store) =>
          skus.map((sku) => ({
            storeName: store.name,
            skuName: sku.name,
            salesUnits: getRandomSalesUnits(),
          }))
        );
  
        initialSales.forEach(({ storeName, skuName, salesUnits }) => {
          updateSalesUnits(storeName, skuName, salesUnits);
        });
  
        localStorage.setItem("salesData", JSON.stringify(initialSales));
      }
  
      setIsLoading(false);
    }
  }, [stores, skus, salesData]);
  
 

  if (isLoading || salesData.length === 0) {
    return <div>Loading sales data...</div>;
  }

  return (
    <div className="planning-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Store</th>
            <th>SKU</th>
            <th>Sales Units</th>
            <th>Sales Dollars</th>
            <th>GM Dollars</th>
            <th>GM Percent</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map(({ storeName, skuName, salesUnits }, index) => {
            const sku = skus.find((s) => s.name.toLowerCase() === skuName.toLowerCase());
            if (!sku) return null;

            const salesDollars = salesUnits * sku.price;
            const gmDollars = salesDollars - salesUnits * sku.cost;
            const gmPercent = salesDollars ? (gmDollars / salesDollars) * 100 : 0;

            return (
              <tr key={index}>
                <td>{storeName}</td>
                <td>{skuName}</td>
                <td>
                  <input
                    type="number"
                    value={salesUnits}
                    onChange={(e) =>
                      updateSalesUnits(storeName, skuName, parseInt(e.target.value) || 0)
                    }
                    className="sales-input"
                  />
                </td>
                <td>${salesDollars.toFixed(2)}</td>
                <td>${gmDollars.toFixed(2)}</td>
                <td
  className={`gm-percent ${
    gmPercent >= 40
      ? "green"
      : gmPercent >= 10
      ? "yellow"
      : gmPercent > 5
      ? "orange"
      : "red"
  }`}
>
  {gmPercent.toFixed(2)}%
</td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Planning;
