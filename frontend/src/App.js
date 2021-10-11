import Axios from "axios";
function App() {
  const razorpayHandler = async (e) => {
    e.preventDefault();
    const response = await Axios.get("http://localhost:4040/razorpay/order");
    const { data } = response;
    const options = {
      key: "rzp_test_11XaW3qVDXTYZC", // Enter the Key ID generated from the Dashboard
      amount: 500 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Anand Pallavi",
      description: "payment for your order",
      image: "https://cdn.logo.com/hotlink-ok/logo-social.png",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
      handler: async function (response) {
        try {
          const paymentId = response.razorpay_payment_id;
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          const url = `http://localhost:4040/razorpay/capture/${paymentId}`;
          const captureResponse = await Axios.post(url, {});
          const successObj = JSON.parse(captureResponse.data);
          if (successObj.captured) {
            console.log("payment successfull");
          }
        } catch (error) {
          console.log(error);
        }
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      // notes: {
      //   address: "Razorpay Corporate Office",
      // },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    razorpay.open();
    console.log(data);
  };
  return (
    <div className="App">
      <button onClick={(e) => razorpayHandler(e)}>pay now</button>
    </div>
  );
}

export default App;
