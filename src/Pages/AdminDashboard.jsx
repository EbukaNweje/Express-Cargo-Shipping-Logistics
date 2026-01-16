import { useState } from "react";
import { Link } from "react-router-dom";
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
import {
  useTrackingData,
  addTrackingEntry,
  updateTrackingEntry,
  deleteTrackingEntry,
} from "../utils/trackingData";

const AdminDashboard = () => {
  const { data: trackingData, refreshData } = useTrackingData();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    trackingNumber: "",
    location: "",
    estimatedDelivery: "",
    timeline: [],
  });

  // Simple password check (in production, use proper authentication)
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword("");
  };

  const resetForm = () => {
    setFormData({
      trackingNumber: "",
      location: "",
      estimatedDelivery: "",
      timeline: [],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (trackingNumber) => {
    const entry = trackingData[trackingNumber];
    if (entry) {
      setFormData({
        trackingNumber,
        ...entry,
      });
      setEditingId(trackingNumber);
      setShowForm(true);
    }
  };

  const handleDelete = (trackingNumber) => {
    if (
      window.confirm(
        `Are you sure you want to delete tracking ${trackingNumber}?`
      )
    ) {
      deleteTrackingEntry(trackingNumber);
      refreshData();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      updateTrackingEntry(editingId, formData);
    } else {
      addTrackingEntry(formData.trackingNumber, formData);
    }

    refreshData();
    resetForm();
  };

  const addTimelineEvent = () => {
    setFormData({
      ...formData,
      timeline: [
        ...formData.timeline,
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
    const newTimeline = [...formData.timeline];
    newTimeline[index][field] = value;
    setFormData({ ...formData, timeline: newTimeline });
  };

  const removeTimelineEvent = (index) => {
    const newTimeline = formData.timeline.filter((_, i) => i !== index);
    setFormData({ ...formData, timeline: newTimeline });
  };

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
                Enter password to access tracking management
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  required
                />
              </div>

              {loginError && (
                <div className="text-red-400 text-center text-sm">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300"
              >
                Login
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
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/cargo.jpg"
              alt="Express Cargo Logo"
              className="h-10 w-10 object-cover rounded-lg shadow-md"
            />
            <div className="text-xl font-bold text-white">
              <span className="text-cyan-400">Express</span> Cargo Admin
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-white hover:text-cyan-400 transition-colors duration-300 px-4 py-2 border border-white/30 rounded-md hover:bg-white/10"
            >
              ← Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-400 transition-colors duration-300 px-4 py-2 border border-red-400/30 rounded-md hover:bg-red-400/10"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(trackingData).map(([trackingNumber, entry]) => (
            <div
              key={trackingNumber}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {trackingNumber}
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
                    onClick={() => handleEdit(trackingNumber)}
                    className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(trackingNumber)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-blue-200">
                  <span className="text-white font-semibold">Location:</span>{" "}
                  {entry.location}
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
                  {entry.timeline.length}
                </p>
              </div>
            </div>
          ))}
        </div>

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
                  <input
                    type="text"
                    value={formData.trackingNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        trackingNumber: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="e.g., CS123456789"
                    required
                    disabled={!!editingId}
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Current Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
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
                  {formData.timeline.map((event, index) => (
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
                      <input
                        type="text"
                        value={event.status}
                        onChange={(e) =>
                          updateTimelineEvent(index, "status", e.target.value)
                        }
                        placeholder="Status"
                        className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-blue-300 text-sm focus:outline-none focus:border-cyan-400"
                      />
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
                              e.target.checked
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
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <FaSave />
                  <span>{editingId ? "Update Tracking" : "Save Tracking"}</span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
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
