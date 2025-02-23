import Shurjopay, { PaymentResponse, VerificationResponse } from "shurjopay";
import config from "../../config";

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp.sp_endpoint!,
  config.sp.sp_username!,
  config.sp.sp_password!,
  config.sp.sp_prefix!,
  config.sp.sp_return_url!
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makePayment = (paymentPayload: any) : Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response) => resolve(response),
      (error) => reject(error)
    );
  });
};
const verifyPayment = (order_id : string) : Promise<VerificationResponse[]> => {
  return new Promise((resolve, rejects) => {
    shurjopay.verifyPayment(
      order_id,
      (response) => resolve(response),
      (error) => rejects(error)
    );
  });
  
};
export const orderUtils = {
  makePayment,
  verifyPayment
};
