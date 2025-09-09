import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";
import { Search, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export function ScrapingDemo() {
  const trpc = useTRPC();
  const [demoUrl, setDemoUrl] = useState("https://oliveyoung.co.kr/example-product");
  const [selectedStore, setSelectedStore] = useState("Olive Young");

  const scrapeMutation = useMutation(
    trpc.scrapeProduct.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Successfully scraped product from ${selectedStore}!`);
        console.log("Scraping successful:", data);
      },
      onError: (error) => {
        toast.error(`Failed to scrape product: ${error.message}`);
        console.error("Scraping failed:", error);
      },
    })
  );

  const handleScrape = () => {
    scrapeMutation.mutate({
      productUrl: demoUrl,
      storeName: selectedStore,
    });
  };

  const stores = [
    { name: "Olive Young", url: "https://oliveyoung.co.kr/example-product" },
    { name: "Coupang", url: "https://coupang.com/example-product" },
    { name: "Gmarket", url: "https://gmarket.co.kr/example-product" },
    { name: "Sephora US", url: "https://sephora.com/example-product" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Real-Time Korean Price Monitoring
        </h2>
        <p className="text-gray-600">
          See how we track prices across Korean retailers to find you the best deals
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Korean Store
            </label>
            <select
              value={selectedStore}
              onChange={(e) => {
                setSelectedStore(e.target.value);
                const store = stores.find(s => s.name === e.target.value);
                if (store) setDemoUrl(store.url);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {stores.map((store) => (
                <option key={store.name} value={store.name}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product URL
            </label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://oliveyoung.co.kr/product"
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <button
            onClick={handleScrape}
            disabled={scrapeMutation.isPending || !demoUrl}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
          >
            {scrapeMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Scraping...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Check Korean Price</span>
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {scrapeMutation.isSuccess && scrapeMutation.data && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-green-800">
                Korean Price Found!
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-green-600 mb-1">Product Title:</p>
                <p className="font-medium text-green-800">{scrapeMutation.data.data.title}</p>
              </div>
              <div>
                <p className="text-sm text-green-600 mb-1">Korean Price:</p>
                <p className="font-medium text-green-800">{scrapeMutation.data.data.price}</p>
              </div>
              <div>
                <p className="text-sm text-green-600 mb-1">Availability:</p>
                <p className="font-medium text-green-800">{scrapeMutation.data.data.availability}</p>
              </div>
              <div>
                <p className="text-sm text-green-600 mb-1">Last Updated:</p>
                <p className="font-medium text-green-800">
                  {new Date(scrapeMutation.data.data.lastScraped).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {scrapeMutation.isError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-red-800">
                Price Check Failed
              </h3>
            </div>
            <p className="text-red-600">
              {scrapeMutation.error?.message || "Could not retrieve Korean pricing data."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
