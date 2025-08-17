import IconTextCarousel, { IconTextItem } from "./IconTextSection";

const iconTextData: IconTextItem[] = [
  {
    icon: "https://res.cloudinary.com/ds83mhjcm/image/upload/v1719653445/SwapConnect/home/fast-shipping_h1n0oz.svg",
    title: "Fast Shipping",
    subtitle: "Get all orders quick",
  },
  {
    icon: "https://res.cloudinary.com/ds83mhjcm/image/upload/v1719653444/SwapConnect/home/Approval_j7u5em.svg",
    title: "Value for Money",
    subtitle: "Perfect order",
  },
  {
    icon: "https://res.cloudinary.com/ds83mhjcm/image/upload/v1719653445/SwapConnect/home/Customer-Support_slvukq.svg",
    title: "Online Support 24/7",
    subtitle: "Technical Support",
  },
  {
    icon: "https://res.cloudinary.com/ds83mhjcm/image/upload/v1719653444/SwapConnect/home/Card-Payment_oe8nsf.svg",
    title: "Secure Payment",
    subtitle: "All Card Payment",
  },
];

const Values = () => (
  <div className="my-12 w-full max-w-6xl mx-auto px-4">
    <IconTextCarousel iconTextData={iconTextData} />
  </div>
);

export default Values;
