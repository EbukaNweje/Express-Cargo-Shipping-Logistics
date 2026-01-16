import { useState } from "react";

// Default tracking data
const defaultTrackingData = {
  CS123456789: {
    location: "Port of Los Angeles, CA",
    estimatedDelivery: "2024-01-20",
    timeline: [
      {
        date: "2024-01-15",
        status: "Package Picked Up",
        location: "Shanghai, China",
        completed: true,
      },
      {
        date: "2024-01-16",
        status: "Departed Origin Port",
        location: "Shanghai Port",
        completed: true,
      },
      {
        date: "2024-01-18",
        status: "In Transit",
        location: "Pacific Ocean",
        completed: true,
      },
      {
        date: "2024-01-19",
        status: "Arrived at Port",
        location: "Los Angeles, CA",
        completed: false,
      },
      {
        date: "2024-01-20",
        status: "Out for Delivery",
        location: "Local Facility",
        completed: false,
      },
      {
        date: "2024-01-20",
        status: "Delivered",
        location: "Destination",
        completed: false,
      },
    ],
  },
  CS987654321: {
    location: "New York, NY",
    estimatedDelivery: "2024-01-18",
    timeline: [
      {
        date: "2024-01-10",
        status: "Package Picked Up",
        location: "Hamburg, Germany",
        completed: true,
      },
      {
        date: "2024-01-12",
        status: "Departed Origin Port",
        location: "Hamburg Port",
        completed: true,
      },
      {
        date: "2024-01-16",
        status: "Arrived at Port",
        location: "New York, NY",
        completed: true,
      },
      {
        date: "2024-01-17",
        status: "Out for Delivery",
        location: "Local Facility",
        completed: true,
      },
      {
        date: "2024-01-18",
        status: "Delivered",
        location: "Customer Address",
        completed: true,
      },
    ],
  },
};

// Utility functions for managing tracking data
export const getTrackingData = () => {
  const stored = localStorage.getItem("trackingData");
  if (stored) {
    const parsedData = JSON.parse(stored);
    // Migrate old data by removing static progress and status fields
    const migratedData = {};
    Object.keys(parsedData).forEach((key) => {
      const entry = parsedData[key];
      const { progress: _, status: __, ...cleanEntry } = entry; // Remove static fields
      migratedData[key] = cleanEntry;
    });
    // Save migrated data
    localStorage.setItem("trackingData", JSON.stringify(migratedData));
    return migratedData;
  }
  // Initialize with default data
  localStorage.setItem("trackingData", JSON.stringify(defaultTrackingData));
  return defaultTrackingData;
};

export const saveTrackingData = (data) => {
  localStorage.setItem("trackingData", JSON.stringify(data));
};

export const addTrackingEntry = (trackingNumber, entry) => {
  const data = getTrackingData();
  data[trackingNumber.toUpperCase()] = entry;
  saveTrackingData(data);
};

export const updateTrackingEntry = (trackingNumber, updates) => {
  const data = getTrackingData();
  if (data[trackingNumber.toUpperCase()]) {
    data[trackingNumber.toUpperCase()] = {
      ...data[trackingNumber.toUpperCase()],
      ...updates,
    };
    saveTrackingData(data);
  }
};

export const deleteTrackingEntry = (trackingNumber) => {
  const data = getTrackingData();
  delete data[trackingNumber.toUpperCase()];
  saveTrackingData(data);
};

export const getTrackingEntry = (trackingNumber) => {
  const data = getTrackingData();
  const entry = data[trackingNumber.toUpperCase()];
  if (entry) {
    // Calculate dynamic status and progress based on timeline completion
    const completedEvents = entry.timeline.filter(
      (event) => event.completed
    ).length;
    const totalEvents = entry.timeline.length;
    const progress =
      totalEvents > 0 ? Math.round((completedEvents / totalEvents) * 100) : 0;

    const allCompleted = entry.timeline.every((event) => event.completed);
    const latestCompletedEvent = entry.timeline
      .filter((event) => event.completed)
      .pop();

    return {
      ...entry,
      progress,
      status: allCompleted
        ? "Delivered"
        : latestCompletedEvent
        ? latestCompletedEvent.status
        : "Pending",
      currentLocation: latestCompletedEvent
        ? latestCompletedEvent.location
        : entry.location,
    };
  }
  return null;
};

// Hook for using tracking data in components
export const useTrackingData = () => {
  const [data, setData] = useState(() => {
    const rawData = getTrackingData();
    // Process data to include calculated statuses
    const processedData = {};
    Object.keys(rawData).forEach((key) => {
      processedData[key] = getTrackingEntry(key);
    });
    return processedData;
  });

  const refreshData = () => {
    const rawData = getTrackingData();
    // Process data to include calculated statuses
    const processedData = {};
    Object.keys(rawData).forEach((key) => {
      processedData[key] = getTrackingEntry(key);
    });
    setData(processedData);
  };

  return { data, refreshData };
};
