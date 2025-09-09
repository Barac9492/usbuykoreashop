import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";
import { X, ShoppingCart, Shield, CreditCard, Truck, AlertCircle, CheckCircle, Package, Clock } from "lucide-react";
import toast from "react-hot-toast";

const purchaseRequestSchema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1").max(10, "Maximum 10 items per request"),
  specialInstructions: z.string().optional(),
  shippingMethod: z.enum(["standard", "express", "economy"]),
  urgencyLevel: z.enum(["low", "medium", "high"]),
  maxBudgetUSD: z.number().min(1, "Budget must be at least $1"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the purchase terms",
  }),
});

type PurchaseRequestForm = z.infer<typeof purchaseRequestSchema>;

interface PurchaseRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    brand?: string | null;
    imageUrl?: string | null;
    category: {
      name: string;
    };
  };
  pricing: {
    koreanPriceInUSD: number;
    savings: number;
    savingsPercentage: number;
  };
  koreanStore: {
    name: string;
    productUrl: string;
  };
}

export function PurchaseRequestModal({
  isOpen,
  onClose,
  product,
  pricing,
  koreanStore
}: PurchaseRequestModalProps) {
  const trpc = useTRPC();
  const [step, setStep] = useState<"form" | "confirmation" | "success">("form");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<PurchaseRequestForm>({
    resolver: zodResolver(purchaseRequestSchema),
    defaultValues: {
      quantity: 1,
      shippingMethod: "standard",
      urgencyLevel: "medium",
      maxBudgetUSD: Math.ceil(pricing.koreanPriceInUSD * 1.3), // 30% buffer
    },
  });

  const quantity = watch("quantity", 1);
  const maxBudget = watch("maxBudgetUSD", 0);

  const purchaseRequestMutation = useMutation(
    trpc.createPurchaseRequest.mutationOptions({
      onSuccess: (data) => {
        setStep("success");
        toast.success("Purchase request submitted successfully!");
        console.log("Purchase request successful:", data);
      },
      onError: (error) => {
        toast.error(`Failed to submit request: ${error.message}`);
        console.error("Purchase request failed:", error);
      },
    })
  );

  const onSubmit = (data: PurchaseRequestForm) => {
    setStep("confirmation");
  };

  const confirmPurchase = () => {
    const formData = handleSubmit((data) => {
      purchaseRequestMutation.mutate({
        productId: product.id,
        quantity: data.quantity,
        maxBudgetUSD: data.maxBudgetUSD,
        specialInstructions: data.specialInstructions,
        shippingMethod: data.shippingMethod,
        urgencyLevel: data.urgencyLevel,
        legalNoticeAcknowledged: data.agreedToTerms === true,
      });
    })();
  };

  const handleClose = () => {
    if (step === "success") {
      reset();
      setStep("form");
    }
    onClose();
  };

  const estimatedTotal = pricing.koreanPriceInUSD * quantity;
  const shippingCost = 15; // Base shipping cost
  const serviceFee = estimatedTotal * 0.05; // 5% service fee
  const totalEstimate = estimatedTotal + shippingCost + serviceFee;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                {step === "form" && (
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <Dialog.Title className="text-xl font-bold text-gray-900">
                            Request Korean Purchase
                          </Dialog.Title>
                          <p className="text-sm text-gray-600">
                            Submit a request to our verified Korean shoppers
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    {/* Product Summary */}
                    <div className="p-6 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-start space-x-4">
                        <img
                          src={product.imageUrl || "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop&crop=center"}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          {product.brand && (
                            <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                          )}
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                            {product.category.name}
                          </span>
                          <div className="mt-2 flex items-center space-x-4">
                            <div className="text-lg font-bold text-green-600">
                              ${pricing.koreanPriceInUSD} KRW
                            </div>
                            <div className="text-sm text-green-600">
                              Save {pricing.savingsPercentage.toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity *
                          </label>
                          <input
                            {...register("quantity", { valueAsNumber: true })}
                            type="number"
                            min="1"
                            max="10"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {errors.quantity && (
                            <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Budget (USD) *
                          </label>
                          <input
                            {...register("maxBudgetUSD", { valueAsNumber: true })}
                            type="number"
                            min="1"
                            step="0.01"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {errors.maxBudgetUSD && (
                            <p className="text-red-500 text-sm mt-1">{errors.maxBudgetUSD.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Shipping Method
                          </label>
                          <select
                            {...register("shippingMethod")}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="economy">Economy (10-14 days) - $15</option>
                            <option value="standard">Standard (7-10 days) - $25</option>
                            <option value="express">Express (3-5 days) - $45</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Urgency Level
                          </label>
                          <select
                            {...register("urgencyLevel")}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="low">Low - Within 2 weeks</option>
                            <option value="medium">Medium - Within 1 week</option>
                            <option value="high">High - ASAP (extra fee may apply)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Special Instructions (Optional)
                        </label>
                        <textarea
                          {...register("specialInstructions")}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Any specific requirements, color preferences, or special requests..."
                        />
                      </div>

                      {/* Cost Breakdown */}
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                          <CreditCard className="w-5 h-5 mr-2" />
                          Estimated Costs
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-blue-700">Product Cost ({quantity}x)</span>
                            <span className="font-medium text-blue-900">${estimatedTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Shipping</span>
                            <span className="font-medium text-blue-900">${shippingCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Service Fee (5%)</span>
                            <span className="font-medium text-blue-900">${serviceFee.toFixed(2)}</span>
                          </div>
                          <div className="border-t border-blue-300 pt-2 flex justify-between">
                            <span className="font-semibold text-blue-900">Total Estimate</span>
                            <span className="font-bold text-blue-900">${totalEstimate.toFixed(2)}</span>
                          </div>
                          <div className="text-xs text-blue-600 mt-2">
                            * Final cost may vary based on actual Korean price and exchange rates
                          </div>
                        </div>
                      </div>

                      {/* Terms Agreement */}
                      <div className="flex items-start space-x-3">
                        <input
                          {...register("agreedToTerms")}
                          type="checkbox"
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="text-sm text-gray-700">
                          I agree to the <strong>purchase terms</strong> and understand this is a 
                          legally binding request. I authorize payment up to my specified budget 
                          and agree to escrow terms. *
                        </label>
                      </div>
                      {errors.agreedToTerms && (
                        <p className="text-red-500 text-sm">{errors.agreedToTerms.message}</p>
                      )}

                      {/* Submit Button */}
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={handleClose}
                          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 font-medium flex items-center justify-center space-x-2"
                        >
                          <Package className="w-5 h-5" />
                          <span>Review Request</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {step === "confirmation" && (
                  <ConfirmationStep
                    product={product}
                    formData={watch()}
                    pricing={pricing}
                    onBack={() => setStep("form")}
                    onConfirm={confirmPurchase}
                    isLoading={purchaseRequestMutation.isPending}
                  />
                )}

                {step === "success" && (
                  <SuccessStep
                    product={product}
                    onClose={handleClose}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function ConfirmationStep({
  product,
  formData,
  pricing,
  onBack,
  onConfirm,
  isLoading
}: {
  product: any;
  formData: PurchaseRequestForm;
  pricing: any;
  onBack: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}) {
  const estimatedTotal = pricing.koreanPriceInUSD * formData.quantity;
  const shippingCost = formData.shippingMethod === "express" ? 45 : formData.shippingMethod === "standard" ? 25 : 15;
  const serviceFee = estimatedTotal * 0.05;
  const totalEstimate = estimatedTotal + shippingCost + serviceFee;

  return (
    <div>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Confirm Purchase Request</h2>
            <p className="text-sm text-gray-600">Please review your request before submitting</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Request Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Product:</span>
              <p className="font-medium">{product.name}</p>
            </div>
            <div>
              <span className="text-gray-600">Quantity:</span>
              <p className="font-medium">{formData.quantity}</p>
            </div>
            <div>
              <span className="text-gray-600">Max Budget:</span>
              <p className="font-medium">${formData.maxBudgetUSD}</p>
            </div>
            <div>
              <span className="text-gray-600">Shipping:</span>
              <p className="font-medium capitalize">{formData.shippingMethod}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Important Notice</h4>
              <p className="text-red-700 text-sm">
                This is a legally binding purchase request. Once submitted, you authorize 
                payment up to your specified budget. Funds will be held in escrow until 
                delivery confirmation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
          >
            Back to Edit
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Submit Request</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function SuccessStep({
  product,
  onClose
}: {
  product: any;
  onClose: () => void;
}) {
  return (
    <div>
      <div className="p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Request Submitted Successfully!
        </h2>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Your purchase request for <strong>{product.name}</strong> has been sent to our 
          verified Korean shoppers. You'll receive updates via email.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center justify-center">
            <Clock className="w-5 h-5 mr-2" />
            What's Next?
          </h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Korean shoppers will review your request within 24 hours</p>
            <p>• You'll receive price confirmation and payment request</p>
            <p>• Funds are held in escrow until delivery confirmation</p>
            <p>• Typical delivery time: 7-14 business days</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
