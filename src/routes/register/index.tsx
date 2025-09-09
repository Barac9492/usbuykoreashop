import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";
import { ShoppingBag, User, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/register/")({
  component: Register,
});

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().optional(),
  role: z.enum(["buyer", "shopper"]),
  country: z.enum(["US", "Korea"]),
  legalAgreement: z.boolean().refine(val => val === true, {
    message: "You must agree to the legal terms to continue",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

function Register() {
  const trpc = useTRPC();
  const [selectedRole, setSelectedRole] = useState<"buyer" | "shopper" | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation(
    trpc.register.mutationOptions({
      onSuccess: (data) => {
        toast.success("Registration successful! Please wait for account verification.");
        console.log("Registration successful:", data);
      },
      onError: (error) => {
        toast.error(`Registration failed: ${error.message}`);
        console.error("Registration failed:", error);
      },
    })
  );

  const onSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data);
  };

  const handleRoleSelect = (role: "buyer" | "shopper") => {
    setSelectedRole(role);
    setValue("role", role);
    setValue("country", role === "buyer" ? "US" : "Korea");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Join Korean Shop
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Connect US buyers with Korean shoppers for authentic products at local prices
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Role Selection */}
          {!selectedRole && (
            <div className="card p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Choose Your Role
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleRoleSelect("buyer")}
                  className="card-interactive p-6 text-left hover:border-blue-200"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">US Buyer</h3>
                      <p className="text-gray-600">Buy Korean products cheaper</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Save up to 60% on K-beauty products</li>
                    <li>• Escrow-protected transactions</li>
                    <li>• Access to Korean-only products</li>
                    <li>• Direct shipping from Korea</li>
                  </ul>
                </button>

                <button
                  onClick={() => handleRoleSelect("shopper")}
                  className="card-interactive p-6 text-left hover:border-emerald-200"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Korean Shopper</h3>
                      <p className="text-gray-600">Earn money helping buyers</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Earn commission on each purchase</li>
                    <li>• Flexible shopping schedule</li>
                    <li>• Help international customers</li>
                    <li>• Identity verification required</li>
                  </ul>
                </button>
              </div>
            </div>
          )}

          {/* Registration Form */}
          {selectedRole && (
            <div className="card p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedRole === "buyer" ? "US Buyer Registration" : "Korean Shopper Registration"}
                </h2>
                <p className="text-gray-600">
                  {selectedRole === "buyer" 
                    ? "Start saving on Korean products today" 
                    : "Join our network of verified Korean shoppers"
                  }
                </p>
              </div>

              {/* Legal Notice */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-red-800 font-bold text-lg mb-2">LEGAL BINDING AGREEMENT</h3>
                    <p className="text-red-700 text-sm leading-relaxed">
                      By registering, you agree to our legally binding terms. All transactions are contracts 
                      enforceable by law. Failure to fulfill purchase agreements will result in legal action, 
                      financial penalties, and permanent platform bans. You consent to binding arbitration 
                      and jurisdiction in applicable courts.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      {...register("firstName")}
                      className="input-field"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      {...register("lastName")}
                      className="input-field"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="input-field"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register("phoneNumber")}
                    type="tel"
                    className="input-field"
                    placeholder={selectedRole === "buyer" ? "+1-555-123-4567" : "+82-10-1234-5678"}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      {...register("password")}
                      type="password"
                      className="input-field"
                      placeholder="Create a strong password"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      {...register("confirmPassword")}
                      type="password"
                      className="input-field"
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                {/* Legal Agreement Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    {...register("legalAgreement")}
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">
                    I acknowledge and agree to the <strong>legally binding terms</strong> above. 
                    I understand that all transactions are enforceable contracts and I consent 
                    to legal action for non-compliance. *
                  </label>
                </div>
                {errors.legalAgreement && (
                  <p className="text-red-500 text-sm">{errors.legalAgreement.message}</p>
                )}

                <button
                  type="submit"
                  disabled={registerMutation.isPending}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {registerMutation.isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Create {selectedRole === "buyer" ? "Buyer" : "Shopper"} Account</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign in here
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
