// app/loading.tsx
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center w-full animate-pulse">
      {/* Skeleton Hero Section */}
      <section className="relative w-full h-[80vh] flex flex-col items-center justify-center px-6">
        <div className="w-32 h-6 bg-terakota/10 rounded-full mb-4" />
        <div className="w-full max-w-2xl h-16 bg-gula-jawa/5 rounded-2xl mb-4" />
        <div className="w-48 h-16 bg-gula-jawa/10 rounded-full mt-6" />
      </section>

      {/* Skeleton Menu Catalog */}
      <section className="w-full bg-white/30 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-3">
              <div className="w-64 h-10 bg-gula-jawa/10 rounded-lg" />
              <div className="w-80 h-4 bg-terakota/5 rounded-lg" />
            </div>
          </div>

          {/* Grid of Skeleton Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-santan rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="h-64 w-full bg-terakota/5" />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <div className="w-32 h-6 bg-gula-jawa/10 rounded" />
                    <div className="w-16 h-6 bg-terakota/10 rounded" />
                  </div>
                  <div className="w-full h-4 bg-terakota/5 rounded" />
                  <div className="w-3/4 h-4 bg-terakota/5 rounded" />
                  <div className="w-full h-12 bg-gula-jawa/5 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
