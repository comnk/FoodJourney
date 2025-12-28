"use client";

import Navbar from "@/components/navbar/navbar";
import { useState } from "react";
import "./requests.scss";

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState<"incoming" | "outgoing">(
    "incoming"
  );

  return (
    <>
      <Navbar />
      <div className="requests-page">
        <div className="container">
          <h2>Your Requests</h2>
          <div className="tabs">
            <nav className="tab-navbar">
              <ul
                className="tab-list"
                role="tablist"
                aria-orientation="horizontal"
              >
                <li>
                  <button
                    className={activeTab === "incoming" ? "active" : ""}
                    onClick={() => setActiveTab("incoming")}
                    role="tab"
                    aria-selected={activeTab === "incoming"}
                  >
                    Incoming
                  </button>
                </li>
                <li>
                  <button
                    className={activeTab === "outgoing" ? "active" : ""}
                    onClick={() => setActiveTab("outgoing")}
                    role="tab"
                    aria-selected={activeTab === "outgoing"}
                  >
                    Outgoing
                  </button>
                </li>
              </ul>
            </nav>
            <div className="tab-content">
              {activeTab === "incoming" && (
                <div className="tab-panel" role="tabpanel">
                  <p>List of incoming requests will be here!</p>
                </div>
              )}
              {activeTab === "outgoing" && (
                <div className="tab-panel" role="tabpanel">
                  <p>List of outgoing requests will be here!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
