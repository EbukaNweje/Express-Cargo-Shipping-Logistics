import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSave,
  FaTimes,
  FaBox,
  FaSpinner,
} from "react-icons/fa";
// import {
//   useTrackingData,
//   addTrackingEntry,
//   updateTrackingEntry,
//   deleteTrackingEntry,
// } from "../utils/trackingData";
import expLogo from "../asset/expLogo.png";
import axios from "axios";

const AdminDashboard = () => {
  // const { data: trackingData, refreshData } = useTrackingData();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [formData, setFormData] = useState({
    trackingNumber: "",
    currentLocation: "",
    estimatedDelivery: "",
    status: "Pending",
    progress: 0,
    events: [],
  });

  const [allTracking, setAllTracking] = useState({});

  const url = "https://express-cargo-backend.onrender.com/api/tracking";

  // Simple password check (in production, use proper authentication)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const response = await axios.post(
        "https://express-cargo-backend.onrender.com/api/admin/adminlogin",
        { email, password },
      );
      if (response.data.message.includes("successful")) {
        setLoginSuccess("Login successful! 🎉");
        setLoginError("");
        toast.success("Login successful! 🎉", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });

        // Delay dashboard display to show success toast
        setTimeout(() => {
          setIsLoggedIn(true);
          setEmail("");
          setPassword("");
          setLoginSuccess("");
        }, 1500);
      } else {
        setLoginError(response.data.message || "Invalid credentials");
        setLoginSuccess("");
        toast.error(response.data.message || "Login failed");
      }
    } catch (err) {
      console.log("Login error:", err);
      const errorMessage =
        err.response?.data?.message || "Error logging in. Please try again.";
      setLoginError(errorMessage);
      setLoginSuccess("");
      toast.error(errorMessage);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword("");
  };

  const resetForm = () => {
    setFormData({
      trackingNumber: "",
      currentLocation: "",
      estimatedDelivery: "",
      status: "Pending",
      progress: 0,
      events: [],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (id) => {
    const entry = Object.values(allTracking || {}).find(
      (item) => item._id === id,
    );
    if (entry) {
      setFormData({
        trackingNumber: entry.trackingNumber,
        currentLocation: entry.currentLocation,
        estimatedDelivery: entry.estimatedDelivery,
        status: entry.status || "Pending",
        progress: entry.progress || 0,
        events: entry.events || [],
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(`Are you sure you want to delete this tracking entry?`)
    ) {
      setLoadingId(id);
      try {
        await axios.delete(`${url}/${id}`);
        // Remove from state immediately without waiting for API refresh
        setAllTracking((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
        toast.success("Tracking entry deleted successfully!");
        window.location.reload();
      } catch (err) {
        console.log("error deleting:", err);
        toast.error("Error deleting tracking entry");
      } finally {
        setLoadingId(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingId) {
        await axios.put(`${url}/${editingId}`, formData);
        toast.success("Tracking entry updated successfully!");
      } else {
        await axios.post(`${url}`, formData);
        toast.success("Tracking entry created successfully!");
      }

      // Refresh data after submit
      const res = await axios.get(`${url}/getalltracking`);
      setAllTracking(res?.data?.data || {});
      resetForm();
    } catch (err) {
      console.log("error:", err);
      toast.error("Error saving tracking entry");
    } finally {
      setIsLoading(false);
    }
  };

  const addTimelineEvent = () => {
    setFormData({
      ...formData,
      events: [
        ...formData.events,
        {
          date: new Date().toISOString().split("T")[0],
          status: "",
          location: "",
          completed: false,
        },
      ],
    });
  };

  const updateTimelineEvent = (index, field, value) => {
    const newEvents = [...formData.events];
    newEvents[index][field] = value;
    setFormData({ ...formData, events: newEvents });
  };

  const removeTimelineEvent = (index) => {
    const newEvents = formData.events.filter((_, i) => i !== index);
    setFormData({ ...formData, events: newEvents });
  };

  const generateTrackingNumber = () => {
    const randomNum = Math.random().toString(36).substring(2, 11).toUpperCase();
    const trackingNumber = `ECSL${randomNum}`;
    setFormData({ ...formData, trackingNumber });
  };

  useEffect(() => {
    const handleGetAllTrackingData = async () => {
      try {
        const res = await axios.get(`${url}/getalltracking`);
        setAllTracking(res?.data?.data);
        // console.log("Get All Tracking", res);
      } catch (err) {
        console.log("error", err);
      }
    };

    handleGetAllTrackingData();
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="text-4xl text-cyan-400 mb-4">
                <FaBox />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-blue-200">
                Enter your credentials to access tracking management
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  required
                  disabled={loginLoading}
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  required
                  disabled={loginLoading}
                />
              </div>

              {loginError && (
                <div className="text-red-400 text-center text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/30">
                  {loginError}
                </div>
              )}

              {loginSuccess && (
                <div className="text-green-400 text-center text-sm bg-green-500/10 p-3 rounded-lg border border-green-500/30">
                  {loginSuccess}
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {loginLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Navigation */}
      <nav className="p-6 bg-white backdrop-blur-md shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src={expLogo}
              alt="Express Cargo Logo"
              className="h-10 w-10 object-contain rounded-lg shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800 leading-tight">
                Express Cargo
              </span>
              <span className="text-xs text-gray-600 leading-tight">
                Shipping Logistics
              </span>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              ← Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 transition-colors duration-300 px-4 py-2 border border-red-300 rounded-md hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Tracking Management
            </h1>
            <p className="text-blue-200">
              Manage shipment tracking data and progress updates
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add New Tracking</span>
          </button>
        </div>

        {/* Tracking Entries Grid */}
        {Object.keys(allTracking || {}).length === 0 ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 text-center mb-8">
            <p className="text-xl text-blue-200">No tracking data available</p>
            <p className="text-sm text-gray-400 mt-2">
              Add a new tracking entry to get started
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.values(allTracking || {}).map((entry) => (
              <div
                key={entry._id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {entry.trackingNumber}
                    </h3>
                    <p
                      className={`text-sm font-semibold ${
                        entry.status === "Delivered"
                          ? "text-green-400"
                          : entry.status === "In Transit"
                            ? "text-blue-400"
                            : entry.status === "Out for Delivery"
                              ? "text-yellow-400"
                              : entry.status === "Pending"
                                ? "text-orange-400"
                                : "text-gray-400"
                      }`}
                    >
                      {entry.status}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(entry._id)}
                      className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(entry._id)}
                      disabled={loadingId === entry._id}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete"
                    >
                      {loadingId === entry._id ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-blue-200">
                    <span className="text-white font-semibold">Location:</span>{" "}
                    {entry.currentLocation}
                  </p>
                  <p className="text-blue-200">
                    <span className="text-white font-semibold">ETA:</span>{" "}
                    {entry.estimatedDelivery}
                  </p>
                  <p className="text-blue-200">
                    <span className="text-white font-semibold">Progress:</span>{" "}
                    {entry.progress}%
                  </p>
                  <p className="text-blue-200">
                    <span className="text-white font-semibold">Events:</span>{" "}
                    {entry.events.length}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? "Edit Tracking" : "Add New Tracking"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Tracking Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.trackingNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          trackingNumber: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="e.g., ECSL123456789"
                      required
                      disabled={!!editingId}
                    />
                    <button
                      type="button"
                      onClick={generateTrackingNumber}
                      disabled={!!editingId}
                      className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-400 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      title="Generate Tracking Number"
                    >
                      Generate
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Current Location
                  </label>
                  <input
                    type="text"
                    value={formData.currentLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentLocation: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="e.g., Port of Los Angeles, CA"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Estimated Delivery
                  </label>
                  <input
                    type="date"
                    value={formData.estimatedDelivery}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimatedDelivery: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    required
                  />
                </div>
              </div>

              {/* Status and Progress */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  >
                    <option value="Pending" className="bg-gray-900">
                      Pending
                    </option>
                    <option value="In Transit" className="bg-gray-900">
                      In Transit
                    </option>
                    <option value="Delivered" className="bg-gray-900">
                      Delivered
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Progress (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        progress: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="0-100"
                  />
                </div>
              </div>

              {/* Timeline Events */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-white font-semibold">
                    Timeline Events
                  </label>
                  <button
                    type="button"
                    onClick={addTimelineEvent}
                    className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors flex items-center space-x-2"
                  >
                    <FaPlus size={12} />
                    <span>Add Event</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.events.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg"
                    >
                      <input
                        type="date"
                        value={event.date}
                        onChange={(e) =>
                          updateTimelineEvent(index, "date", e.target.value)
                        }
                        className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                      <select
                        value={event.status}
                        onChange={(e) =>
                          updateTimelineEvent(index, "status", e.target.value)
                        }
                        className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-cyan-400"
                      >
                        <option value="" className="bg-gray-900">
                          Select Status
                        </option>
                        <option value="Pending" className="bg-gray-900">
                          Pending
                        </option>
                        <option value="In Transit" className="bg-gray-900">
                          In Transit
                        </option>
                        <option value="Delivered" className="bg-gray-900">
                          Delivered
                        </option>
                      </select>
                      <input
                        type="text"
                        value={event.location}
                        onChange={(e) =>
                          updateTimelineEvent(index, "location", e.target.value)
                        }
                        placeholder="Location"
                        className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-blue-300 text-sm focus:outline-none focus:border-cyan-400"
                      />
                      <label className="flex items-center space-x-2 text-white text-sm">
                        <input
                          type="checkbox"
                          checked={event.completed}
                          onChange={(e) =>
                            updateTimelineEvent(
                              index,
                              "completed",
                              e.target.checked,
                            )
                          }
                          className="rounded"
                        />
                        <span>Completed</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeTimelineEvent(index)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaSave />
                  )}
                  <span>{editingId ? "Update Tracking" : "Save Tracking"}</span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isLoading}
                  className="px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
