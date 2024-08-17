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
<<<<<<< Victor

const salesPurchaseData = [
  { name: "Oct", Purchase: 50000, Sales: 40000 },
  { name: "Nov", Purchase: 55000, Sales: 45000 },
  { name: "Dec", Purchase: 48000, Sales: 52000 },
  { name: "Jan", Purchase: 51000, Sales: 48000 },
  { name: "Feb", Purchase: 54000, Sales: 50000 },
  { name: "Mar", Purchase: 49000, Sales: 46000 },
  { name: "Apr", Purchase: 53000, Sales: 49000 },
];

const orderSummaryData = [
  { name: "Jan", Ordered: 4000, Cancelled: 2400, Delivered: 2400 },
  { name: "Feb", Ordered: 3000, Cancelled: 1398, Delivered: 2210 },
  { name: "Mar", Ordered: 2000, Cancelled: 9800, Delivered: 2290 },
  { name: "Apr", Ordered: 2780, Cancelled: 3908, Delivered: 2000 },
  { name: "May", Ordered: 1890, Cancelled: 4800, Delivered: 2181 },
];
const Home: React.FC = () => {
=======
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

  // Add state for user information
  const [userInfo, setUserInfo] = React.useState({
    name: '',
    email: '',
    role: ''
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product data
        const productData = await get('/products');
        console.log(productData);

        // Process and set the states based on product data
        setSalesOverview({
          sales: productData.reduce((acc, item) => acc + (item.sales || 0), 0),
          revenue: productData.reduce((acc, item) => acc + (item.price || 0), 0),
          profit: productData.reduce((acc, item) => acc + (item.price - item.cost || 0), 0),
          cost: productData.reduce((acc, item) => acc + (item.cost || 0), 0),
        });

        setInventorySummary({
          quantityInHand: productData.reduce((acc, item) => acc + (item.quantityInHand || 0), 0),
          toBeReceived: productData.reduce((acc, item) => acc + (item.toBeReceived || 0), 0),
        });

        // Fetch user data
        const userData = await get('/me');
        console.log(userData);

        // Set user information
        setUserInfo({
          name: userData.name,
          email: userData.email,
          role: userData.role,
        });

        // Use real product data for charts and tables if needed
        setSalesPurchaseData(productData.map(item => ({
          name: item.name,
          Purchase: item.purchases || 0,
          Sales: item.sales || 0
        })));
        console.log()

        setOrderSummaryData(productData.map(item => ({
          name: item.name,
          Ordered: item.ordered || 0,
          Cancelled: item.cancelled || 0,
          Delivered: item.delivered || 0
        })));

        setTopSellingStock(productData.filter(item => item.soldQuantity > 0));
        setLowQuantityStock(productData.filter(item => item.remainingQuantity < 10));

      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
  }, []);

>>>>>>> development
  return (
    <div className="home">
      <header className="home-header">
        <h1>Dashboard</h1>
      </header>
      <div className="dashboard">
        <div className="row">
<<<<<<< Victor
=======
          <div className="card user-info">
            <h2>User Information</h2>
            <div className="info">
              <div className="info-item">
                <FontAwesomeIcon icon={faUser} className="icon" color="#17a2b8" />
                <span className="label">Name:</span>
                <span className="value">{userInfo.name}</span>
              </div>
              <div className="info-item">
                <FontAwesomeIcon icon={faUser} className="icon" color="#17a2b8" />
                <span className="label">Email:</span>
                <span className="value">{userInfo.email}</span>
              </div>
              <div className="info-item">
                <FontAwesomeIcon icon={faUser} className="icon" color="#17a2b8" />
                <span className="label">Role:</span>
                <span className="value">{userInfo.role}</span>
              </div>
            </div>
          </div>
>>>>>>> development
          <div className="card sales-overview">
            <h2>Sales Overview</h2>
            <div className="stats">
              <div className="stat">
<<<<<<< Victor
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="icon"
                  color="#17a2b8"
                />
                <span className="value">Ksh 7,832</span>
                <span className="label">Sales</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faMoneyBillWave}
                  className="icon"
                  color="#817AF3"
                />
                <span className="value">Ksh 19,300</span>
                <span className="label">Revenue</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="icon"
                  color="#58D365"
                />
                <span className="value">Ksh 858</span>
                <span className="label">Profit</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="icon"
                  color="#DBA362"
                />
                <span className="value">Ksh 17,432</span>
=======
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
>>>>>>> development
                <span className="label">Cost</span>
              </div>
            </div>
          </div>
          <div className="card inventory-summary">
            <h2>Inventory Summary</h2>
            <div className="stats">
              <div className="stat">
<<<<<<< Victor
                <FontAwesomeIcon
                  icon={faBoxes}
                  className="icon"
                  color="#817AF3"
                />
                <span className="value">668</span>
                <span className="label">Quantity in Hand</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="icon"
                  color="#DBA362"
                />
                <span className="value">200</span>
=======
                <FontAwesomeIcon icon={faBoxes} className="icon" color="#817AF3" />
                <span className="value">{inventorySummary.quantityInHand}</span>
                <span className="label">Quantity in Hand</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faTruck} className="icon" color="#DBA362" />
                <span className="value">{inventorySummary.toBeReceived}</span>
>>>>>>> development
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
<<<<<<< Victor
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="icon"
                  color="#009ED8"
                />
                <span className="value">82</span>
                <span className="label">Purchase</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="icon"
                  color="#58D365"
                />
                <span className="value">Ksh 13,573</span>
                <span className="label">Cost</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faBan}
                  className="icon"
                  color="#DBA362"
                />
                <span className="value">5</span>
                <span className="label">Cancel</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faUndo}
                  className="icon"
                  color="#17a2b8"
                />
                <span className="value">Ksh 17,432</span>
=======
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
>>>>>>> development
                <span className="label">Return</span>
              </div>
            </div>
          </div>
          <div className="card product-summary">
            <h2>Product Summary</h2>
            <div className="stats">
              <div className="stat">
<<<<<<< Victor
                <FontAwesomeIcon
                  icon={faUser}
                  className="icon"
                  color="#58D365"
                />
                <span className="value">31</span>
                <span className="label">Number of Suppliers</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faList}
                  className="icon"
                  color="#817AF3"
                />
                <span className="value">21</span>
=======
                <FontAwesomeIcon icon={faUser} className="icon" color="#58D365" />
                <span className="value">{productSummary.suppliers}</span>
                <span className="label">Number of Suppliers</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faList} className="icon" color="#817AF3" />
                <span className="value">{productSummary.categories}</span>
>>>>>>> development
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
<<<<<<< Victor
                <tr>
                  <td>Surgar</td>
                  <td>30</td>
                  <td>12</td>
                  <td>Ksh10000</td>
                </tr>
                <tr>
                  <td>Bread</td>
                  <td>21</td>
                  <td>15</td>
                  <td>Ksh 20000</td>
                </tr>
                <tr>
                  <td>Arimis</td>
                  <td>19</td>
                  <td>17</td>
                  <td>Ksh 15000</td>
                </tr>
=======
                {topSellingStock.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.soldQuantity}</td>
                    <td>{item.remainingQuantity}</td>
                    <td>{`Ksh ${item.price.toLocaleString()}`}</td>
                  </tr>
                ))}
>>>>>>> development
              </tbody>
            </table>
          </div>
          <div className="card low-quantity-stock">
            <h2>Low Quantity Stock</h2>
            <div className="stock-items">
<<<<<<< Victor
              <div className="stock-item">
                <img
                  src="/src/assets/Maize - Flour _ Jumia KE.jpeg"
                  alt="Tata Salt"
                />
                <div>
                  <h3>Maize Flour</h3>
                  <p>Remaining Quantity: 10 Packet</p>
                </div>
                <span className="low-tag">Low</span>
              </div>
              <div className="stock-item">
                <img src="/src/assets/Cooking Salt 1_5kg - 1.5kg" alt="Lays" />
                <div>
                  <h3>Lays</h3>
                  <p>Remaining Quantity: 15 Packet</p>
                </div>
                <span className="low-tag">Low</span>
              </div>
=======
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
>>>>>>> development
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
