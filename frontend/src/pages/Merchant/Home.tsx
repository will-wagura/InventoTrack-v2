import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faMoneyBillWave,
  faChartLine,
  faDollarSign,
  faBoxes,
  faTruck,
  faShoppingBag,
  faBan,
  faUndo,
  faUser,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import "../../styles/Merchant/HomePage.css";
import { get } from "../../services/api";

const Home: React.FC = () => {
  const [salesOverview, setSalesOverview] = React.useState({
    sales: 0,
    revenue: 0,
    profit: 0,
    cost: 0,
  });

  const [inventorySummary, setInventorySummary] = React.useState({
    quantityInHand: 0,
    toBeReceived: 0,
  });

  const [purchaseOverview, setPurchaseOverview] = React.useState({
    purchases: 0,
    cost: 0,
    cancels: 0,
    returns: 0,
  });

  const [productSummary, setProductSummary] = React.useState({
    suppliers: 0,
    categories: 0,
  });

  const [salesPurchaseData, setSalesPurchaseData] = React.useState([]);
  const [orderSummaryData, setOrderSummaryData] = React.useState([]);
  const [topSellingStock, setTopSellingStock] = React.useState([]);
  const [lowQuantityStock, setLowQuantityStock] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get('/product');
        console.log(data);

        setSalesOverview({
          sales: data.salesOverview.sales,
          revenue: data.salesOverview.revenue,
          profit: data.salesOverview.profit,
          cost: data.salesOverview.cost,
        });

        setInventorySummary({
          quantityInHand: data.inventorySummary.quantityInHand,
          toBeReceived: data.inventorySummary.toBeReceived,
        });

        setPurchaseOverview({
          purchases: data.purchaseOverview.purchases,
          cost: data.purchaseOverview.cost,
          cancels: data.purchaseOverview.cancels,
          returns: data.purchaseOverview.returns,
        });

        setProductSummary({
          suppliers: data.productSummary.suppliers,
          categories: data.productSummary.categories,
        });

        setSalesPurchaseData(data.salesPurchaseData);
        setOrderSummaryData(data.orderSummaryData);
        setTopSellingStock(data.topSellingStock);
        setLowQuantityStock(data.lowQuantityStock);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <h1>Dashboard</h1>
      </header>
      <div className="dashboard">
        <div className="row">
          <div className="card sales-overview">
            <h2>Sales Overview</h2>
            <div className="stats">
              <div className="stat">
                <FontAwesomeIcon icon={faShoppingCart} className="icon" color="#17a2b8" />
                <span className="value">{`Ksh ${salesOverview.sales.toLocaleString()}`}</span>
                <span className="label">Sales</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faMoneyBillWave} className="icon" color="#817AF3" />
                <span className="value">{`Ksh ${salesOverview.revenue.toLocaleString()}`}</span>
                <span className="label">Revenue</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faChartLine} className="icon" color="#58D365" />
                <span className="value">{`Ksh ${salesOverview.profit.toLocaleString()}`}</span>
                <span className="label">Profit</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faDollarSign} className="icon" color="#DBA362" />
                <span className="value">{`Ksh ${salesOverview.cost.toLocaleString()}`}</span>
                <span className="label">Cost</span>
              </div>
            </div>
          </div>
          <div className="card inventory-summary">
            <h2>Inventory Summary</h2>
            <div className="stats">
              <div className="stat">
                <FontAwesomeIcon icon={faBoxes} className="icon" color="#817AF3" />
                <span className="value">{inventorySummary.quantityInHand}</span>
                <span className="label">Quantity in Hand</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faTruck} className="icon" color="#DBA362" />
                <span className="value">{inventorySummary.toBeReceived}</span>
                <span className="label">To be received</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card purchase-overview">
            <h2>Purchase Overview</h2>
            <div className="stats">
              <div className="stat">
                <FontAwesomeIcon icon={faShoppingBag} className="icon" color="#009ED8" />
                <span className="value">{purchaseOverview.purchases}</span>
                <span className="label">Purchase</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faDollarSign} className="icon" color="#58D365" />
                <span className="value">{`Ksh ${purchaseOverview.cost.toLocaleString()}`}</span>
                <span className="label">Cost</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faBan} className="icon" color="#DBA362" />
                <span className="value">{purchaseOverview.cancels}</span>
                <span className="label">Cancel</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faUndo} className="icon" color="#17a2b8" />
                <span className="value">{`Ksh ${purchaseOverview.returns.toLocaleString()}`}</span>
                <span className="label">Return</span>
              </div>
            </div>
          </div>
          <div className="card product-summary">
            <h2>Product Summary</h2>
            <div className="stats">
              <div className="stat">
                <FontAwesomeIcon icon={faUser} className="icon" color="#58D365" />
                <span className="value">{productSummary.suppliers}</span>
                <span className="label">Number of Suppliers</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faList} className="icon" color="#817AF3" />
                <span className="value">{productSummary.categories}</span>
                <span className="label">Number of Categories</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card sales-purchase">
            <h2>Sales & Purchase</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesPurchaseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Purchase" fill="#8884d8" />
                <Bar dataKey="Sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card order-summary">
            <h2>Order Summary</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderSummaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Ordered" stroke="#8884d8" />
                <Line type="monotone" dataKey="Cancelled" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Delivered" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="row">
          <div className="card top-selling-stock">
            <h2>Top Selling Stock</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sold Quantity</th>
                  <th>Remaining Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {topSellingStock.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.soldQuantity}</td>
                    <td>{item.remainingQuantity}</td>
                    <td>{`Ksh ${item.price.toLocaleString()}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card low-quantity-stock">
            <h2>Low Quantity Stock</h2>
            <div className="stock-items">
              {lowQuantityStock.map((item) => (
                <div className="stock-item" key={item.id}>
                  <img src={item.imageUrl} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{`Remaining Quantity: ${item.remainingQuantity}`}</p>
                  </div>
                  <span className="low-tag">Low</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
