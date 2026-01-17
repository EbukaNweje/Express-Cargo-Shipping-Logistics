import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaBox, FaSpinner } from "react-icons/fa";
import { getTrackingEntry } from "../utils/trackingData";
import expLogo from "../asset/expLogo.png";

const TrackShipment = () => {
  const [searchParams] = useSearchParams();
  const numberFromUrl = searchParams.get("number");

  const [trackingNumber, setTrackingNumber] = useState(numberFromUrl || "");
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasAutoTrackedRef = useRef(false);

  const handleTrackWithNumber = useCallback((number) => {
    if (!number.trim()) return;

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const result = getTrackingEntry(number);
      setTrackingResult(result || "not_found");
      setIsLoading(false);
    }, 1500);
  }, []);

  // Auto-track if number is provided in URL on component mount
  useEffect(() => {
    if (numberFromUrl && !hasAutoTrackedRef.current) {
      hasAutoTrackedRef.current = true;
      // Use setTimeout to avoid the synchronous setState warning
      setTimeout(() => {
        handleTrackWithNumber(numberFromUrl);
      }, 0);
    }
  }, [numberFromUrl, handleTrackWithNumber]);

  const handleTrack = () => {
    handleTrackWithNumber(trackingNumber);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-400";
      case "In Transit":
        return "text-blue-400";
      case "Out for Delivery":
        return "text-yellow-400";
      case "Pending":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
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
          <Link
            to="/"
            className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            Track Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Shipment
            </span>
          </h1>
          <p className="text-xl text-blue-200">
            Enter your tracking number to get real-time updates on your cargo
          </p>
        </div>

        {/* Tracking Input */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter tracking number (try: CS123456789 or CS987654321)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              onKeyPress={(e) => e.key === "Enter" && handleTrack()}
            />
            <button
              onClick={handleTrack}
              disabled={isLoading || !trackingNumber.trim()}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Tracking...
                </span>
              ) : (
                "Track Package"
              )}
            </button>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 animate-fade-in-up">
            {trackingResult === "not_found" ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4 text-cyan-400">
                  <FaBox className="mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Tracking Number Not Found
                </h3>
                <p className="text-blue-200">
                  Please check your tracking number and try again.
                  <br />
                  Try: CS123456789 or CS987654321 for demo purposes.
                </p>
              </div>
            ) : (
              <div>
                {/* Status Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      Tracking: {trackingNumber.toUpperCase()}
                    </h3>
                    <p
                      className={`text-xl font-semibold ${getStatusColor(
                        trackingResult.status,
                      )}`}
                    >
                      {trackingResult.status}
                    </p>
                    <p className="text-blue-200">
                      Current Location: {trackingResult.location}
                    </p>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <p className="text-blue-200">Estimated Delivery</p>
                    <p className="text-xl font-bold text-white">
                      {trackingResult.estimatedDelivery}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-blue-200 mb-2">
                    <span>Progress</span>
                    <span>{trackingResult.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${trackingResult.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-6">
                    Shipment Timeline
                  </h4>
                  <div className="space-y-4">
                    {trackingResult.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div
                          className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${
                            event.completed ? "bg-cyan-400" : "bg-white/20"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <div>
                              <p
                                className={`font-semibold ${
                                  event.completed
                                    ? "text-white"
                                    : "text-blue-300"
                                }`}
                              >
                                {event.status}
                              </p>
                              <p className="text-blue-200 text-sm">
                                {event.location}
                              </p>
                            </div>
                            <p className="text-blue-300 text-sm mt-1 sm:mt-0">
                              {event.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Demo Info */}
        <div className="mt-8 text-center">
          <p className="text-blue-300 text-sm">
            Demo tracking numbers:{" "}
            <span className="font-mono text-cyan-400">CS123456789</span> or{" "}
            <span className="font-mono text-cyan-400">CS987654321</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackShipment;
