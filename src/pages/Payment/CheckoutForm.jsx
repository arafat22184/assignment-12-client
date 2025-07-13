import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";

const CheckoutForm = ({ trainer, day, time, packageName, price, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  console.log(trainer, day, time, packageName, price, user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    // const { error, paymentIntent } = await stripe.confirmCardPayment(
    //   clientSecret,
    //   {
    //     payment_method: {
    //       card: elements.getElement(CardElement),
    //       billing_details: {
    //         name: user?.displayName || "Anonymous User",
    //         email: user?.email || "no-email@example.com",
    //       },
    //     },
    //   }
    // );

    if (error) {
      console.error("Payment error:", error);
      setProcessing(false);
      return;
    } else {
      console.log("paymethod", paymentMethod);
    }
    // if (paymentIntent.status === "succeeded") {
    //   // Save payment info to database
    //   try {
    //     const paymentInfo = {
    //       email: user.email,
    //       trainer,
    //       day,
    //       time,
    //       package: packageName,
    //       price,
    //       transactionId: paymentIntent.id,
    //       date: new Date(),
    //       status: "completed",
    //     };

    //     const res = await axiosSecure.post("/payments", paymentInfo);

    //     if (res.data.insertedId) {
    //       // Update trainer's booking count
    //       await axiosSecure.patch(`/trainers/booking-count/${trainer}`);

    //       Swal.fire({
    //         position: "center",
    //         icon: "success",
    //         title: "Payment Successful!",
    //         text: `Your booking with ${trainer} is confirmed.`,
    //         showConfirmButton: false,
    //         timer: 2000,
    //       });

    //       navigate("/dashboard/payment-history");
    //     }
    //   } catch (err) {
    //     console.error("Error saving payment:", err);
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Payment was successful but we couldn't save your booking. Please contact support.",
    //     });
    //   } finally {
    //     setProcessing(false);
    //   }
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#fff",
                  "::placeholder": {
                    color: "#a0aec0",
                  },
                  iconColor: "#a0f0a0",
                },
                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a",
                },
              },
            }}
          />
        </div>

        <div className="flex justify-between items-center pt-4">
          <div>
            <p className="text-gray-400">Total Amount</p>
            <p className="text-2xl font-bold text-lime-400">{price}</p>
          </div>
          <motion.button
            type="submit"
            disabled={!stripe || processing}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-lime-400 hover:bg-lime-500 disabled:bg-gray-600 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all"
          >
            {processing ? "Processing..." : `Pay ${price}`}
          </motion.button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
