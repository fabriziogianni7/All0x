import Modal from "@/components/shared/modal";
// import { PaymentInfo } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";

const PaymentInfoModal = ({
  showPaymentInfoModal,
  setShowPaymentInfoModal,
}: {
  showPaymentInfoModal: boolean;
  setShowPaymentInfoModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [PaymentInfoClicked, setPaymentInfoClicked] = useState(false);

  return (
    <Modal showModal={showPaymentInfoModal} setShowModal={setShowPaymentInfoModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://precedent.dev">
            <Image
              src="/All0xLogo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </a>
          <h3 className="font-display text-2xl font-bold">Payment With All0x</h3>
          <p className="text-sm text-gray-500">
           Welcome to the All0x experience! This is a demostration of how all0x can help ecommerces integrating web3 in their website.
           </p>
           <p className="text-sm text-gray-500">
           At this stage, the customer has already choosen the products to buy and, after clicking the button - copy/pasted by the merchant directly on his website - is redirected here. 
           </p>
           <p className="text-sm text-gray-500">
           You will pay from Goerli to Mumbai.
           </p>
           <p className="text-sm text-gray-500">
           Click anywhere to close this modal and happy all0x!
           </p>

           
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
        </div>
      </div>
    </Modal>
  );
};

export function usePaymentInfoModal() {
  const [showPaymentInfoModal, setShowPaymentInfoModal] = useState(false);

  const PaymentInfoModalCallback = useCallback(() => {
    return (
      <PaymentInfoModal
        showPaymentInfoModal={showPaymentInfoModal}
        setShowPaymentInfoModal={setShowPaymentInfoModal}
      />
    );
  }, [showPaymentInfoModal, setShowPaymentInfoModal]);

  return useMemo(
    () => ({ setShowPaymentInfoModal, PaymentInfoModal: PaymentInfoModalCallback }),
    [setShowPaymentInfoModal, PaymentInfoModalCallback],
  );
}
